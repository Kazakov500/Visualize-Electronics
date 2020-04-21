// in custom-plotly.js
const Plotly = require('../libs/lib/core');

// Load in the trace types for pie, and choropleth
Plotly.register([
  require('../libs/lib/scatterpolar'),
]);

module.exports = Plotly;
