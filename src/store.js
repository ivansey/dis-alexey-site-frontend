import { createStore } from "redux";
import reducer from "./redux";
import initStore from "./redux/initStore";

const store = createStore(reducer, initStore);

export default store;