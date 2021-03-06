import {
    runApi
} from './runApi.js'

import {
    scotterPlot
} from './scotterplot.js'

var api =
    "https://mohamadalghorani.github.io/zorgcowboys-data/zorgcowboys.json";

runApi(api)
    .then(data =>
        clean(data)
    )

function clean(data) {
    cleanZorgInput(data)
    var nestedData = nestDataFunc(data)
    var chartData = chartDataFunc(nestedData)
    var realChartData = testFunc(chartData)
    // console.log(realChartData)
    scotterPlot(realChartData)

}

function testFunc(data) {
    var obj = {}
    var arr = []
    for (const [key, value] of Object.entries(data)) {
        obj = {
            jaar: key,
            entries: value
        }
        arr.push(obj)
    }
    return arr
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

function nestDataFunc(data) {
    var nestedData = d3.nest()
        .key(function (d) {
            return d.jaar;
        })
        .key(function (d) {
            return d.concerncode;
        })
        .entries(data)
        .map(function (group) {
            var lastActiveYear = group.values.length - 1;

            var test = {};
            var plaats;
            group.values.map(item => {
                // item.values.map(object => {
                //         // delete object.plaats,
                //         // delete object.bedrijfsnaam,
                //         // delete object.concerncode,
                //         // delete object.geestelijkegezondheidszorg,
                //         // delete object.gehandicaptenzorg,
                //         // delete object.thuiszorg
                //         //
                //         // if (object.jaar < 2017){
                //         //     delete object.fte,
                //         //     delete object.omzet_fte
                //         //     delete object.jaar
                //         // } else {
                //         //     delete object.jaar
                //         // }
                //         plaats = object.plaats
                // })

                // test = {
                //     concerncode: item.key,
                //     plaats: plaats
                // }

            })
            return {
                jaar: group.key,
                entries: group.values
            }
        })
    return nestedData
}

function chartDataFunc(data) {
    return data.reduce((jarenObj, item) => {
        jarenObj[item.jaar] = item.entries.map(entry => {
            return {
                concerncode: entry.key,
                plaats: entry.values[0].plaats,
                naam: entry.values[0].bedrijfsnaam,
                zorgsoort: checkZorg(entry.values[0]),
                omzet: naChecker(entry.values[0].omzet),
                fte: checkFte(entry.values[0]),
                omzet_fte: checkFteOmzet(entry.values[0]),
                perc_loon: naChecker(entry.values[0].perc_loon),
                perc_winst: naChecker(entry.values[0].perc_winst),
                winst: naChecker(entry.values[0].winst),
                personeelskosten: naChecker(entry.values[0].personeelskostentotaal),
                jaar: naChecker(entry.values[0].jaar),
                gehandicapten: entry.values[0].gehandicaptenzorg,
                geestelijk: entry.values[0].geestelijkegezondheidszorg,
                thuiszorg: entry.values[0].thuiszorg,
                jaar: entry.values[0].jaar
            }
        })

        return jarenObj
    }, {})
}


function checkFte(data) {
    if (data.jaar > 2016) {
        return data.fte
    } else {
        return null
    }
}

function checkFteOmzet(data) {
    if (data.jaar > 2016) {
        return data.omzet_fte
    } else {
        return null
    }
}

function naChecker(data) {
    if (data == "NA" || data == "na") {
        return null
    } else {
        return data
    }


}

// jaren['2011']
