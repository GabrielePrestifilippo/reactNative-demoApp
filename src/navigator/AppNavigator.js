import React from "react";
import {StackNavigator, TabNavigator, addNavigationHelpers} from "react-navigation";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Profile from "../pages/Profile";
import Influencers from "../pages/Influencers";
import Trending from "../pages/Trending";
import Influencer from "../pages/Influencer";
import Login from "../pages/Login";


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


const HomeTabs = TabNavigator({
    Influencers: {screen: Influencers},
    Trending: {screen: Trending},
    Profile: {screen: Profile}
}, tabConfig);

export const AppNavigator = TabNavigator({
    Home: {
        screen: HomeTabs
    },
    Influencer: {
        screen: Influencer,
    },
    Influencers: {
        screen: Influencers,
    },
    Login: {
        screen: Login,
    }
}, {
    navigationOptions: {
        tabBarVisible: false
    },
    swipeEnabled: false
});


const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);