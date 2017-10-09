import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Navigation} from 'react-native-navigation'
import {registerScreens} from './src/screens'

import configureStore from './src/store/configureStore'

const store = configureStore()

registerScreens(store, Provider)

const navigatorStyle = {
  statusBarColor: '#831d19',
  navigationBarColor: '#339999',
  navBarBackgroundColor: '#339999',
  navBarTextColor: '#ffffff',
  navBarButtonColor: '#ffffff',
  statusBarTextColorScheme: 'light',
  navBarHidden: false,
  tabBarButtonColor: 'red',
  tabBarSelectedButtonColor: 'green',
  tabBarBackgroundColor: 'blue'
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
