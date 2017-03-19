import React from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

export default class Trending extends React.Component {
    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: ({ state }) => {
            return `Trending`;
        },
        header: ({ state, setParams }) => {

        },
    };

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const {params} = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {1}</Text>
            </View>
        );
    }
}