export function genYearSlider(data, sliderClass) {
    //console.log(Object.keys(data))
    var jaaren = data.map(object => object.jaar);
    // console.log(jaaren)
    var groupSlider =
        d3.select(".select-overlay")
        .append("div")
        .attr("class", "slider-container");

    var yearSlider =
        groupSlider
        .append("input")
        .attr("class", sliderClass)
        .attr("type", "range")
        .attr("min", "0")
        .attr("max", data.length - 1)
        .attr("value", 0);

    var sliderValue = document.querySelector('.slider').value

    var sliderLabel = groupSlider.append("p")
        .text(jaaren[sliderValue])

    yearSlider.on("change", function () {
        var sliderValue = document.querySelector('.slider').value
        sliderLabel.text(jaaren[sliderValue])
    })

    return yearSlider;
}