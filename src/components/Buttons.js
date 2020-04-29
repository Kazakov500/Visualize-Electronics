import React, { Component } from "react";
import {C_COLOR, C_NUMBER, L_COLOR, L_NUMBER, R_COLOR, R_NUMBER} from './PlotView';
import Button from "@material-ui/core/Button";

import cx from 'classnames';
import sP from "../styles/panel.css";

import DeleteIcon from "@material-ui/icons/Delete";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

const isNumber = num => {
  return isFinite(num);
};

class Buttons extends Component {
  state = {
    type: 'load',
    component: R_NUMBER,
    inputValueR: '',
    inputValueC: '',
    inputValueL: '',
    valueR: 0,
    valueC: 0,
    valueL: 0,
  };

  componentDidMount() {
    document.documentElement.style
      .setProperty('--radio-color-r', R_COLOR);
    document.documentElement.style
      .setProperty('--radio-color-c', C_COLOR);
    document.documentElement.style
      .setProperty('--radio-color-l', L_COLOR);
  }

  handleChangeType = event => {
    this.setState({ type: event.target.value });
  };

  handleChangeComponent = event => {
    this.setState({ component: +event.target.value });
  };

  handleInput = event  => {
    const type = event.target.name;
    this.setState({ ['inputValue' + type]: event.target.value } );
  };

  handleKeyPress = event => {
    if (event.keyCode === 13) {
      this.handleInputChange(event);
    }
  };

  handleInputChange = event => {
    const value = +event.target.value;
    const type = event.target.name;
    const isValidNumber = isNumber(value);

    if (isValidNumber) {
      this.setState({ ['value' + type]: value, ['inputValue' + type]: value });
    } else {
      this.setState({ ['inputValue' + type]: this.state['value' + type] });
    }
  };

  render() {
    const { drawGraph, isAdditional } = this.props;
    const { type, component, inputValueR, inputValueC, inputValueL, valueR, valueC, valueL } = this.state;

    return (
      <>
        <FormControl className={ sP.formControl } variant="outlined">
          <Select value={ type } onChange={ this.handleChangeType } input={ <OutlinedInput className={ sP.select } /> }>
            <MenuItem value="load">Загрузить</MenuItem>
            <MenuItem value="write">Ввести</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset" className={ sP.formControlContainer }>
          {type === 'load' && (
            <FormLabel component="legend">Компонент</FormLabel>
          )}

          <RadioGroup className={ cx({ [sP.radioGroup]: type === 'write' }) } value={ component } onChange={ this.handleChangeComponent } row>
            <FormControlLabel
              className={ cx(sP.label, sP.label_r) }
              value={ R_NUMBER }
              control={ <Radio color="primary" /> }
              label="Резистор"
            />
            <FormControlLabel
              className={ cx(sP.label, sP.label_c) }
              value={ C_NUMBER }
              control={ <Radio color="primary" /> }
              label="Конденсатор"
            />
            <FormControlLabel
              className={ cx(sP.label, sP.label_l) }
              value={ L_NUMBER }
              control={ <Radio color="primary" /> }
              label="Катушка"
            />
          </RadioGroup>

            {type === 'write' && (
              <div className={ sP.inputContainer }>
                <TextField
                  value={ inputValueR }
                  className={ sP.input }
                  placeholder="Сопротивление"
                  label="Сопротивление"
                  name="R"
                  onChange={ this.handleInput }
                  onKeyDown={ this.handleKeyPress }
                  onBlur={ this.handleInputChange }
                />
                <TextField
                  value={ inputValueC }
                  className={ sP.input }
                  placeholder="Ёмкость"
                  label="Ёмкость"
                  name="C"
                  onChange={ this.handleInput }
                  onKeyDown={ this.handleKeyPress }
                  onBlur={ this.handleInputChange }
                />
                <TextField
                  value={ inputValueL }
                  className={ sP.input }
                  placeholder="Индуктивность"
                  label="Индуктивность"
                  name="L"
                  onChange={ this.handleInput }
                  onKeyDown={ this.handleKeyPress }
                  onBlur={ this.handleInputChange }
                />
              </div>
            )}
        </FormControl>

        <Button
          color="primary"
          style={{ width: "112px" }}
          variant="contained"
          onClick={ () => drawGraph(component, isAdditional, type === 'write' ? [valueR, valueC, valueL] : null)}
        >
           Добавить
        </Button>
        <Fab className={ sP.deleteButton } size="small" onClick={ () => drawGraph(-1, isAdditional) }>
          <DeleteIcon />
        </Fab>
      </>
    );
  }
}

export default Buttons;
