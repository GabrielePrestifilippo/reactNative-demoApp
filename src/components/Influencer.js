import React from 'react'
import { Image, View } from 'react-native'
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'

export default class Influencer extends React.Component {

  constructor (props) {
    super(props)
  }

  onNamePress () {
    this.props.navigator.push({screen: 'myInfluencer.InfluencerPosts'})
  }

  render () {
    const {params} = this.props

    //alert(JSON.stringify(this.props));
    return (
      <View>
        <Content>
          <Card>
            <CardItem button={true} onPress={() => {
              this.onNamePress()
            }}>
              <Left>
                <Thumbnail style={styles.thumbnail} source={{uri: this.props.avatar}} />
                <Body>
                <Text>{this.props.name}</Text>
                <Text note={true}>{this.props.name}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem button cardBody={true} onPress={() => {
              this.onNamePress()
            }}>
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
              <Button style={styles.button} transparent={true}>
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
    textAlign: 'left'

  },
  thumbnail: {
    width: 40,
    height: 40
  },
  button: {
    alignSelf: 'center'
  }
})