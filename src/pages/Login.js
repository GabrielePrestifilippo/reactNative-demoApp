import React from 'react'
import { WebView, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { setToken } from '../actions'

let started = false

class Login extends React.Component {

  static navigationOptions = {
    header: null,
    tabBarHidden: true
  }
  static navigatorStyle = {
    tabBarHidden: true
  };
  constructor (props) {
    super(props)
  }

  render () {
    const {params} = this.props

    return (
      <WebView
        onNavigationStateChange={async (webViewState) => {
          if (webViewState.url.indexOf('access_token=') !== -1) {
            if (!started) {
              started = true
              try {
                const code = webViewState.nativeEvent.url.split('access_token=')[1]
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                let token = {
                  code: code,
                  expiry: tomorrow.getTime()
                }
                this.props.setToken(token)
                await AsyncStorage.removeItem('token', async () => {
                  await AsyncStorage.setItem('token', JSON.stringify(token), () => {
                    setTimeout(() => { this.props.navigator.push({screen: 'myInfluencer.Influencers'})}, 1000)
                  })
                })

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
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                let token = {
                  code: code,
                  expiry: tomorrow.getTime()
                }
                this.props.setToken(token)
                await AsyncStorage.removeItem('token', async () => {
                  await AsyncStorage.setItem('token', JSON.stringify(token), () => {
                    setTimeout(() => { this.props.navigator.push({screen: 'myInfluencer.Influencers'})}, 1000)
                  })
                })

              } catch (error) {
                console.log(error)
              }
            }
          }

        }}
        source={{
          uri: 'https://www.instagram.com/oauth/authorize/?client_id=7a02b45d3ddc41a9ac1033b95eb3244b&redirect_uri=http://muvias.eoapps.eu/loading.html&response_type=token&scope=basic+public_content'
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  setToken: (token) => dispatch(setToken(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)