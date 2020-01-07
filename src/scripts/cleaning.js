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
    console.log(data)
    var newdata = d3.nest()
        .key(function (d) {
            return d.concerncode;
        })
        .key(function (d) {
            return d.jaar;
        })
        .entries(data)
        .map(function(group) {
            console.log(group)
		    return {
		    	concerncode: group.key,
                bedrijfsnaam: group.values[0].values[0].bedrijfsnaam,
                plaats: group.values[0].values[0].plaats,
                zorgSoort: checkZorg(group.values[0].values[0]),
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
        if (data.gehandicaptenzorg == "ja" && data.thuiszorg == "ja" ) {
            return 7
        }
        else if (data.gehandicaptenzorg == "ja" && data.thuiszorg == "nee" ) {
            return 4
        }
        else if (data.gehandicaptenzorg == "nee" && data.thuiszorg == "ja" ) {
            return 5
        }
        else if (data.gehandicaptenzorg == "nee" && data.thuiszorg == "nee" ) {
            return 1
        }
    } else if (data.gehandicaptenzorg == "ja") {
        if (data.thuiszorg == "ja" ) {
            return 6
        }
        else if (data.thuiszorg == "nee" ) {
            return 2
        }
    } else if (data.thuiszorg == "ja") {
        return 3
    }

}
