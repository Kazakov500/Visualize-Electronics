import React, { Component } from "react";
import PlotView from './PlotView';
import Header from './Header';

import s from '../styles/main.css';

class App extends Component {
  render() {
    return (
      <div className={ s.layout }>
        <Header />
        <PlotView />
      </div>
    );
  }
}

export default App;
