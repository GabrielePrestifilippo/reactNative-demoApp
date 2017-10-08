import React, { PropTypes } from 'react'
import { Image, View, TouchableOpacity, Linking } from 'react-native'
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  List,
  Left,
  ListItem,
  Body,
  Right
} from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Actions } from 'react-native-router-flux'

export default class HeaderPost extends React.Component {

  constructor (props) {
    super(props)
  }

  onClose () {
    Actions.pop()
  }

  openLink () {

    Linking.openURL('http://instagram.com/_u/gabry501/#Intent;package=com.instagram.android;scheme=https').catch(err => console.error('e', err))
  }

  render () {
    const img = this.props.img,
      name = this.props.name

    return (
      <View>
        <List style={{backgroundColor: 'white', elevation: 4, borderBottomWidth: 0}}>
          <ListItem style={{backgroundColor: 'white', borderBottomWidth: 0}} avatar>
            <Left button onPress={() => this.openLink()}>
              <Thumbnail source={{uri: img}} />
            </Left>
            <Body style={{backgroundColor: 'white', borderBottomWidth: 0}}>
            <Text>{name}</Text>
            <Text note>Doing what you like will always keep you happy . .</Text>
            </Body>
            <TouchableOpacity style={{backgroundColor: 'white'}} button onPress={() => {this.onClose()}}>
              <Right style={{backgroundColor: 'white', borderBottomWidth: 0}}>
                <Icon name='close' />
              </Right>
            </TouchableOpacity>
          </ListItem>
        </List>

      </View>
    )
  }
}

HeaderPost.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string

}
const styles = EStyleSheet.create({
  text: {
    color: '$textColor',
    fontSize: 14,
    textAlign: 'left',

  },
  thumbnail: {
    width: 40,
    height: 100
  },
  button: {
    alignSelf: 'center'
  }
})