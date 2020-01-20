export function genOptionsForDropdownMenu(data, menuClass) {
    // console.log(Object.keys(data))
    var selectMenu = d3.select(".select-overlay").append('select').attr("class", menuClass)
    var option =
        selectMenu
        .selectAll("option")
        .data(checkKeys(data))
        .enter().append('option')
        .attr('value', d => d)
        .text((d) => {


            if (d == "omzet" || d == "winst" || d == "personeelskosten") {
                return d + " €"
            } else {
                return d + " %"
            };

        });

    return selectMenu
}

function checkKeys(data) {
    // console.log(data[0].entries[0])
    var newArr = []
    for (const [key, value] of Object.entries(data[0].entries[0])) {
        // console.log(key, value)
        if (typeof value != 'number') {

        } else if (key == "jaar" || key == "zorgsoort") {

        } else {
            newArr.push(key)
        }

    }

    return newArr
}