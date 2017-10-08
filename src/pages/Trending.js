import React, { Component } from 'react'
import { Image, Modal, Dimensions, TouchableHighlight } from 'react-native'
import {
  Container,
  Header,
  View,
  Button,
  DeckSwiper,
  Card,
  CardItem,
  Item,
  Label,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Icon,
  Content,
  Footer
} from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'

var {height, width} = Dimensions.get('window')
const cards = [
  {
    text: 'Card One',
    name: 'One',
    like: 33,
    follow: 33,
    image: {uri: 'https://i.vimeocdn.com/portrait/6193893_640x640'},
  },
  {
    text: 'Card Two',
    name: 'Two',
    like: 11,
    follow: 53,
    image: {uri: 'https://i.vimeocdn.com/portrait/6193893_640x640'},
  },

]

export default class Trending extends Component {
  onSwipeRight () {
    console.log('right')
  }

  onSwipeLeft () {
    console.log('left')
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <DeckSwiper
          style={{flex: 1, position: 'relative', flexDirection: 'row'}}
          dataSource={cards}
          looping={false}
          onSwipeLeft={() => {this.onSwipeLeft()}}
          onSwipeRight={() => {this.onSwipeRight()}}
          renderItem={item =>
            <Card style={{elevation: 3}}>
              <CardItem style={{flex: 1}}>
                <Left>
                  <Thumbnail source={item.image} />
                  <Body>
                  <Text>{item.text}</Text>
                  <Text note>NativeBase</Text>
                  </Body>
                </Left>
                <Right>
                  <Button style={{position: 'relative'}}>
                    <Icon name='people' />
                    <Text>Follow</Text>
                  </Button>
                </Right>
              </CardItem>
              <CardItem style={{flex: 1}} cardBody>
                <Image style={{flex: 1, height: height - 295}} resizeMode='cover' source={item.image} />
              </CardItem>
              <CardItem style={styles.twoSide}>
                <View style={styles.left}>
                  <Icon name="heart" style={{color: '#ED4A6A'}} />
                  <Text>{item.like}</Text>
                </View>
                <View style={styles.right}>
                  <Icon name="people" style={{color: '#007ced'}} />
                  <Text>{item.follow}</Text>
                </View>
              </CardItem>

            </Card>
          }
        />
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  left: {
    alignSelf: 'flex-start',
    paddingLeft: '20%',
  },
  right: {
    alignSelf: 'flex-end',
    paddingRight: '20%',
  },
  twoSide: {
    justifyContent: 'space-between',
    flex: 1
  }
})