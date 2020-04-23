import React, { Component } from "react";
import {C_COLOR, C_NUMBER, L_COLOR, L_NUMBER, R_COLOR, R_NUMBER} from './PlotView';
import Button from "@material-ui/core/Button";
import sP from "../styles/panel.css";
import DeleteIcon from "@material-ui/icons/Delete";

class Buttons extends Component {
  render() {
    const { drawGraph, isAdditional } = this.props;

    return (
      <>
        <Button
          style={ { background: R_COLOR } } className={ sP.button }
          variant="contained" onClick={ () => drawGraph(R_NUMBER, isAdditional) }
        >
          Новый резистор
        </Button>
        <Button
          style={ { background: C_COLOR } } className={ sP.button }
          variant="contained" onClick={ () => drawGraph(C_NUMBER, isAdditional) }
        >
          Новый конденсатор
        </Button>
        <Button
          style={ { background: L_COLOR } } className={ sP.button }
          variant="contained" onClick={ () => drawGraph(L_NUMBER, isAdditional) }
        >
          Новая катушка
        </Button>
        <Button variant="contained" onClick={ () => drawGraph(-1, isAdditional) }>
          <DeleteIcon />
        </Button>
      </>
    );
  }
}

export default Buttons;
