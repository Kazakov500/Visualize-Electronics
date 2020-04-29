import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import cx from 'classnames';

import s from '../styles/slider.css';

const isInteger = num => {
  return (num ^ 0) === num;
};

const isNumber = num => {
  return isFinite(num);
};

class CustomSlider extends Component {
  state = {
    value: 0,
    inputValue: 0,
  };

  constructor(props) {
    super(props);

    this.state.value = props.defaultValue;
    this.state.inputValue = props.defaultValue;
  }

  handleSliderChange = (event, value) => {
    const { onChange } = this.props;
    this.setState({ value, inputValue: value });
    onChange && onChange(value);
  };

  handleInputChange = event => {
    const { min, max, onChange, isFloat } = this.props;
    const value = +event.target.value;
    const isValidNumber = isFloat ? isNumber(value) : isInteger(value);

    if (isValidNumber && value >= min && value <= max) {
      this.setState({ value, inputValue: value });
      onChange && onChange(value);
    } else {
      this.setState({ inputValue: this.state.value });
    }
  };

  handleInput = event => {
    this.setState({ inputValue: event.target.value } );
  };

  handleKeyPress = event => {
    if (event.keyCode === 13) {
      this.handleInputChange(event);
    }
  };

  render() {
    const { value, inputValue } = this.state;
    const { title, min, max, step } = this.props;

    return (
      <div className={ s.layout }>
        <Typography align="center" className={ s.title }>{title}</Typography>
        <div className={ s.container }>
          <Typography className={ cx(s.minMax, s.min) }>{min}</Typography>
          <Slider
            value={value}
            min={ min }
            max={ max }
            step={ step }
            onChange={ this.handleSliderChange }
          />
          <Typography className={ cx(s.minMax, s.max) }>{max}</Typography>
          <TextField
            value={ inputValue }
            className={ s.value }
            onChange={ this.handleInput }
            onKeyDown={ this.handleKeyPress }
            onBlur={ this.handleInputChange }
          />
        </div>
      </div>
    );
  }
}

CustomSlider.defaultProps = {
  title: 'CustomSlider',
  defaultValue: 0,
  min: 0,
  max: 10,
  step: 1,
};

export default CustomSlider;
