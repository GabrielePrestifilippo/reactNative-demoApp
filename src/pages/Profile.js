import React from 'react'
import { TextInput, StyleSheet, AsyncStorage, ScrollView } from 'react-native'
import Interests from '../components/Interests'
import PopularityBar from '../components/PopularityBar'
import { View, Card, Content, CardItem, Left, Right, Label } from 'native-base'
import { connect } from 'react-redux'
import { setTags, removeTag, addTag } from '../actions'
import realm from '../components/realm'
import { getSuggestedTags, getMyTags } from '../components/Helper'

let suggestedTags = []

class Profile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      inputState: '',
      suggestedTags: suggestedTags
    }

    this.db = {
      myTags: null,
      suggestedTags: null
    }

    this.onDataChange = this.changeData.bind(this)

  }

  retrieveSuggestedTags (callback) {

    this.db.suggestedTags = getSuggestedTags(realm)
    if (this.db.suggestedTags.tags && this.db.suggestedTags.tags.length !== 0) {
      callback(this.db.suggestedTags.tags)
    } else {
      this.getTagsUsedFromInstagram(this.props.token.code, callback)
    }
    /*
        AsyncStorage.getItem('suggestedTags', async (err, result) => {
          if (result) {
            const tags = JSON.parse(result)

            if (tags.expiry && new Date(tags.expiry) > new Date()) {
              callback(tags)
            }
            else {
              this.getTagsUsedFromInstagram(this.props.token.code, callback)
            }
          } else {
            this.getTagsUsedFromInstagram(this.props.token.code, callback)
          }
        })
        */
  }

  getTagsUsedFromInstagram (token, callback) {
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
        let notPresent = sorted.filter((t) => !this.props.tags.myTags.includes(t))
        notPresent = notPresent.splice(0, 10)
        tags = notPresent.map(t => t.toUpperCase())
        callback(tags)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  componentWillMount () {
    //this.setState({ showLoading: true});
    var self = this
    this.db.myTags = getMyTags(realm)
    this.retrieveSuggestedTags(function (res) {
      let suggested = []
      res.forEach(t => {
        suggested.push(t)
      })
      self.setState({suggestedTags: suggested})
    })

  }

  changeData (key, remove) {
    //remove from myTags
    if (remove) {
      this.props.removeTag(key)
      realm.write(() => {
        this.db.myTags.tags.splice(this.db.myTags.tags.indexOf(key), 1)
      })
    }
    //add from suggested to mytags
    else {

      let suggested = this.state.suggestedTags.tags
      suggested.splice(suggested.indexOf(key), 1)
      if (this.props.tags.myTags.indexOf(key) == -1) {
        this.props.addTag(key)
        realm.write(() => {
          this.db.myTags.tags.push(key)
        })
      }
      realm.write(() => {
        this.db.suggestedTags.tags.splice(this.db.suggestedTags.tags.indexOf(key), 1)
      })
      this.setState({suggestedTags: suggested})
    }
  }

  //writing to add to mytags
  addTag (text) {
    text = text.toUpperCase()
    text = text.replace(/\s/g, '')
    this.setState({text: ''})
    if (this.props.tags.myTags.indexOf(text) == -1) {
      this.props.addTag(text)
      realm.write(() => {
        this.db.myTags.tags.push(text)
      })

      let suggested = this.state.suggestedTags

      if (suggested.indexOf(text) !== -1) {
        suggested = suggested.splice(suggested.indexOf(text), 1)
        realm.write(() => {
          this.db.suggestedTags.tags.splice(this.db.suggestedTags.tags.indexOf(text), 1)
        })
      }
    }
    this.setState({inputState: ''})
  }

  render () {
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
                this.addTag(text)
              }
            }}
            onSubmitEditing={async (event) => {
              this.addTag(event.nativeEvent.text)
            }}
          />
          {this.props.tags.myTags && this.props.tags.myTags[0] &&
          <Interests
            onDataChange={this.onDataChange}
            deletable={true}
            data={this.props.tags.myTags} />
          }
        </Card>

        <Card style={{flex: 1}}>
          <CardItem>
            <Left>
              <Label style={{textAlign: 'left', color: 'black'}}>Suggested for you: </Label>
            </Left>
          </CardItem>

          {this.state.suggestedTags &&
          <Interests
            onDataChange={this.onDataChange}
            addable={true}
            data={this.state.suggestedTags} />
          }
        </Card>

        <PopularityBar />

      </Content>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
  tags: state.tags
})

const mapDispatchToProps = dispatch => ({
  setTags: (token) => dispatch(setTags(token)),
  removeTag: (token) => dispatch(removeTag(token)),
  addTag: (token) => dispatch(addTag(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column'
  }

})