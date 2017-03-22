import React from "react";
import {AppRegistry, Text, View, Button, Linking} from "react-native";
import {StackNavigator, TabNavigator} from "react-navigation";
import Profile from "./pages/Profile";
import Influencers from "./pages/Influencers";
import Trending from "./pages/Trending";
import Influencer from "./pages/Influencer";

const tabConfig = {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazyLoad: false,
    tabBarOptions: {
        activeTintColor: '#f8fdff',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: '#ff0081',
        },
    }
};



const tabs = TabNavigator({
    Influencers: {screen: Influencers},
    Trending: {screen: Trending},
    Profile: {screen: Profile}
}, tabConfig);

const myInfluencers = StackNavigator({
    Home: {
        screen: tabs
    },
    Influencer: {
        screen: Influencer,
        navigationOptions: {
            header: {
                visible: false
            }
        }
    }
});


AppRegistry.registerComponent('myInfluencers', () => myInfluencers);