export function genYearSlider(data, sliderClass) {
    //console.log(Object.keys(data))
    var jaaren = data.map(object => object.jaar);
    // console.log(jaaren)
    var groupSlider =
        d3.select(".select-overlay")
        .append("div")
        .attr("class", "slider-container");

    var theLabel = groupSlider.append('p').attr('class', 'year-label').text("Jaar")
    var groupInput = groupSlider.append('div').attr('class', 'group-input');
    var firstYear = groupInput.append('p').attr('class', 'first-year').text(jaaren[0])

    var yearSlider =
        groupInput
        .append("input")
        .attr("class", sliderClass)
        .attr("type", "range")
        .attr("min", "0")
        .attr("max", data.length - 1)
        .attr("value", 0);

    var lastYear = groupInput.append('p').attr('class', 'last-year').text(jaaren[jaaren.length - 1])

    var sliderValue = document.querySelector('.slider').value

    var sliderLabel = groupSlider.append("p")
        .text(jaaren[sliderValue])

    yearSlider.on("change", function () {
        var sliderValue = document.querySelector('.slider').value
        sliderLabel.text(jaaren[sliderValue])
    })

    return yearSlider;
}