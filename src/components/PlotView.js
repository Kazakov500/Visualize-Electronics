import React, { Component } from "react";
import Plotly from './customPlotly';
import createPlotlyComponent from 'react-plotly.js/factory';

import s from '../styles/main.css';

const x1 = 40;
const x2 = 1.1;
const x3 = 0.5;
const x4 = 0.01;
const x5 = 67;
const x6 = 61;

const THETA_MAX = 360;
const ZOOM_STEP = 20;

const partsConfig = [
  { angle: 0.79, color: '#00e676', name: 'R' },
  { angle: -1.3, color: '#00b0ff', name: 'C' },
  { angle: -0.27, color: '#ff5252', name: 'L' },
];

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

const layout = ({ angle = 90 }) => ({
  polar: {
    radialaxis: {
      visible: true,
      range: [0, 50],
      angle: angle,
      categoryorder: "category descending"
    },
    angularaxis: {
      dtick: 15
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
  }
});

const data = ({ rArray, thetaArray, color, name}) => ({
  type: "scatterpolar",
  mode: "lines",
  name: name,
  r: rArray,
  theta: thetaArray,
  fill: "toself",
  fillcolor: color,
  line: {
    color: 'black',
    width: 0.7
  }
});

class PlotView extends Component {
  state = {
    count: 0
  };

  returnFunction = (theta, angle) => {
    const newTheta = theta * 2 * Math.PI / THETA_MAX;
    const newAngle = angle || x2;
    return x1 * Math.pow(Math.sin(newAngle + x3 * newTheta + x4 * Math.sin(x5 * newTheta)), x6);
  };

  createThetaArray = count => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(THETA_MAX / count * i);
    }
    return array
  };

  createR = (thetaArray, angle) => {
    const array = [];
    thetaArray.forEach(theta => array.push(this.returnFunction(theta, angle)));
    return array;
  };

  drawPart = part => {
    const { color, name, angle } = part;
    const thetaArray = this.createThetaArray(500);
    const rArray = this.createR(thetaArray, angle);
    return data({ rArray, thetaArray, color , name });
  };

  drawAllParts = () => {
    const parts = [];
    partsConfig.forEach(part => {
      parts.push(this.drawPart(part));
    });
    return parts;
  };

  render() {
    const Plot = createPlotlyComponent(Plotly);

    return (
      <div>
        <h2 className={s.header}>Plot</h2>
        <Plot
          data={ this.drawAllParts() }
          layout={ layout({}) }
          config={ config }
        />
      </div>
    );
  }
}

export default PlotView;
