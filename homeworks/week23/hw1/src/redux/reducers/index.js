import { combineReducers } from "redux";
import filters from "./filters";
import todos from "./todos";

export default combineReducers({ todoState: todos, filterState: filters });
