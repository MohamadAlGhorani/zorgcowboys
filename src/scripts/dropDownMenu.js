/*

  The DOM structure looks like this:

  <select>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </select>

*/

// export const dropdownMenu = (selection, props) => {
//     const {
//         onOptionClicked,
//         selectedOption
//     } = props;

//     let select = selection.selectAll('select').data([null]);
//     select = select.enter().append('select')
//         .merge(select)
//         .on('change', function () {
//             onOptionClicked(this.value);
//         });

//     const option = select.selectAll('option').data(checkKeys(data));
//     option.enter().append('option')
//         .merge(option)
//         .attr('value', d => d)
//         .property('selected', d => d === selectedOption)
//         .text(d => d);
// };

export function genOptionsForDropdownMenu(data, menuClass) {
    // console.log(Object.keys(data[0].entries[0]))
    var selectMenu = d3.select("#app").append('select').attr("class", menuClass)
    var option =
        selectMenu
        .selectAll("option")
        .data(checkKeys(data))
        .enter().append('option')
        .attr('value', d => d)
        .text(d => d);

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
