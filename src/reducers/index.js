import {combineReducers} from 'redux';
import { ActionConst } from 'react-native-router-flux';


const sceneReducer = (state = {}, {type, scene}) => {
  switch(type){
    case ActionConst.FOCUS:
      return { ...state, scene };
    default:
      return state;
  }
}

export function authReducer(state = {token: null}, action) {
    var token = {...state.token};
    switch (action.type) {
        case 'setToken':
            Object.assign(token, action.item);
            return {...state, position};
        default:
            return state;
    }
};

export const appReducer = combineReducers({
  sceneReducer,
  authReducer
});
