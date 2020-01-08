function scotterPlot(data) {
  console.log(data);
  var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var yValue = d => d.jaren[0].values[0].winst;
  var xValue = d => d.jaren[0].values[0].omzet;

  var xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, width])
    .nice();

  var yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([height, 0])
    .nice();

  var svg = d3
    .select("#app")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "scotter-plot")
    .attr("overflow", "visible")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3
    .axisBottom(xScale)
    .ticks(10)
    .tickSize(-height);

  var yAxis = d3
    .axisLeft(yScale)
    .ticks(10)
    .tickSize(-width);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis);

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", d => yScale(yValue(d)))
    .attr("cx", d => xScale(xValue(d)))
    .attr("r", "5");
}
export { scotterPlot };
