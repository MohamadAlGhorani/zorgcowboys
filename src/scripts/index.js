import "../styles.scss";
import "babel-polyfill";
import {
    runApi
} from './runApi.js'

console.log("Hello world");

var api =
    "https://mohamadalghorani.github.io/zorgcowboys-data/zorgcowboys.json";

console.log(runApi(api));