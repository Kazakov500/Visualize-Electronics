import React, { Component } from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import cx from 'classnames';
import Buttons from './Buttons';

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
    const { drawGraph } = this.props;

    return (
      <Paper className={ s.column }>
        <ExpansionPanel expanded={ expanded[0] } onChange={ () => this.handleChange(0) } className={ sP.panel }>
          <ExpSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography>Изменение параметров графика</Typography>
          </ExpSummary>
          <ExpDetails className={ sP.details }>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </ExpDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={ expanded[1] } onChange={ () => this.handleChange(1) } className={ sP.panel }>
          <ExpSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography>Добавить элемент для сравнения</Typography>
          </ExpSummary>
          <ExpDetails className={ cx(sP.buttons, sP.details) }>
            <Buttons drawGraph={ drawGraph } isAdditional />
          </ExpDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={ expanded[2] }
          onChange={ () => this.handleChange(2) }
          className={ sP.panel }
        >
          <ExpSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography >Загрузить параметры элемента</Typography>
          </ExpSummary>
          <ExpDetails className={ cx(sP.buttons, sP.details) }>
            <Buttons drawGraph={ drawGraph } />
          </ExpDetails>
        </ExpansionPanel>
      </Paper>
    );
  }
}

export default Panel;
