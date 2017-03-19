import React from "react";
import {AppRegistry, Text, View, Button, Linking} from "react-native";
import {TabNavigator} from "react-navigation";
import Profile from "./pages/Profile";
import Influencers from "./pages/Influencers";
import Trending from "./pages/Trending";

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

const myInfluencers = TabNavigator({
    Influencers: {screen: Influencers},
    Trending: {screen: Trending},
    Profile: {screen: Profile}
}, tabConfig);


AppRegistry.registerComponent('myInfluencers', () => myInfluencers);