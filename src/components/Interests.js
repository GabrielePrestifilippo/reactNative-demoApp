import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import {
  Icon,
} from 'native-base'

export default class Interests extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    var self = this
    return <View style={styles.interests}>
      {this.props.data.map(function (key, val) {
        return <View key={val} style={styles.interest}>
          <Text style={styles.interestText}>{key}</Text>
          <Text onPress={() => {
            self.props.data.splice(self.props.data.indexOf(key), 1)
            self.setState({data: self.props.data}) //update state
          }}
                style={styles.deleteButton}
          >
            <Icon style={styles.icon} name='close' />
          </Text>
        </View>
      })}
    </View>

  }
}
const styles = StyleSheet.create({
  interests: {
    padding: 10,
    position: 'relative',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  interest: {
    backgroundColor: '#007ced',
    borderColor: '#007ced',
    borderWidth: 1,
    borderRadius: 2,
    margin: 5,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10

  },
  interestText: {
    color: '#fbfbfb',
    fontSize: 16,
  },
  deleteButton: {
    color: '#fbfbfb',
    padding: 5
  },
  icon: {fontSize: 16, paddingLeft: 2, color: 'white'}

})