import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
