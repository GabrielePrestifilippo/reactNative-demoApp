import React from 'react'
import {Text, View, Button, BackHandler, ScrollView, Image, StyleSheet, RefreshControl} from 'react-native'
import Post from './Post'
import {Actions} from 'react-native-router-flux'

export default class InfluencerPosts extends React.Component {

  constructor(props) {
    super(props)
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.backAndroidHandler || this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.backAndroidHandler || this.onBackPress);
  }

  onBackPress = () => {
    Actions.pop();
  };

  render() {
    const params = this.props


    return (
      <ScrollView>

        <Post
          navigation={this.props.navigation}
          name="Image1"
          img="https://scontent-mxp1-1.cdninstagram.com/t51.2885-19/s320x320/15625029_192333571230902
            _5577959308185829376_a.jpg"
        />

        <Post navigation={this.props.navigation}
          name="Image2"
          img="http://www.halkidikiproperties.com/images/news_images/online_anathesi/%CE%97%CE%BB%CE%B5%
            CE%BA%CF%84%CF%81%CE%BF%CE%BD%CE%B9%CE%BA%CE%AE%20%CE%B1%CE%BD%CE%AC%CE%B8%CE%B5%CF%83%CE%B7%20
            %CE%BA%CE%B1%CE%B9%20%CE%B5%CF%80%CE%B9%CE%BB%CE%BF%CE%B3%CE%AE%20%CF%80%CE%B1%CE%BA%CE%AD%CF%84
            %CE%BF%CF%85%20%CE%B4%CE%B9%CE%B1%CF%86%CE%AE%CE%BC%CE%B9%CF%83%CE%B7%CF%82%20%CE%B1%CE%BA%CE%B9%
            CE%BD%CE%AE%CF%84%CE%BF%CF%85%202.jpg"
        />
      </ScrollView>
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