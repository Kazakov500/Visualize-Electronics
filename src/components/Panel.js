import React, { Component } from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import cx from 'classnames';
import Buttons from './Buttons';
import CustomSlider from './CustomSlider';

import s from '../styles/plot.css';
import sP from '../styles/panel.css';

class Panel extends Component {
  state = {
    expanded: [true, true, true],
  };

  handleChange = index => {
    const expanded = this.state.expanded;
    expanded[index] = !expanded[index];
    this.setState({ expanded });
  };

  render() {
    const { expanded } = this.state;
    const { drawGraph, onChangeCount, onChangeWidth, onChangeLineWidth, onChangeDTick } = this.props;

    return (
      <Paper className={ s.column }>
        <ExpansionPanel expanded={ expanded[0] } onChange={ () => this.handleChange(0) } className={ sP.panel }>
          <ExpSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography>Изменение параметров графика</Typography>
          </ExpSummary>
          <ExpDetails style={{ display: 'block' }} className={ sP.details }>
            <div className={ sP.sliderRow }>
              <CustomSlider
                min={ 20 }
                max={ 500 }
                defaultValue = { 500 }
                step={ 20 }
                onChange={ onChangeCount }
                title="Количество точек для отрисовки"
              />
              <CustomSlider
                min={ 16 }
                max={ 200 }
                defaultValue = { 60 }
                step={ 10 }
                onChange={ onChangeWidth }
                title="Толщина отображения"
              />
            </div>
            <div className={ sP.sliderRow }>
              <CustomSlider
                min={ 0.1 }
                max={ 2 }
                defaultValue = { 1 }
                step={ 0.1 }
                onChange={ onChangeLineWidth }
                title="Толщина границ"
                isFloat
              />
              <CustomSlider
                min={ 1 }
                max={ 20 }
                defaultValue = { 5 }
                step={ 1 }
                onChange={ onChangeDTick }
                title="Деление шкалы"
              />
            </div>
          </ExpDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={ expanded[1] } onChange={ () => this.handleChange(1) } className={ sP.panel }>
          <ExpSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography>Добавить элемент</Typography>
          </ExpSummary>
          <ExpDetails className={ cx(sP.buttons, sP.details) }>
            <Buttons drawGraph={ drawGraph } />
          </ExpDetails>
        </ExpansionPanel>

        <ExpansionPanel square expanded={ expanded[2] } onChange={ () => this.handleChange(2) } className={ sP.panel }>
          <ExpSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography>Добавить элемент для сравнения</Typography>
          </ExpSummary>
          <ExpDetails className={ cx(sP.buttons, sP.details) }>
            <Buttons drawGraph={ drawGraph } isAdditional />
          </ExpDetails>
        </ExpansionPanel>
      </Paper>
    );
  }
}

export default Panel;
