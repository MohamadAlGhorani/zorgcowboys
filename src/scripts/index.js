import "../styles.scss";
import "babel-polyfill";
import { clean } from "./cleaning.js";


window.onbeforeunload = function() {
  return "Are you sure you want to leave?";
};
