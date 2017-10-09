import React from 'react'
import {TextInput, StyleSheet, AsyncStorage, ScrollView} from 'react-native'
import Interests from '../components/Interests'
import PopularityBar from '../components/PopularityBar'
import {View, Card, Content, CardItem, Left, Right, Label} from 'native-base'

const myTags = []
let suggestedTags = []

function getSuggestedTags(callback) {
  AsyncStorage.getItem('suggestedTags', async (err, result) => {
    if (!result) {
      AsyncStorage.getItem('token', (e, res) => {
        if (res) {
          getTagsUsedFromInstagram(res, callback)
        } else {
          suggestedTags = suggestedTags.concat(['sugg4', 'sugg2', 'sugg3'])
          callback(suggestedTags)
        }
      })
    } else {
      callback(JSON.parse(result))
    }
  })
}

function getMyTags(callback) {
  AsyncStorage.getItem('myTags', async (err, result) => {
    if (!result) {
      return
    } else {
      callback(JSON.parse(result))
    }
  })
}

function getTagsUsedFromInstagram(token, callback) {
  fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token + '&count=10')
    .then((response) => response.json())
    .then((responseJson) => {
      let tags = []
      responseJson.data.forEach(function (elem) {
        tags = tags.concat(elem.tags)
      })
      const counts = {}
      tags.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1
      })
      let sorted = Object.keys(counts).sort(function (a, b) {
        return counts[b] - counts[a]
      })
      sorted = sorted.splice(0, 10)
      tags = sorted
      AsyncStorage.setItem('myTags', JSON.stringify(tags))
      callback(tags)
    })
    .catch((error) => {
      console.error(error)
    })
}

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      inputState: '',
      myTags: myTags,
      suggestedTags: suggestedTags
    }

  }

  componentWillMount() {
    //this.setState({ showLoading: true});
    var self = this
    getSuggestedTags(function (res) {
      self.setState({suggestedTags: res})
    })
    getMyTags(function (res) {
      self.setState({myTags: res})
    })

  }

  onDataChange(key, remove) {
    var data
    if (remove) {
      data = this.state.myTags
      data.splice(data.indexOf(key), 1)
      this.setState({myTags: data})
      AsyncStorage.setItem('myTags', JSON.stringify(data))
    }
    else {
      data = this.state.suggestedTags
      data.splice(data.indexOf(key), 1)
      const newTags = this.state.myTags.concat(key)
      this.setState({myTags: newTags})
      AsyncStorage.setItem('myTags', JSON.stringify(newTags))
      this.setState({suggestedTags: data})

    }
  }

  render() {
    const {params} = this.props.navigation.state
    return (
      <Content style={styles.container}>
        <Card>
          <TextInput
            style={{height: 40, padding: 10}}
            placeholder="Add new interest!"
            value={this.state.inputState}
            onChangeText={(text) => {
              this.setState({text})
              this.setState({inputState: text})
              if (text.indexOf(' ') != -1) {
                this.setState({text: ''})
                const newTags = this.state.myTags.concat(text)
                this.setState({myTags: newTags})
                this.setState({inputState: ''})
              }
            }}
            onSubmitEditing={async (event) => {
              this.setState({text: ''})
              const newTags = this.state.myTags.concat(event.nativeEvent.text)
              this.setState({myTags: newTags})
              this.setState({inputState: ''})
              await AsyncStorage.setItem('myTags', JSON.stringify(newTags))
            }}
          />
          <Interests
            onDataChange={this.onDataChange.bind(this)}
            deletable={true}
            data={this.state.myTags}/>
        </Card>

        <Card style={{flex: 1}}>
          <CardItem>
            <Left>
              <Label style={{textAlign: 'left', color: 'black'}}>Suggested for you: </Label>
            </Left>
          </CardItem>

          <Interests
            onDataChange={this.onDataChange.bind(this)}
            addable={true}
            data={this.state.suggestedTags}/>

        </Card>

        <PopularityBar/>

      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column'
  }

})