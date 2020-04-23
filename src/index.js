import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";

import 'typeface-roboto';
import './styles/main.css';

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
