import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Navigation} from 'react-native-navigation'
import {registerScreens} from './src/screens'

import configureStore from './src/store/configureStore'

const store = configureStore()

registerScreens(store, Provider)

const navigatorStyle = {
  statusBarColor: '#339999',
  //navigationBarColor: '#339999',
  navBarBackgroundColor: '#339999',
  navBarTextColor: '#ffffff',
  navBarButtonColor: '#ffffff',
  statusBarTextColorScheme: 'dark',
  navBarHidden: false,
  tabBarButtonColor: 'white',
  tabBarSelectedButtonColor: '#ffffff',
 tabBarBackgroundColor: '#339999'
}


Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Influencers',
      screen: 'myInfluencer.Influencers',
      icon: 'ios-person',
      selectedIcon: 'ios-person',
      title: 'Hello World',
      navigatorStyle
    },
    {
      label: 'Trending',
      screen: 'myInfluencer.Trending',
      icon: 'ios-person',
      selectedIcon: 'ios-person',
      title: 'Hello World',
      navigatorStyle
    },
    {
      label: 'Profile',
      screen: 'myInfluencer.Profile',
      icon: 'ios-person',
      selectedIcon: 'ios-person',
      title: 'Hello World',
      navigatorStyle
    }
  ],
  tabsStyle: {},

  animationType: 'slide-down'

})
