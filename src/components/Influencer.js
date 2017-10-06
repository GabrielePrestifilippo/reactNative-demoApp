import React from 'react'
import { Image, View} from 'react-native'
import {Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right} from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import {Actions} from 'react-native-router-flux'
export default class Influencer extends React.Component {

  constructor(props) {
    super(props)
  }

  onNamePress() {
    Actions.InfluencerPosts(1)
  }

  render() {
    const {params} = this.props

    //alert(JSON.stringify(this.props));
    return (
      <View>
        <Content>
          <Card>

            <CardItem button={true} onPress={()=>{this.onNamePress()}} >
              <Left>
                <Thumbnail style={styles.thumbnail} source={{uri: this.props.img}} />
                <Body>
                  <Text>{this.props.name}</Text>
                  <Text note={true}>{this.props.name}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody={true}>
              <Image source={{uri: this.props.img}} style={{height: 200, width: null, flex: 1}} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent={true}>
                  <Icon active={true} name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent={true}>
                  <Icon active={true} name="chatbubbles" />
                  <Text style={styles.text}>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text style={styles.text}>222 Followers</Text>
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
    fontSize: 10,
    textAlign: 'left'
  },
  thumbnail: {
    width: 40,
    height: 40
  }
})