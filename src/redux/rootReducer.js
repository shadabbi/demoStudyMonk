import { combineReducers } from "redux";

import questionReducer from "./reducers/quetionsReducer/questionReducer";

const rootReducer = combineReducers({
  data: questionReducer,
});

export default rootReducer;
