import React, { Component } from "react";
import Plotly from './customPlotly';
import createPlotlyComponent from 'react-plotly.js/factory';
import Paper from '@material-ui/core/Paper';
import cx from 'classnames';
import { R_COLOR, C_COLOR, L_COLOR } from './PlotView';

import s from '../styles/plot.css';

const x1 = 40; // высота лепестка
const x2 = 1.1; // угол поворота
const x3 = 0.5;
const x4 = 0.00; // рябь лепестка
const x5 = 80; // волнистость лепестка
const x6 = 60; // толщина лепестка

const THETA_MAX = 360;
const ZOOM_STEP = 20;

const maxRippleLevels = [0.02, 0.04, 0.05, 0.07, 0.09];

const MAIN_OPACITY = 0.7;

const config = {
  scrollZoom: true,
  displayModeBar: true,
  displaylogo: false,
  locale: 'ru',
  showAxisDragHandles: true,
  modeBarButtonsToAdd: [
    {
      name: 'Приблизить',
      icon: Plotly.Icons.zoom_plus,
      click: function(gd) {
        gd._fullLayout.polar._subplot.__proto__.rotateOrRange(0, -ZOOM_STEP, gd._fullLayout.polar);
      }
    },
    {
      name: 'Отдалить',
      icon: Plotly.Icons.zoom_minus,
      click: function(gd) {
        gd._fullLayout.polar._subplot.__proto__.rotateOrRange(0, ZOOM_STEP, gd._fullLayout.polar);
      }
    },
  ],
  modeBarButtonsToRemove: ['zoom2d', 'toggleHover']
};

const layout = ({ angle = 90, width, height, rangeLimit, rotation = 0, dtick = 5 }) => ({
  polar: {
    radialaxis: {
      visible: true,
      range: [0, rangeLimit],
      angle,
      dtick,
      // title: '' TODO писать тут единицу измерения
    },
    angularaxis: {
      rotation,
      dtick: 15,
      showticklabels: false
    }
  },
  margin: {
    l: 20,
    r: 0,
    b: 20,
    t: 20
  },
  font: {
    famyly: 'Balto',
    size: 10
  },
  autosize: true,
  width,
  height,
});

const data = ({ rArray, thetaArray, color, name, opacity, lineColor = 'black', lineWidth = 1 }) => ({
  type: "scatterpolar",
  mode: "lines",
  name: name,
  r: rArray,
  theta: thetaArray,
  fill: "toself",
  fillcolor: color,
  line: {
    color: lineColor,
    width: lineWidth
  },
  opacity
});

class Plot extends Component {
  state = {
    count: 0,
    width: 400,
    height: 400,
  };

  constructor(props) {
    super(props);

    this.paperREF = React.createRef();
    this.partsConfig = [];
  }

  componentDidMount() {
    this.setState({
      width: this.paperREF.current.clientWidth - 10,
      height: this.paperREF.current.clientHeight - 10
    });

    this.partsConfig = [
      { angle: 0.79, color: R_COLOR, name: 'R' },
      { angle: -1.3, color: C_COLOR, name: 'C' },
      { angle: -0.26, color: L_COLOR, name: 'L' },
    ];
  }

  returnFunction = (theta, angle, height, width, ripple) => {
    const newTheta = theta * 2 * Math.PI / THETA_MAX;
    const newAngle = angle || x2;
    const newHeight = height === 0 ? 0 : height || x1;
    const newWidth = width || x6;
    const newRipple = ripple || x4;
    return newHeight * Math.pow(Math.sin(newAngle + x3 * newTheta + newRipple * Math.sin(x5 * newTheta)), newWidth);
  };

  createThetaArray = count => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(THETA_MAX / count * i);
    }
    return array
  };

  createR = (thetaArray, angle, index, heights, width, ripple) => {
    const array = [];
    thetaArray.forEach(theta => array.push(this.returnFunction(theta, angle, heights[index], width, ripple)));
    return array;
  };

  drawPart = (part, index, opacity = 1, heights, lineColor, ripple, isBase) => {
    const { count, width, lineWidth } = this.props;

    const { color, name, angle } = part;
    const newName = isBase ? 'базовый ' + name : name;
    const thetaArray = this.createThetaArray(count);
    const rArray = this.createR(thetaArray, angle, index, heights, width, ripple);
    return data({ rArray, thetaArray, color, name: newName, opacity, lineColor, lineWidth });
  };

  calculateRipple = () => {
    const { additionalHeights, heights, admission, maxRippleLevel } = this.props;

    if (!additionalHeights || !additionalHeights.length) return [];

    const maxRipple = maxRippleLevels[maxRippleLevel - 1];
    const ripples = [];

    heights.forEach((height, index) => {
      const deviation = Math.abs(100 * additionalHeights[index] / height - 100);
      const currentAdmission = admission[index];

      if (deviation <= currentAdmission) {
        ripples[index] = x4;
      } else if (deviation >= currentAdmission * 2) {
        ripples[index] = maxRipple;
      } else {
        ripples[index] = x4 + (deviation - currentAdmission) * (maxRipple - x4) / currentAdmission;
      }
    });

    return ripples;
  };

  drawAllParts = () => {
    const { additionalHeights, heights } = this.props;
    const ripples = this.calculateRipple();

    const parts = [];
    if (additionalHeights?.length) {
      this.partsConfig.forEach((part, index) => {
        parts.push(this.drawPart(part, index, undefined, additionalHeights, undefined, ripples[index]));
      });
    }
    if (heights?.length) {
      this.partsConfig.forEach((part, index) => {
        parts.push(this.drawPart(part, index, MAIN_OPACITY, heights, 'white', undefined, true));
      });
    }

    return parts;
  };

  render() {
    const { width, height } = this.state;
    const { rangeLimit, rotation, dtick } = this.props;
    const Plot = createPlotlyComponent(Plotly);

    return (
      <Paper className={ cx(s.column, s.content) } ref={ this.paperREF }>
        <Plot
          data={ this.drawAllParts() }
          layout={ layout({ width, height, rangeLimit, rotation, dtick }) }
          config={ config }
        />
      </Paper>
    );
  }
}

Plot.defaultProps = {
  heights: [30, 30, 30],
  rangeLimit: 50,
  additionalHeights: null,
  count: 500,
  width: 60,
};

export default Plot;
