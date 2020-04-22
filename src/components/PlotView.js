import React, { Component } from "react";
import Plotly from './customPlotly';
import createPlotlyComponent from 'react-plotly.js/factory';

const x1 = 40;
const x2 = 1.1;
const x3 = 0.5;
const x4 = 0.01;
const x5 = 67;
const x6 = 61;

const THETA_MAX = 360;
const ZOOM_STEP = 20;

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
  modeBarButtonsToRemove: ['zoom2d','toggleHover']
};

const layout = ({ angle = 90 }) => ({
  polar: {
    radialaxis: {
      visible: true,
      range: [0, 50],
      angle: angle
    }
  },
  margin: {
    l: 0,
    r: 0,
    b: 20,
    t: 20
  }
});

const data = ({ rArray, thetaArray, color}) => ({
  type: "scatterpolar",
  mode: "lines",
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

  returnFunction = theta => {
    const newTheta = theta * 2 * Math.PI / THETA_MAX;
    return x1 * Math.pow(Math.sin(x2 + x3 * newTheta + x4 * Math.sin(x5 * newTheta)), x6);
  };

  createThetaArray = count => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(THETA_MAX / count * i);
    }
    return array
  };

  createR = thetaArray => {
    const array = [];
    thetaArray.forEach(theta => array.push(this.returnFunction(theta)));
    return array;
  };

  render() {
    const Plot = createPlotlyComponent(Plotly);

    const thetaArray = this.createThetaArray(500);
    const rArray = this.createR(thetaArray);

    return (
      <div>
        <h2>Plot</h2>
        <Plot
          data={ [data({rArray, thetaArray, color: '#709BFF'})] }
          layout={ layout({}) }
          config={ config }
        />
      </div>
    );
  }
}

export default PlotView;
