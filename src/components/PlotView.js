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

const rotations = [0, 120, 240];

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
    additionalHeights: undefined,
    count: 500,
    width: 60,
    lineWidth: 1,
    dtick: 5,
    admission: [5, 5, 5],
    maxRippleLevel: 3,
    rangeLimit: RANGE_HIGH_LIMIT
  };

  drawComponentGraph = (index, isAdditional, values) => {
    const heights = isAdditional ? 'additionalHeights' : 'heights';
    const newHeightsValues = index === -1 ? undefined : values && values.length ? values : functionCollection[index]();

    const currentHeights = {
      heights: this.state.heights,
      additionalHeights: this.state.additionalHeights
    };
    currentHeights[heights] = newHeightsValues;
    const allHeights = currentHeights.heights ? currentHeights.heights.concat(currentHeights.additionalHeights) : [];
    let maxHeight = 0;
    allHeights.forEach(height => {
      if (height && height > maxHeight) { maxHeight = height; }
    });

    this.setState({
      [heights]: newHeightsValues,
      rotation: rotations[index],
      rangeLimit: maxHeight + 10
    });
  };

  onChangeCount = count => {
    this.setState({ count });
  };

  onChangeWidth = width => {
    this.setState({ width });
  };

  onChangeLineWidth = lineWidth => {
    this.setState({ lineWidth });
  };

  onChangeDTick = dtick => {
    this.setState({ dtick });
  };

  onChangeAdmission = (newAdmission, type) => {
    const admission = this.state.admission;
    admission[type] = newAdmission;
    this.setState({ admission });
  };

  onChangeRippleLevel = maxRippleLevel => {
    this.setState({ maxRippleLevel });
  };

  render() {
    const {
      heights, rotation, additionalHeights, count, rangeLimit,
      width, lineWidth, dtick, admission, maxRippleLevel
    } = this.state;

    return (
      <div className={ s.plotView }>
        <Plot
          rotation={ rotation }
          heights={ heights }
          rangeLimit={ rangeLimit }
          additionalHeights={ additionalHeights }
          count={ count }
          width={ width }
          lineWidth={ lineWidth }
          dtick={ dtick }
          admission={ admission }
          maxRippleLevel={ maxRippleLevel }
        />
        <Panel
          drawGraph={ this.drawComponentGraph }
          onChangeCount={ this.onChangeCount }
          onChangeWidth={ this.onChangeWidth }
          onChangeLineWidth={ this.onChangeLineWidth }
          onChangeDTick={ this.onChangeDTick }
          onChangeAdmission={ this.onChangeAdmission }
          onChangeRippleLevel={ this.onChangeRippleLevel }
        />
      </div>
    );
  }
}

export default PlotView;
