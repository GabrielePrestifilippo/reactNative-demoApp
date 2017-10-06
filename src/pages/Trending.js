import React, { Component } from 'react'
import { Image } from 'react-native'
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base'

const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: {uri:'https://i.vimeocdn.com/portrait/6193893_640x640'},
  },
  {
    text: 'Card Two',
    name: 'Two',
    image: {uri:'https://i.vimeocdn.com/portrait/6193893_640x640'},
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
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{elevation: 3}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                    <Text>{item.text}</Text>
                    <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody onSwipeRight={() => {this.onSwipeRight()}}>
                  <Image style={{height: 300, flex: 1}} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{color: '#ED4A6A'}} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
    )
  }
}