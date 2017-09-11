import React from "react";
import {AppRegistry, Text, View, Button, Linking} from "react-native";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigator/AppNavigator';


class myInfluencers extends React.Component {
    store = createStore(AppReducer);

    render() {
        return (
            <Provider store={this.store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}


AppRegistry.registerComponent('myInfluencers', () => myInfluencers);

export default myInfluencers;