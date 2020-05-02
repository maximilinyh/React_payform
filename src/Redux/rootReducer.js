import {combineReducers} from "redux";
import formControlsReducer from "./formControlsReducer";

const rootReducer = combineReducers({
    formControls: formControlsReducer
})
export default rootReducer;
