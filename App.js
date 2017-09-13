import React from 'react'
import { AppRegistry, Text, View, Button, Linking } from 'react-native'
import { createStore } from 'redux'
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
} from 'react-native-router-flux'

import { appReducer } from './src/reducers'
import {Provider, connect} from 'react-redux';
import Profile from './src/pages/Profile'
import Influencers from './src/pages/Influencers'
import Trending from './src/pages/Trending'
import Influencer from './src/pages/Influencer'
import Login from './src/pages/Login'

const store = createStore(appReducer)

const myInfluencers = () => {
  return (
    <Provider store={store}>
      <Router wrapBy={connect()}>
        <Scene key="root" hideNavBar hideTabBar>
          <Scene key="tabbar" hideNavBar tabs={true}  tabBarPosition="bottom">
            <Scene key='Influencers' title='AppList' component={Influencers}></Scene>
            <Scene key='Profile' title='AppList' component={Profile}></Scene>
            <Scene key='Trending' title='AppList' component={Trending}></Scene>
          </Scene>
          <Scene key="stack" hideNavBar hideTabBar >
            <Scene key='Influencer' title='AppList' component={Influencer}></Scene>
            <Scene key='Login' title='AppList' component={Login}></Scene>
          </Scene>

        </Scene>
      </Router>
    </Provider>
  )
}

AppRegistry.registerComponent('myInfluencers', () => myInfluencers)
export default myInfluencers