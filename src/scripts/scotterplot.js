function scotterPlot(data) {
  console.log(data[0].entries);
  var margin = {
      top: 30,
      right: 50,
      bottom: 30,
      left: 50
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;



  var yValue = d => d.winst;
  var xValue = d => d.omzet;

  var xScale = d3
    .scaleLinear()
    .domain(d3.extent(data[0].entries, xValue))
    .range([0, width])
    .nice();

  var yScale = d3
    .scaleLinear()
    .domain(d3.extent(data[0].entries, yValue))
    .range([height, 0])
    .nice();

  var svg = d3
    .select("#app")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "scotter-plot")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

  var xAxis = d3
    .axisBottom(xScale)
    .ticks(10)
    .tickSize(-height);

  var yAxis = d3
    .axisLeft(yScale)
    .ticks(10)
    .tickSize(-width);

  var gX = svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  var gY = svg
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis);

var pointgroup =
svg.append('g')
.attr("clip-path", "url(#clip)")
  .classed("points_g", true);

  var points =
    pointgroup
    .selectAll("circle")
    .data(data[0].entries)
    .enter()
    .append("circle")
    .attr("class", function(d) {
		            if (d.zorgsoort == 1) {return "bg-one"}
		            else if (d.zorgsoort == 2) {return "bg-two"}
                    else if (d.zorgsoort == 3) {return "bg-three"}
                    else if (d.zorgsoort == 4) {return "bg-four"}
                    else if (d.zorgsoort == 5) {return "bg-five"}
                    else if (d.zorgsoort == 6) {return "bg-six"}
                    else if (d.zorgsoort == 7) {return "bg-seven"}
		        ;})
    .style("opacity", function(d) {
            		if (typeof d.omzet != "number") {return 0}
                    else if (typeof d.winst != "number") {return 0}
                ;})
    .attr("cy", d => yScale(yValue(d)))
    .attr("cx", d => xScale(xValue(d)))
    .attr("r", "5");


  // Pan and zoom
  var zoom = d3.zoom()
    .scaleExtent([.5, 100])
    .extent([
      [0, 0],
      [width, height]
    ])
    .on("zoom", zoomed);

  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .call(zoom);

  function zoomed() {
    // create new scale ojects based on event
    var new_xScale = d3.event.transform.rescaleX(xScale);
    var new_yScale = d3.event.transform.rescaleY(yScale);
    // update axes
    gX.call(xAxis.scale(new_xScale));
    gY.call(yAxis.scale(new_yScale));
    points.data(data[0].entries)
      .attr("cy", d => new_yScale(yValue(d)))
      .attr("cx", d => new_xScale(xValue(d)))
  }
}
export {
  scotterPlot
};
