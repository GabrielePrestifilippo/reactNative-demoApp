import React from 'react'
import { Image, View} from 'react-native'
import {Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right} from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import {Actions} from 'react-native-router-flux'
export default class Post extends React.Component {

  constructor(props) {
    super(props)
  }

  onNamePress() {
   // Actions.InfluencerPosts(1)
  }

  render() {
    const {params} = this.props

    return (
      <View>
        <Content>
          <Card>
            <CardItem cardBody={true}>
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
                <Text style={styles.text}>222</Text>
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