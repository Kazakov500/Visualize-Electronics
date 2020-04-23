import React, { Component } from "react";
import Panel from './Panel';
import Plot from './Plot';

import s from '../styles/plot.css';

class PlotView extends Component {
  render() {
    return (
      <div className={ s.plotView }>
        <Plot />
        <Panel />
      </div>
    );
  }
}

export default PlotView;
