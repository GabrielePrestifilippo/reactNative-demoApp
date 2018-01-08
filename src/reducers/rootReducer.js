import { combineReducers } from 'redux';
import {tags, token} from './index';


const rootReducer = combineReducers({
  token,
  tags
});

export default rootReducer;