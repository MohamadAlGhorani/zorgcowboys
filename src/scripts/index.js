import "../styles.scss";
import "babel-polyfill";
console.log("hello world!");

(function request() {
    fetch("zorgcowboys.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            makeVisualization(data);
        });
})();

function makeVisualization(data) {
    console.log(data);
}