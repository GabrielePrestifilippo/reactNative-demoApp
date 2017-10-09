import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import {Actions} from 'react-native-router-flux'
import {Modal, Dimensions, TouchableHighlight} from 'react-native'
import {View, Card, CardItem, Text, Left, Right, Label} from 'native-base'

import * as Progress from 'react-native-progress'

var {height, width} = Dimensions.get('window')
export default class PopularityBar extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    modalVisible: false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  hideModal(visible) {
    this.setState({modalVisible: false})
  }

  onNamePress() {
    // Actions.InfluencerPosts(1)
  }

  render() {
    const {params} = this.props

    return (
      <View style={{height: 100}}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.hideModal()
          }}
        >
          <TouchableHighlight onPress={() => {
            this.hideModal()
          }} style={{backgroundColor: 'lightblue', flex: 1}}>
            <View>
              <Text>Hello World!</Text>
            </View>
          </TouchableHighlight>
        </Modal>

        <Card style={{
          flex: 1,

          flexDirection: 'column',
          alignSelf: 'center',
          top: 0,
          position: 'relative',
          alignContent: 'flex-start'
        }}
        >
          <CardItem
            button
            onPress={() => {
              this.setModalVisible(true)
            }}>
            <Left>
              <Label style={{textAlign: 'left', color: 'black'}}>Popularity</Label>
            </Left>
            <Right>
              <Label>Find More</Label>
            </Right>
          </CardItem>

          <CardItem>
            <Progress.Bar style={{backgroundColor: '#eeee'}}
                          borderRadius={0} borderWidth={0}
                          width={width * 89 / 100}
                          progress={0.3}/>
          </CardItem>

        </Card>

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