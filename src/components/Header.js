import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import s from '../styles/header.css';

class Header extends Component {
  render() {
    return (
      <div className={ s.header }>
        <Paper className={ s.headerPaper }>
          <Typography
            variant="h5"
            align="center"
            component="h3"
            // gutterBottom
          >
            Система анализа качества элементной базы  при помощи когнитивных визуальных представлений
          </Typography>
          {/*<Typography align="center" component="h5">*/}
          {/*  Дипломная работа магистра кафедры ИУ-4 Рихтера Андрея*/}
          {/*</Typography>*/}
        </Paper>
      </div>
    );
  }
}

export default Header;
