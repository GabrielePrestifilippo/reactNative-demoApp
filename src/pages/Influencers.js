import React from 'react'
import { ScrollView, RefreshControl, AsyncStorage } from 'react-native'
import Influencer from '../components/Influencer'

import { connect } from 'react-redux'

import EStyleSheet from 'react-native-extended-stylesheet'
import { setToken } from '../actions'

class Influencers extends React.Component {
  async getToken (navigator, callback) {
    let token = undefined

    try {
      token = await AsyncStorage.getItem('token', (err, result) => {
        if (!result || typeof(result) == 'object') {
          navigator.push({screen: 'myInfluencer.Login'})
        } else {
          token = JSON.parse(result)
          this.props.setToken(token)
          callback(token.code)
        }
      })

    }
    catch (error) {
      console.log(error)
    }

  }

  getMedia (token) {
    return fetch('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + token)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      })
  }

  componentWillMount () {

    var navigator = this.props.navigator
    if (!this.props.token.code || !this.props.token.expiry) {
      this.getToken(navigator, this.getMedia)
    }
    else
      this.getMedia(this.props.token.code)
  }

  componentDidMount () {
  }

  componentWillUnmount () {
    //Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL (event) {
    const token = 1
    console.log(event.url)
  }

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  _onRefresh () {
    this.setState({refreshing: true})
    setTimeout(() => this.setState({refreshing: false}), 100)
  }

  render () {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={['#ee001c', '#EE0EAE', '#511AEE']}
            refreshing={this.state.refreshing || false}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <Influencer
          name="Pippo"
          img="https://i.vimeocdn.com/portrait/6193893_640x640"
          navigator={this.props.navigator}
        />
        <Influencer
          name="Pippo1"
          img="https://i.vimeocdn.com/portrait/6193893_640x640"
          navigator={this.props.navigator}
        />
      </ScrollView>
    )
  }

}

const mapStateToProps = state => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  goBack: () => Actions.back(),
  setToken: (token) => dispatch(setToken(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Influencers)

const styles = EStyleSheet.create({
  text: {
    color: '$textColor'
  },
  postContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10
  },
  imageContainer: {
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'
  },
  profilePic: {
    position: 'absolute'
  },
  subImage: {
    flex: 1,
    flexDirection: 'row',
    height: 30
  },
  name: {
    flex: 1,
    backgroundColor: '#42ff6a',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  number: {
    flex: 1,
    backgroundColor: '#fdff6e',
    borderBottomLeftRadius: 5
  },
  like: {
    flex: 1,
    backgroundColor: '#a2ffe2',
    borderBottomRightRadius: 5
  }

})