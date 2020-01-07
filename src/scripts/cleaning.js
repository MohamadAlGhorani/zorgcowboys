import {
    runApi
} from './runApi.js'

var api =
    "https://mohamadalghorani.github.io/zorgcowboys-data/zorgcowboys.json";

runApi(api)
    .then(data =>
        clean(data)
    )

function clean(data) {
    cleanZorgInput(data)

    var newdata = d3.nest()
        .key(function (d) {
            return d.concerncode;
        })
        .key(function (d) {
            return d.jaar;
        })
        .entries(data)
        .map(function (group) {
            var lastActiveYear = group.values.length - 1;
            return {
                concerncode: group.key,
                bedrijfsnaam: group.values[lastActiveYear].values[0].bedrijfsnaam,
                plaats: group.values[lastActiveYear].values[0].plaats,
                zorgSoort: checkZorg(group.values[lastActiveYear].values[0]),
                jaren: group.values
            }
        })

    console.log(newdata)
}

function checkZorg(data) {
    // console.log("infunction:", data)
    //
    // Alleen Geestelijk: 1
    // Alleen Gehandicapte: 2
    // Alleen Thuiszorg: 3
    // Geestelijk & Gehandicapten: 4
    // Geestelijk & Thuiszorg: 5
    // Gehandicapten & Thuiszorg 6
    // Alles: 7
    if (data.geestelijkegezondheidszorg == "ja") {
        if (data.gehandicaptenzorg == "ja" && data.thuiszorg == "ja") {
            return 7
        } else if (data.gehandicaptenzorg == "ja" && data.thuiszorg == "nee") {
            return 4
        } else if (data.gehandicaptenzorg == "nee" && data.thuiszorg == "ja") {
            return 5
        } else if (data.gehandicaptenzorg == "nee" && data.thuiszorg == "nee") {
            return 1
        }
    } else if (data.gehandicaptenzorg == "ja") {
        if (data.thuiszorg == "ja") {
            return 6
        } else if (data.thuiszorg == "nee") {
            return 2
        }
    } else if (data.thuiszorg == "ja") {
        return 3
    }
}

function cleanZorgInput(data) {
    console.log("cleanZorgInput", data)
    data.map(item => {
        item.geestelijkegezondheidszorg = item.geestelijkegezondheidszorg.toLowerCase()
        item.gehandicaptenzorg = item.gehandicaptenzorg.toLowerCase()
        item.thuiszorg = item.thuiszorg.toLowerCase()
        if (item.geestelijkegezondheidszorg == "na" || item.geestelijkegezondheidszorg == "no") {
            item.geestelijkegezondheidszorg = "nee"
        }
        if (item.geestelijkegezondheidszorg == "yes") {
            item.geestelijkegezondheidszorg = "ja"
        }
        if (item.gehandicaptenzorg == "na" || item.gehandicaptenzorg == "no") {
            item.gehandicaptenzorg = "nee"
        }
        if (item.gehandicaptenzorg == "yes") {
            item.gehandicaptenzorg = "ja"
        }
        if (item.thuiszorg == "na" || item.thuiszorg == "no") {
            item.thuiszorg = "nee"
        }
        if (item.thuiszorg == "yes") {
            item.thuiszorg = "ja"
        }
        return item
    })

    return data
}