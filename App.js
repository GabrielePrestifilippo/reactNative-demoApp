import React from 'react'
import {AppRegistry, Text, View, Button, Linking} from 'react-native'
import {createStore} from 'redux'
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Stack
} from 'react-native-router-flux'

import {appReducer} from './src/reducers'
import {Provider, connect} from 'react-redux'
import Profile from './src/pages/Profile'
import Influencers from './src/pages/Influencers'
import Trending from './src/pages/Trending'
import InfluencerPosts from './src/pages/InfluencerPosts'
import Login from './src/pages/Login'
import EStyleSheet from 'react-native-extended-stylesheet'


EStyleSheet.build({
  $textColor: '#0275d8'
})
const store = createStore(appReducer)

const myInfluencers = () => {
  return (
    <Provider store={store}>
      <Router wrapBy={connect()}>
        <Scene key="root" hideNavBar={true} hideTabBar={true}>
          <Scene key="tabbar" hideNavBar={true} tabs={true} tabBarPosition="bottom">
            <Stack key='Influencers'>
              <Scene key='InfluencersList' title='AppList' component={Influencers}/>
              <Scene key='InfluencerPosts' title='AppList' component={InfluencerPosts}/>
            </Stack>
            <Scene key='Profile' title='AppList' component={Profile}/>
            <Scene key='Trending' title='AppList' component={Trending}/>
          </Scene>

          <Scene key="stack" hideNavBar={false} hideTabBar={false}>
            <Scene key='Login' title='AppList' component={Login}/>
          </Scene>

        </Scene>
      </Router>
    </Provider>
  )
}

AppRegistry.registerComponent('myInfluencers', () => myInfluencers)
export default myInfluencers