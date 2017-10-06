import React from 'react'
import { Text, View, Button, BackHandler, ScrollView, Image, StyleSheet, RefreshControl } from 'react-native'
import Post from '../components/Post'
import HeaderPost from '../components/HeaderPost'
import { Actions } from 'react-native-router-flux'

export default class InfluencerPosts extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.props.backAndroidHandler || this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.props.backAndroidHandler || this.onBackPress)
  }

  onBackPress = () => {
    Actions.pop()
  }

  render () {
    const params = this.props

    return (
      <View >
        <HeaderPost
          name="Gabriele"
          img='https://i.vimeocdn.com/portrait/6193893_640x640'
        />
        <ScrollView>

          <Post
            name="Image2"
            img="https://i.vimeocdn.com/portrait/6193893_640x640"
          />
          <Post
            name="Image2"
            img="https://i.vimeocdn.com/portrait/6193893_640x640"
          />
          <Post
            name="Image2"
            img="https://i.vimeocdn.com/portrait/6193893_640x640"
          />
          <Post
            name="Image2"
            img="https://i.vimeocdn.com/portrait/6193893_640x640"
          />
          <Post
            name="Image2"
            img="https://i.vimeocdn.com/portrait/6193893_640x640"
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10
  }

})