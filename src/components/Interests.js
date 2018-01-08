import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Button, Text, Icon, Badge
} from 'native-base'

export default class Interests extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    var self = this
    const {deletable, addable, onDataChange, data} = this.props

    return <View style={styles.interests}>
      {data.map(function (key, val) {
        return <View style={styles.buttonContainer} key={val}>
          <Button
            style={styles.button}
            onPress={() => {
              var remove = false
              if (deletable)
                remove = true
              onDataChange(key, remove)
            }}>

            <Text>{key}</Text>
            {addable &&
            <Icon style={styles.icon} name='add' />
            }
            {deletable &&
            <Icon style={styles.icon} name='close' />
            }
          </Button>
        </View>
      })}
    </View>
  }
}

const styles = StyleSheet.create({
  interests: {
    padding: 4,
    position: 'relative',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },

  button: {
    backgroundColor: '#007ced',
    padding: 2
  },
  buttonContainer: {
    padding: 5
  },
  icon: {
    fontSize: 20,
    lineHeight: 20,
    color: 'white'
  }

})