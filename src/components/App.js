import React, { Component } from "react";
import ThreeScene from './ThreeScene';

class App extends Component {
  state = {
    count: 0
  };

  handleChange = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleReset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div>
        <h2>Hello</h2>
        <span>You pressed button {this.state.count} times!</span>
        <button onClick={this.handleChange}>PRESS ME!</button>
        <button style={{ marginBottom: "20px" }} onClick={this.handleReset}>RESET!</button>
        <ThreeScene />
      </div>
    );
  }
}

export default App;
