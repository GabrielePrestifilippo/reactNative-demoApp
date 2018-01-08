import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Loading extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {params} = this.props

    return (
      <View>
        <Text>App is Loading...</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({})