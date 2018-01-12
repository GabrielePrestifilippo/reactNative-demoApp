import React from 'react'
import { WebView, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { setTags, setToken } from '../actions'
import { Navigation } from 'react-native-navigation'
import Loading from '../components/Loading'
import realm from '../components/realm'
import { initDB, getToken, getMyTags } from '../components/Helper'

let started = false

const navigatorStyle = {
  statusBarColor: '#339999',
  navBarBackgroundColor: '#339999',
  navBarTextColor: '#ffffff',
  navBarButtonColor: '#ffffff',
  statusBarTextColorScheme: 'dark',
  navBarHidden: false,
  tabBarButtonColor: 'white',
  tabBarSelectedButtonColor: '#ffffff',
  tabBarBackgroundColor: '#339999',
  drawUnderTabBar: false
}

class Login extends React.Component {

  static navigationOptions = {
    header: null,
    tabBarHidden: true
  }
  static navigatorStyle = {
    tabBarHidden: true
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentWillMount () {
    initDB(realm)

    let myTags = getMyTags(realm)
    if (myTags) {
      let reduxTags = []
      myTags.tags.forEach(t => {
        reduxTags.push(t)
      })
      this.props.setTags(reduxTags)
    }

    this.token = getToken(realm)
    if (!this.token.code || this.token.code == null) {
      this.setState({isLoading: false})
    } else {
      this.props.setToken(this.token)
      this.switchToTabBased()
    }
    /*
    AsyncStorage.getItem('token', (err, result) => {
      if (!result || typeof(result) == 'object') {
        this.setState({isLoading: false})
      } else {
        let token = JSON.parse(result)
        if (token.expiry !== 'expired') {
          this.props.setToken(token)
          this.switchToTabBased()
        } else {
          this.setState({isLoading: false})
        }
      }
    })
    */
  }

  switchToTabBased () {
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
      tabsStyle: {
      },

      animationType: 'slide-down'

    })
  }

  render () {
    const {params} = this.props

    if (this.state.isLoading)
      return (<Loading />)
    else
      return (<WebView
        onNavigationStateChange={async (webViewState) => {
          if (webViewState.url.indexOf('access_token=') !== -1) {
            if (!started) {
              started = true
              try {
                const code = webViewState.nativeEvent.url.split('access_token=')[1]

                this.props.setToken({code: code, used: 0})

                realm.write(() => {
                  this.token.code = code
                  this.token.used = 0
                })
                this.switchToTabBased()
                /*
                await AsyncStorage.setItem('token', JSON.stringify(token), () => {
                  this.switchToTabBased()
                  //setTimeout(() => { this.props.navigator.push({screen: 'myInfluencer.Influencers'})}, 1000)
                })
                */

              } catch (error) {
                console.log(error)
              }

            }
          }
        }}

        onLoadStart={async (webViewState) => {
          if (webViewState.nativeEvent.url.indexOf('access_token=') !== -1) {
            if (!started) {
              started = true
              try {
                const code = webViewState.nativeEvent.url.split('access_token=')[1]

                this.props.setToken({code: code, used: 0})

                realm.write(() => {
                  this.token.code = code
                  this.token.used = 0
                })
                this.switchToTabBased()
                /*
                await AsyncStorage.setItem('token', JSON.stringify(token), () => {
                  this.switchToTabBased()
                  //setTimeout(() => { this.props.navigator.push({screen: 'myInfluencer.Influencers'})}, 1000)
                })
                */

              } catch (error) {
                console.log(error)
              }
            }
          }
        }}

        source={{
          uri: 'https://www.instagram.com/oauth/authorize/?client_id=7a02b45d3ddc41a9ac1033b95eb3244b&redirect_uri=http://muvias.eoapps.eu/loading.html&response_type=token&scope=basic+public_content'
        }}

      />)

  }
}

const
  mapStateToProps = state => ({
    token: state.token
  })

const
  mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(setToken(token)),
    setTags: (token) => dispatch(setTags(token))
  })

export default connect(mapStateToProps, mapDispatchToProps)

(
  Login
)