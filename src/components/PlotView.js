import React, { Component } from "react";
import Panel from './Panel';
import Plot from './Plot';

import s from '../styles/plot.css';

const RANGE_LOW_LIMIT = 40;
const RANGE_HIGH_LIMIT = 60;
const LOW_LOW_LIMIT = 5;
const LOW_HIGH_LIMIT = 20;

export const R_NUMBER = 0;
export const C_NUMBER = 1;
export const L_NUMBER = 2;

export const R_COLOR = '#00e676';
export const C_COLOR = '#00b0ff';
export const L_COLOR = '#ff5252';

const rotations = [ 0, 120, 240];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getLowNumber = () => {
  return getRandomInt(LOW_LOW_LIMIT, LOW_HIGH_LIMIT);
};

const getHighNumber = () => {
  return getRandomInt(RANGE_LOW_LIMIT, RANGE_HIGH_LIMIT);
};

const createHeightsArray = number => {
  const heightsArray = [
    getLowNumber(),
    getLowNumber(),
    getLowNumber(),
  ];
  heightsArray[number] = getHighNumber();
  return heightsArray;
};

const createR = () => createHeightsArray(R_NUMBER);
const createC = () => createHeightsArray(C_NUMBER);
const createL = () => createHeightsArray(L_NUMBER);

const functionCollection = [createR, createC, createL];

class PlotView extends Component {
  state = {
    heights: undefined,
    rotation: 0,
    additionalHeights: undefined
  };

  drawComponentGraph = (index, isAdditional) => {
    const heights = isAdditional ? 'additionalHeights' : 'heights';
    this.setState({
      [heights]: index === -1 ? undefined : functionCollection[index](),
      rotation: rotations[index]
    });
  };

  render() {
    const { heights, rotation, additionalHeights } = this.state;

    return (
      <div className={ s.plotView }>
        <Plot
          rotation={ rotation }
          heights={ heights }
          rangeLimit={ RANGE_HIGH_LIMIT }
          additionalHeights={ additionalHeights }
        />
        <Panel drawGraph={ this.drawComponentGraph } />
      </div>
    );
  }
}

export default PlotView;
