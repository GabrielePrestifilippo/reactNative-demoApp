import React from 'react'
import { Image, View, Linking } from 'react-native'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'


export default class Post extends React.Component {

  constructor (props) {
    super(props)
  }

  onNamePress () {
    // Actions.InfluencerPosts(1)
  }

  openLink () {

    //Linking.openURL('http://instagram.com/_u/gabry501/#Intent;package=com.instagram.android;scheme=https').catch(err => console.error('e', err));
    Linking.openURL('android-app://com.instagram.android/https/instagram.com/p/BYI7mzwFc1W').catch(err => console.error('e', err))
//IOS instagram://media?id=1587781020299939158
  }

  render () {
    const {params} = this.props

    return (
      <View>
        <Content>
          <Card>
            <CardItem button cardBody={true} onPress={() => this.openLink()}>
              <Image source={{uri: this.props.img}} style={{height: 200, width: null, flex: 1}} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent={true}>
                  <Icon active={true} name="thumbs-up" />
                  <Text>12</Text>
                </Button>
              </Left>
              <Body>
              <Button transparent={true}>
                <Icon active={true} name="chatbubbles" />
                <Text style={styles.text}>4</Text>
              </Button>
              </Body>
              <Right>
                <Button transparent={true}>
                  <Icon active={true} name="people" />
                  <Text style={styles.text}>222</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </View>
    )
  }
}
const styles = EStyleSheet.create({
  text: {
    color: '$textColor',
    fontSize: 14,
    textAlign: 'left',

  },
  thumbnail: {
    width: 40,
    height: 40
  },
  button: {
    alignSelf: 'center'
  }
})