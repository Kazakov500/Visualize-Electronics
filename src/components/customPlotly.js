// in custom-plotly.js
const Plotly = require('../libs/plotly/lib/core');

// Load in the trace types for pie, and choropleth
Plotly.register([
  require('../libs/plotly/lib/scatterpolar'),
]);

module.exports = Plotly;
