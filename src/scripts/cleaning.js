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
        .entries(data)
    console.log(newdata)
}