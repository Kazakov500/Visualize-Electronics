import React, { Component } from "react";

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
        <p>You pressed button {this.state.count} times!</p>
        <button onClick={this.handleChange}>PRESS ME!</button>
        <button onClick={this.handleReset}>RESET!</button>
      </div>
    );
  }
}

export default App;
