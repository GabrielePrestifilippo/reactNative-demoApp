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
