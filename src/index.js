import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index.jsx";

const rootEl = document.getElementById("root");
if (rootEl.hasChildNodes()) {
    ReactDOM.hydrate(<BrowserRouter><Index/></BrowserRouter>, document.querySelector("#root"));
} else {
    ReactDOM.render(<BrowserRouter><Index/></BrowserRouter>, document.querySelector("#root"));
}
