import "../styles.scss";
import "babel-polyfill";

console.log("Hello world");

var api =
  "https://mohamadalghorani.github.io/zorgcowboys-data/zorgcowboys.json";

function runQuery(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.log(error);
    });
}

console.log(runQuery(api));
