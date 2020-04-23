import React, { Component } from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import cx from 'classnames';

import s from '../styles/plot.css';
import sP from '../styles/panel.css';

// const styles = () => ({
//   root: {
//     boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0,
//     },
//     margin: '0 !important'
//   },
//   rootSummary: {
//     borderBottom: '1px solid rgba(0,0,0,.125)',
//     minHeight: '56px !important',
//   },
// });

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

    return (
      <Paper className={ s.column }>
        <ExpansionPanel
          expanded={ expanded[0] }
          onChange={ () => this.handleChange(0) }
          className={ sP.panel }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography>Изменение параметров графика</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={ sP.details }>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={ expanded[1] }
          onChange={ () => this.handleChange(1) }
          className={ sP.panel }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography>Добавить элемент для сравнения</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={ cx(sP.buttons, sP.details) }>
            <Button variant="contained">
              Новый резистор
            </Button>
            <Button variant="contained">
              Новая катушка
            </Button>
            <Button variant="contained">
              Новый конденсатор
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          square
          expanded={ expanded[2] }
          onChange={ () => this.handleChange(2) }
          className={ sP.panel }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={ sP.summary }>
            <Typography>Загрузить параметры элемента</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={ cx(sP.buttons, sP.details) }>
            <Button variant="contained">
              Новый резистор
            </Button>
            <Button variant="contained">
              Новая катушка
            </Button>
            <Button variant="contained">
              Новый конденсатор
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    );
  }
}

// export default withStyles(styles)(Panel);
export default Panel;
