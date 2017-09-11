import {combineReducers} from 'redux';
import { NavigationActions } from 'react-navigation';
import  {AppNavigator} from '../navigator/AppNavigator';


const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

export function authReducer(state = {token: {}}, action) {
    var token = {...state.token};
    switch (action.type) {
        case 'setToken':
            Object.assign(token, action.item);
            return {...state, position};
        default:
            return state;
    }
};
const AppReducer = combineReducers({
    nav,
    authReducer
});

export default AppReducer;