import {
  genOptionsForDropdownMenu
} from './dropDownMenu.js'

import {
  genYearSlider
} from './yearSlider.js'

var margin = {
    top: 60,
    right: 100,
    bottom: 30,
    left: 100
  },
  width = 1100 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

function scotterPlot(data) {
  console.log(data[0].entries);
  var closeButtons;
  var sliderClass = "slider";
  genYearSlider(data, sliderClass)
  var slider = document.querySelector('.slider');
  var sliderValue = slider.value;

  var xMenuClass = "xMenu";
  var yMenuClass = "yMenu";
  genOptionsForDropdownMenu(data, xMenuClass)
  genOptionsForDropdownMenu(data, yMenuClass)
  var xMenuValue = document.querySelector(".xMenu").value;
  var yMenuValue = document.querySelector(".yMenu").value;
  var xMenu = document.querySelector(".xMenu");
  var yMenu = document.querySelector(".yMenu");

  var yValue = d => d[yMenuValue];
  var xValue = d => d[xMenuValue];

  var tooltip = d3.select("#app").append("div").attr("class", "toolTip");

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
    .style("z-index", 10)
    .classed("points_g", true);

  var points =
    pointgroup
    .selectAll("circle")
    .data(data[0].entries)
    .enter()
    .append("circle")
    .attr("class", function (d) {
      if (d.zorgsoort == 1) {
        return "bg-one circle"
      } else if (d.zorgsoort == 2) {
        return "bg-two circle"
      } else if (d.zorgsoort == 3) {
        return "bg-three circle"
      } else if (d.zorgsoort == 4) {
        return "bg-four circle"
      } else if (d.zorgsoort == 5) {
        return "bg-five circle"
      } else if (d.zorgsoort == 6) {
        return "bg-six circle"
      } else if (d.zorgsoort == 7) {
        return "bg-seven circle"
      };
    })
    .style("opacity", function (d) {
      if (typeof d.omzet != "number") {
        return 0
      } else if (typeof d.winst != "number") {
        return 0
      };
    })
    .on("mouseleave", function (d) {
      tooltip
        .style("opacity", 0)

      points.style("opacity", 1)
      this.setAttribute("style", "opacity: 1; stroke-width: 0; stroke: black;")

    })
    .on("mousemove", function (d) {
      tooltip
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 150 + "px")
        .style("opacity", 1)
        .style("display", "inline-block")
        .html("<h3> " + (d.naam) + "</h3>" +
          "<span>Plaats :</span>   " + (d.plaats) + "<br>" +
          "<span>Concerncode :</span>   " + (d.concerncode) + "<br>" +
          "<h4> Soort zorg </h4>" +
          "<span class='legenda-one'>Gehandicaptenzorg :</span>   " + (d.gehandicapten) + "<br>" +
          "<span class='legenda-two'>Geestelijkegezondheidszorg :</span>   " + (d.geestelijk) + "<br>" +
          "<span class='legenda-three'>Thuiszorg :</span>   " + (d.thuiszorg) + "<br>" +
          "<h4> Cijfers uit   " + (d.jaar) + "</h4>" +
          "<span>Omzet :</span>   " + CommaFormatted(d.omzet) + "<br>" +
          "<span>Winst :</span>   " + CommaFormatted(d.winst) + "<br>" +
          "<span>Personeelskosten :</span>   " + CommaFormatted(d.personeelskosten) + "<br>" +
          "<span>Omzet per FTE :</span>   " + CommaFormatted(d.omzet_fte) + "<br>" +
          "<span>FTE :</span>   " + CommaFormatted(d.fte) + "<br>" +
          "<span>Winst percentage :</span>   " + (d.perc_winst) + "%<br>" +
          "<span>Loon percentage :</span>   " + (d.perc_loon) + "%<br>"

        );
      points.style("opacity", .2)
      this.setAttribute("style", "opacity: 1; stroke-width: 3; stroke: black;")

    })
    .on("click", function (d) {
      d3.select('.saved-list').append('li')

      .style("opacity", 1)
      .style("display", "inline-block")
      .html("<h3> " + (d.naam) + "</h3>" +
        "<span>Plaats :</span>   " + (d.plaats) + "<br>" +
        "<span>Concerncode :</span>   " + (d.concerncode) + "<br>" +
        "<h4> Soort zorg </h4>" +
        "<span class='legenda-one'>Gehandicaptenzorg :</span>   " + (d.gehandicapten) + "<br>" +
        "<span class='legenda-two'>Geestelijkegezondheidszorg :</span>   " + (d.geestelijk) + "<br>" +
        "<span class='legenda-three'>Thuiszorg :</span>   " + (d.thuiszorg) + "<br>" +
        "<h4> Cijfers uit   " + (d.jaar) + "</h4>" +
        "<span>Omzet :</span>   " + CommaFormatted(d.omzet) + "<br>" +
        "<span>Winst :</span>   " + CommaFormatted(d.winst) + "<br>" +
        "<span>Personeelskosten :</span>   " + CommaFormatted(d.personeelskosten) + "<br>" +
        "<span>Omzet per FTE :</span>   " + CommaFormatted(d.omzet_fte) + "<br>" +
        "<span>FTE :</span>   " + CommaFormatted(d.fte) + "<br>" +
        "<span>Winst percentage :</span>   " + (d.perc_winst) + "%<br>" +
        "<span>Loon percentage :</span>   " + (d.perc_loon) + "%<br>" +
          "<div class='remove-list'></div>"

        );
      closeButtons = document.querySelectorAll('.remove-list');
      console.log(closeButtons)
      if (closeButtons) {
        console.log('click-me')
        for (var i = 0; i < closeButtons.length; i++) {
          closeButtons[i].addEventListener('click', function () {
            console.dir(this);
            this.parentElement.remove();
          })
        }
      }
    });



  points.transition()
    .duration(500)
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
    .attr('transform', 'translate(0,0)')
    .lower()
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
  var resetButton = d3.select('.reset').on("click", function () {
    zoom.transform(pointgroup, d3.zoomIdentity.scale(1));
  })

  slider.addEventListener('change', changeValues());
  xMenu.addEventListener('change', changeValues());
  yMenu.addEventListener('change', changeValues());


  function changeValues() {
    slider.addEventListener('input', function () {
      var xMenuValue = document.querySelector(".xMenu").value;
      var yMenuValue = document.querySelector(".yMenu").value;

      console.log(yMenuValue)
      console.log(xMenuValue)

      var yValue = d => d[yMenuValue];
      var xValue = d => d[xMenuValue];
      var slider = document.querySelector('.slider');
      var sliderValue = slider.value;
      var xScale = d3
        .scaleLinear()
        .domain(d3.extent(data[sliderValue].entries, xValue))
        .range([0, width])
        .nice();

      var yScale = d3
        .scaleLinear()
        .domain(d3.extent(data[sliderValue].entries, yValue))
        .range([height, 0])
        .nice();

      var xAxis = d3
        .axisBottom(xScale)
        .ticks(10)
        .tickSize(-height);

      var yAxis = d3
        .axisLeft(yScale)
        .ticks(10)
        .tickSize(-width);

      var gX = d3.select(".x-axis")
        .call(xAxis);

      var gY = d3.select(".y-axis")
        .call(yAxis);

      var points =
        d3.selectAll("circle")
        .data(data[sliderValue].entries)

      points.enter()
        .append("circle")
        .merge(points)
        .attr("class", function (d) {
          if (d.zorgsoort == 1) {
            return "bg-one"
          } else if (d.zorgsoort == 2) {
            return "bg-two"
          } else if (d.zorgsoort == 3) {
            return "bg-three"
          } else if (d.zorgsoort == 4) {
            return "bg-four"
          } else if (d.zorgsoort == 5) {
            return "bg-five"
          } else if (d.zorgsoort == 6) {
            return "bg-six"
          } else if (d.zorgsoort == 7) {
            return "bg-seven"
          };
        })
        .style("opacity", function (d) {
          if (typeof d.omzet != "number") {
            return 0
          } else if (typeof d.winst != "number") {
            return 0
          };
        })
        // .attr("cy", d => yScale(yValue(d)))
        // .attr("cx", d => xScale(xValue(d)))
        // .attr("r", "5")
        // .on("mouseleave", function (d) {
        //   tooltip
        //     .style("opacity", 0)
        //
        //     points.style("opacity", 1)
        //     this.setAttribute("style", "opacity: 1; stroke-width: 0; stroke: black;")
        //
        // })
        .on("mousemove", function (d) {
          tooltip
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 150 + "px")
            .style("opacity", 1)
            .style("display", "inline-block")
            .html("<h3> " + (d.naam) + "</h3>" +
              "<span>Plaats :</span>   " + (d.plaats) + "<br>" +
              "<span>Concerncode :</span>   " + (d.concerncode) + "<br>" +
              "<h4> Soort zorg </h4>" +
              "<span class='legenda-one'>Gehandicaptenzorg :</span>   " + (d.gehandicapten) + "<br>" +
              "<span class='legenda-two'>Geestelijkegezondheidszorg :</span>   " + (d.geestelijk) + "<br>" +
              "<span class='legenda-three'>Thuiszorg :</span>   " + (d.thuiszorg) + "<br>" +
              "<h4> Cijfers uit   " + (d.jaar) + "</h4>" +
              "<span>Omzet :</span>   " + CommaFormatted(d.omzet) + "<br>" +
              "<span>Winst :</span>   " + CommaFormatted(d.winst) + "<br>" +
              "<span>Personeelskosten :</span>   " + CommaFormatted(d.personeelskosten) + "<br>" +
              "<span>Omzet per FTE :</span>   " + CommaFormatted(d.omzet_fte) + "<br>" +
              "<span>FTE :</span>   " + CommaFormatted(d.fte) + "<br>" +
              "<span>Winst percentage :</span>   " + (d.perc_winst) + "%<br>" +
              "<span>Loon percentage :</span>   " + (d.perc_loon) + "%<br>"

            );
          points.style("opacity", .2)
          this.setAttribute("style", "opacity: 1; stroke-width: 3; stroke: black; transition: ease all .5s")
        })
        .on("click", function (d) {
          d3.select('.saved-list').append('li')

            .style("opacity", 1)
            .style("display", "inline-block")
            .html("<h3> " + (d.naam) + "</h3>" +
              "<span>Plaats :</span>   " + (d.plaats) + "<br>" +
              "<span>Concerncode :</span>   " + (d.concerncode) + "<br>" +
              "<h4> Soort zorg </h4>" +
              "<span class='legenda-one'>Gehandicaptenzorg :</span>   " + (d.gehandicapten) + "<br>" +
              "<span class='legenda-two'>Geestelijkegezondheidszorg :</span>   " + (d.geestelijk) + "<br>" +
              "<span class='legenda-three'>Thuiszorg :</span>   " + (d.thuiszorg) + "<br>" +
              "<h4> Cijfers uit   " + (d.jaar) + "</h4>" +
              "<span>Omzet :</span>   " + CommaFormatted(d.omzet) + "<br>" +
              "<span>Winst :</span>   " + CommaFormatted(d.winst) + "<br>" +
              "<span>Personeelskosten :</span>   " + CommaFormatted(d.personeelskosten) + "<br>" +
              "<span>Omzet per FTE :</span>   " + CommaFormatted(d.omzet_fte) + "<br>" +
              "<span>FTE :</span>   " + CommaFormatted(d.fte) + "<br>" +
              "<span>Winst percentage :</span>   " + (d.perc_winst) + "%<br>" +
              "<span>Loon percentage :</span>   " + (d.perc_loon) + "%<br>" +
              "<div class='remove-list'></div>"

            );
          closeButtons = document.querySelectorAll('.remove-list');
          console.log(closeButtons)
          if (closeButtons) {
            console.log('click-me')
            for (var i = 0; i < closeButtons.length; i++) {
              closeButtons[i].addEventListener('click', function () {
                console.dir(this);
                this.parentElement.remove();
              })
            }
          }
        });
      points.transition()
        .duration(500)
        .attr("cy", d => yScale(yValue(d)))
        .attr("cx", d => xScale(xValue(d)))
        .attr("r", "5");

      points.exit().remove();

      // Pan and zoom
      var zoom = d3.zoom()
        .scaleExtent([.5, 100])
        .extent([
          [0, 0],
          [width, height]
        ])
        .on("zoom", zoomed);

      d3.select("svg")
        .style("pointer-events", "all")
        .attr('transform', 'translate(0,0)')
        .lower()
        .call(zoom);

      function zoomed() {
        // create new scale ojects based on event
        var new_xScale = d3.event.transform.rescaleX(xScale);
        var new_yScale = d3.event.transform.rescaleY(yScale);
        // update axes
        gX.call(xAxis.scale(new_xScale));
        gY.call(yAxis.scale(new_yScale));
        points.data(data[sliderValue].entries)
          .attr("cy", d => new_yScale(yValue(d)))
          .attr("cx", d => new_xScale(xValue(d)))
      }

      var resetButton = d3.select('.reset').on("click", function () {
        zoom.transform(pointgroup, d3.zoomIdentity.scale(1));
      })

    })
    xMenu.addEventListener('change', function () {
      var slider = document.querySelector('.slider');
      var sliderValue = slider.value;
      var xMenuValue = document.querySelector(".xMenu").value;
      var yMenuValue = document.querySelector(".yMenu").value;

      console.log(yMenuValue)
      console.log(xMenuValue)

      var yValue = d => d[yMenuValue];
      var xValue = d => d[xMenuValue];

      var xScale = d3
        .scaleLinear()
        .domain(d3.extent(data[sliderValue].entries, xValue))
        .range([0, width])
        .nice();

      var yScale = d3
        .scaleLinear()
        .domain(d3.extent(data[sliderValue].entries, yValue))
        .range([height, 0])
        .nice();

      var xAxis = d3
        .axisBottom(xScale)
        .ticks(10)
        .tickSize(-height);

      var yAxis = d3
        .axisLeft(yScale)
        .ticks(10)
        .tickSize(-width);

      var gX = d3.select(".x-axis")
        .call(xAxis);

      var gY = d3.select(".y-axis")
        .call(yAxis);

      var points =
        d3.selectAll("circle")
        .data(data[sliderValue].entries)

      points.enter()
        .append("circle")
        .merge(points)
        .attr("class", function (d) {
          if (d.zorgsoort == 1) {
            return "bg-one"
          } else if (d.zorgsoort == 2) {
            return "bg-two"
          } else if (d.zorgsoort == 3) {
            return "bg-three"
          } else if (d.zorgsoort == 4) {
            return "bg-four"
          } else if (d.zorgsoort == 5) {
            return "bg-five"
          } else if (d.zorgsoort == 6) {
            return "bg-six"
          } else if (d.zorgsoort == 7) {
            return "bg-seven"
          };
        })
        .style("opacity", function (d) {
          if (typeof d.omzet != "number") {
            return 0
          } else if (typeof d.winst != "number") {
            return 0
          };
        })
        // .attr("cy", d => yScale(yValue(d)))
        // .attr("cx", d => xScale(xValue(d)))
        // .attr("r", "5")
        // .on("mouseleave", function (d) {
        //   tooltip
        //     .style("opacity", 0)
        //
        //     points.style("opacity", 1)
        //     this.setAttribute("style", "opacity: 1; stroke-width: 0; stroke: black;")
        //
        // })
        .on("mousemove", function (d) {
          tooltip
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 150 + "px")
            .style("opacity", 1)
            .style("display", "inline-block")
            .html("<h3> " + (d.naam) + "</h3>" +
              "<span>Plaats :</span>   " + (d.plaats) + "<br>" +
              "<span>Concerncode :</span>   " + (d.concerncode) + "<br>" +
              "<h4> Soort zorg </h4>" +
              "<span class='legenda-one'>Gehandicaptenzorg :</span>   " + (d.gehandicapten) + "<br>" +
              "<span class='legenda-two'>Geestelijkegezondheidszorg :</span>   " + (d.geestelijk) + "<br>" +
              "<span class='legenda-three'>Thuiszorg :</span>   " + (d.thuiszorg) + "<br>" +
              "<h4> Cijfers uit   " + (d.jaar) + "</h4>" +
              "<span>Omzet :</span>   " + CommaFormatted(d.omzet) + "<br>" +
              "<span>Winst :</span>   " + CommaFormatted(d.winst) + "<br>" +
              "<span>Personeelskosten :</span>   " + CommaFormatted(d.personeelskosten) + "<br>" +
              "<span>Omzet per FTE :</span>   " + CommaFormatted(d.omzet_fte) + "<br>" +
              "<span>FTE :</span>   " + CommaFormatted(d.fte) + "<br>" +
              "<span>Winst percentage :</span>   " + (d.perc_winst) + "%<br>" +
              "<span>Loon percentage :</span>   " + (d.perc_loon) + "%<br>"
            );
          points.style("opacity", .2)
          this.setAttribute("style", "opacity: 1; stroke-width: 3; stroke: black; transition: ease all .5s")
        })
        .on("click", function (d) {
          d3.select('.saved-list').append('li')

            .style("opacity", 1)
            .style("display", "inline-block")
            .html("<h3> " + (d.naam) + "</h3>" +
              "<span>Plaats :</span>   " + (d.plaats) + "<br>" +
              "<span>Concerncode :</span>   " + (d.concerncode) + "<br>" +
              "<h4> Soort zorg </h4>" +
              "<span class='legenda-one'>Gehandicaptenzorg :</span>   " + (d.gehandicapten) + "<br>" +
              "<span class='legenda-two'>Geestelijkegezondheidszorg :</span>   " + (d.geestelijk) + "<br>" +
              "<span class='legenda-three'>Thuiszorg :</span>   " + (d.thuiszorg) + "<br>" +
              "<h4> Cijfers uit   " + (d.jaar) + "</h4>" +
              "<span>Omzet :</span>   " + CommaFormatted(d.omzet) + "<br>" +
              "<span>Winst :</span>   " + CommaFormatted(d.winst) + "<br>" +
              "<span>Personeelskosten :</span>   " + CommaFormatted(d.personeelskosten) + "<br>" +
              "<span>Omzet per FTE :</span>   " + CommaFormatted(d.omzet_fte) + "<br>" +
              "<span>FTE :</span>   " + CommaFormatted(d.fte) + "<br>" +
              "<span>Winst percentage :</span>   " + (d.perc_winst) + "%<br>" +
              "<span>Loon percentage :</span>   " + (d.perc_loon) + "%<br>" +
              "<div class='remove-list'></div>"

            );
          closeButtons = document.querySelectorAll('.remove-list');
          console.log(closeButtons)
          if (closeButtons) {
            console.log('click-me')
            for (var i = 0; i < closeButtons.length; i++) {
              closeButtons[i].addEventListener('click', function () {
                console.dir(this);
                this.parentElement.remove();
              })
            }
          }
        });

      points.transition()
        .duration(500)
        .attr("cy", d => yScale(yValue(d)))
        .attr("cx", d => xScale(xValue(d)))
        .attr("r", "5");

      points.exit().remove();

      // Pan and zoom
      var zoom = d3.zoom()
        .scaleExtent([.5, 100])
        .extent([
          [0, 0],
          [width, height]
        ])
        .on("zoom", zoomed);

      d3.select("svg")
        .style("pointer-events", "all")
        .attr('transform', 'translate(0,0)')
        .lower()
        .call(zoom);

      function zoomed() {
        // create new scale ojects based on event
        var new_xScale = d3.event.transform.rescaleX(xScale);
        var new_yScale = d3.event.transform.rescaleY(yScale);
        // update axes
        gX.call(xAxis.scale(new_xScale));
        gY.call(yAxis.scale(new_yScale));
        points.data(data[sliderValue].entries)
          .attr("cy", d => new_yScale(yValue(d)))
          .attr("cx", d => new_xScale(xValue(d)))
      }

      var resetButton = d3.select('.reset').on("click", function () {
        zoom.transform(pointgroup, d3.zoomIdentity.scale(1));
      })


    })
    yMenu.addEventListener('change', function () {
      var slider = document.querySelector('.slider');
      var sliderValue = slider.value;
      var xMenuValue = document.querySelector(".xMenu").value;
      var yMenuValue = document.querySelector(".yMenu").value;

      console.log(yMenuValue)
      console.log(xMenuValue)

      var yValue = d => d[yMenuValue];
      var xValue = d => d[xMenuValue];

      var xScale = d3
        .scaleLinear()
        .domain(d3.extent(data[sliderValue].entries, xValue))
        .range([0, width])
        .nice();

      var yScale = d3
        .scaleLinear()
        .domain(d3.extent(data[sliderValue].entries, yValue))
        .range([height, 0])
        .nice();

      var xAxis = d3
        .axisBottom(xScale)
        .ticks(10)
        .tickSize(-height);

      var yAxis = d3
        .axisLeft(yScale)
        .ticks(10)
        .tickSize(-width);

      var gX = d3.select(".x-axis")
        .call(xAxis);

      var gY = d3.select(".y-axis")
        .call(yAxis);

      var points =
        d3.selectAll("circle")
        .data(data[sliderValue].entries)

      points.enter()
        .append("circle")
        .merge(points)
        .attr("class", function (d) {
          if (d.zorgsoort == 1) {
            return "bg-one"
          } else if (d.zorgsoort == 2) {
            return "bg-two"
          } else if (d.zorgsoort == 3) {
            return "bg-three"
          } else if (d.zorgsoort == 4) {
            return "bg-four"
          } else if (d.zorgsoort == 5) {
            return "bg-five"
          } else if (d.zorgsoort == 6) {
            return "bg-six"
          } else if (d.zorgsoort == 7) {
            return "bg-seven"
          };
        })
        .style("opacity", function (d) {
          if (typeof d.omzet != "number") {
            return 0
          } else if (typeof d.winst != "number") {
            return 0
          };
        })
        // .attr("cy", d => yScale(yValue(d)))
        // .attr("cx", d => xScale(xValue(d)))
        // .attr("r", "5")
        // .on("mouseleave", function (d) {
        //   tooltip
        //     .style("opacity", 0)
        //
        //     points.style("opacity", 1)
        //     this.setAttribute("style", "opacity: 1; stroke-width: 0; stroke: black; transition: ease all .5s")
        //
        // })
        .on("mousemove", function (d) {
          tooltip
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 150 + "px")
            .style("opacity", 1)
            .style("display", "inline-block")
            .html("<h3> " + (d.naam) + "</h3>" +
              "<span>Plaats :</span>   " + (d.plaats) + "<br>" +
              "<span>Concerncode :</span>   " + (d.concerncode) + "<br>" +
              "<h4> Soort zorg </h4>" +
              "<span class='legenda-one'>Gehandicaptenzorg :</span>   " + (d.gehandicapten) + "<br>" +
              "<span class='legenda-two'>Geestelijkegezondheidszorg :</span>   " + (d.geestelijk) + "<br>" +
              "<span class='legenda-three'>Thuiszorg :</span>   " + (d.thuiszorg) + "<br>" +
              "<h4> Cijfers uit   " + (d.jaar) + "</h4>" +
              "<span>Omzet :</span>   " + CommaFormatted(d.omzet) + "<br>" +
              "<span>Winst :</span>   " + CommaFormatted(d.winst) + "<br>" +
              "<span>Personeelskosten :</span>   " + CommaFormatted(d.personeelskosten) + "<br>" +
              "<span>Omzet per FTE :</span>   " + CommaFormatted(d.omzet_fte) + "<br>" +
              "<span>FTE :</span>   " + CommaFormatted(d.fte) + "<br>" +
              "<span>Winst percentage :</span>   " + (d.perc_winst) + "%<br>" +
              "<span>Loon percentage :</span>   " + (d.perc_loon) + "%<br>"

            );
          points.style("opacity", .2)
          this.setAttribute("style", "opacity: 1; stroke-width: 3; stroke: black; transition: ease all .5s")
        })
        .on("click", function (d) {
          d3.select('.saved-list').append('li')
          .style("opacity", 1)
          .style("display", "inline-block")
          .html("<h3> " + (d.naam) + "</h3>" +
            "<span>Plaats :</span>   " + (d.plaats) + "<br>" +
            "<span>Concerncode :</span>   " + (d.concerncode) + "<br>" +
            "<h4> Soort zorg </h4>" +
            "<span class='legenda-one'>Gehandicaptenzorg :</span>   " + (d.gehandicapten) + "<br>" +
            "<span class='legenda-two'>Geestelijkegezondheidszorg :</span>   " + (d.geestelijk) + "<br>" +
            "<span class='legenda-three'>Thuiszorg :</span>   " + (d.thuiszorg) + "<br>" +
            "<h4> Cijfers uit   " + (d.jaar) + "</h4>" +
            "<span>Omzet :</span>   " + CommaFormatted(d.omzet) + "<br>" +
            "<span>Winst :</span>   " + CommaFormatted(d.winst) + "<br>" +
            "<span>Personeelskosten :</span>   " + CommaFormatted(d.personeelskosten) + "<br>" +
            "<span>Omzet per FTE :</span>   " + CommaFormatted(d.omzet_fte) + "<br>" +
            "<span>FTE :</span>   " + CommaFormatted(d.fte) + "<br>" +
            "<span>Winst percentage :</span>   " + (d.perc_winst) + "%<br>" +
            "<span>Loon percentage :</span>   " + (d.perc_loon) + "%<br>" +
              "<div class='remove-list'></div>"

            );
          closeButtons = document.querySelectorAll('.remove-list');
          console.log(closeButtons)
          if (closeButtons) {
            console.log('click-me')
            for (var i = 0; i < closeButtons.length; i++) {
              closeButtons[i].addEventListener('click', function () {
                console.dir(this);
                this.parentElement.remove();
              })
            }
          }
        });

      points.transition()
        .duration(500)
        .attr("cy", d => yScale(yValue(d)))
        .attr("cx", d => xScale(xValue(d)))
        .attr("r", "5");

      points.exit().remove();

      // Pan and zoom
      var zoom = d3.zoom()
        .scaleExtent([.5, 100])
        .extent([
          [0, 0],
          [width, height]
        ])
        .on("zoom", zoomed);

      d3.select("svg")
        .style("pointer-events", "all")
        .attr('transform', 'translate(0,0)')
        .lower()
        .call(zoom);


      function zoomed() {
        // create new scale ojects based on event
        var new_xScale = d3.event.transform.rescaleX(xScale);
        var new_yScale = d3.event.transform.rescaleY(yScale);
        // update axes
        gX.call(xAxis.scale(new_xScale));
        gY.call(yAxis.scale(new_yScale));
        points.data(data[sliderValue].entries)
          .attr("cy", d => new_yScale(yValue(d)))
          .attr("cx", d => new_xScale(xValue(d)))
      }

      var resetButton = d3.select('.reset').on("click", function () {
        zoom.transform(pointgroup, d3.zoomIdentity.scale(1));
      })

    })
  }
}


function CommaFormatted(amount) {
    if (typeof amount === "number") {
        var result = amount.toLocaleString()
        return result.replace(/,/g, ".")
    } else {
        return "Niet beschikbaar voor 2017"
    }
}

export {
  scotterPlot
};
