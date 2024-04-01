import { combineReducers } from "redux";
import { homeSlice } from "./home";
export default combineReducers({
     homeData: homeSlice.reducer,
})