import React from 'react'
import { ScrollView, RefreshControl, StyleSheet, View, Text } from 'react-native'
import Influencer from '../components/Influencer'

import { connect } from 'react-redux'

import EStyleSheet from 'react-native-extended-stylesheet'
import { setToken, setTags } from '../actions'
import realm from '../components/realm'
import { initDB, getMyTags, getToken, getPeople } from '../components/Helper'

class Influencers extends React.Component {

  static navigatorStyle = {
    statusBarColor: '#339999',
    //navigationBarColor: '#339999',
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

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      media: [],
      people: {}
    }
    this.db = {people: null}
  }

  componentWillMount () {
    this.props.navigator.setTitle({
      title: 'Influencers'
    })

    this.db.people = getPeople(realm)
    let people = {}
    this.db.people.list.forEach(p => {
      people[p.id] = p
    })
    this.setState(people)

    if (!this.props.token.code) {
      let token = getToken(realm)
      if (!token.code) {
        this.props.navigator.push({screen: 'myInfluencer.Login'})
      } else {
        this.props.setToken({code: token.code, used: token.used})
        this.getMedia(token.code)
      }
    }
    else {
      this.getMedia(this.props.token.code)
    }

  }

  componentWillReceiveProps () {

  }

  getMedia (token) {

    if (this.props.tags && this.props.tags.myTags)
      this.props.tags.myTags.forEach((tag, index) => {
        if (index < 10) {
          this.fetchTag(tag, token, this.successTag.bind(this))
        }
      })
  }

  successTag (response) {
    if (!response || !response.data || !response.data.length) {
      return
    }
    let people = this.state.people
    response.data.forEach(function (d) {
      const likes = d.likes.count

      if (people[d.user.id]) {
        people[d.user.id].likes += likes
        if (d.images && d.images.standard_resolution && d.images.standard_resolution.url) {
          people[d.user.id].last_picture = d.images.standard_resolution.url
        }
      } else {
        people[d.user.id] = d.user
        people[d.user.id].likes = likes
        if (d.images && d.images.standard_resolution && d.images.standard_resolution.url) {
          people[d.user.id].last_picture = d.images.standard_resolution.url
        }
      }
    })
    let dbPeople = Object.keys(people).map(function (key) { return people[key] })
    realm.write(() => {
      this.db.people.list = dbPeople
    })

    this.setState(people)
  }

  fetchTag (tag, token, callback) {
    if (!tag)
      return
    fetch('https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + token)
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  renderPeople () {
    if (Object.keys(this.state.people).length === 0)
      return
    return Object.keys(this.state.people).map((key, index) => {
      return (
        <Influencer
          key={this.state.people[key].id}
          name={this.state.people[key].username}
          avatar={this.state.people[key].profile_picture}
          img={this.state.people[key].last_picture}
          navigator={this.props.navigator}
        />)
    })

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

  _onRefresh () {
    this.setState({refreshing: true})
    setTimeout(() => this.setState({refreshing: false}), 100)
  }

  render () {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            colors={['#ee001c', '#EE0EAE', '#511AEE']}
            refreshing={this.state.refreshing || false}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <View>
          <Text>{JSON.stringify(this.props.tags.myTags)}</Text>
          <Text>{JSON.stringify(this.state.media)}</Text>
          <Text>{JSON.stringify(this.state.people)}</Text>
        </View>

        {this.renderPeople()}
        {this.renderPeople()}

      </ScrollView>
    )
  }

}

const mapStateToProps = state => ({
  token: state.token,
  tags: state.tags
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Influencers)

const styles = StyleSheet.create({
  text: {
    color: '#222'
  },
  container: {
    paddingTop: 56,
    paddingBottom: 56
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