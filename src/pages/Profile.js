import React from "react";
import {Text, View, Button, TextInput, StyleSheet, Linking, AsyncStorage} from "react-native";
import Interests from "./Interests";


let tags=[];
function getProfile(callback) {
    AsyncStorage.getItem('myTags', async(err, result) => {
        if (!result) {
            AsyncStorage.getItem('token', (e, res) => {
                if (res) {
                    getTags(res,callback);
                }
            });
        } else {
            callback(JSON.parse(result));
        }
    });
}

function getTags(token,callback) {
    fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token + '&count=10')
        .then((response) => response.json())
        .then((responseJson) => {
            let tags = [];
            responseJson.data.forEach(function (elem) {
                tags = tags.concat(elem.tags);
            });
            let counts = {};
            tags.forEach(function (x) {
                counts[x] = (counts[x] || 0) + 1;
            });
            let sorted = Object.keys(counts).sort(function (a, b) {
                return counts[b] - counts[a]
            });
            sorted = sorted.splice(0, 10);
            tags=sorted;
            AsyncStorage.setItem('myTags', JSON.stringify(tags));
            callback(tags);
        })
        .catch((error) => {
            console.error(error);
        });
}


export default class Profile extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            text:'',
            inputState:'',
            initTags:tags
        };

    }


    componentWillMount() {
        //this.setState({ showLoading: true});
        var self=this;
        getProfile(function(res){
            self.setState({initTags: res});
        });

    }

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40}}
                    placeholder="Add new interest!"
                    value={this.state.inputState}
                    onChangeText={(text) => {
                        this.setState({text:text});
                        this.setState({inputState:text});
                        if (text.indexOf(" ") != -1) {
                            this.setState({text:''});
                            let newTags=this.state.initTags.concat(text);
                            this.setState({initTags:newTags});
                            this.setState({inputState:''});
                        }
                    }}
                    onSubmitEditing={async (event) => {
                        this.setState({text:''});
                        let newTags=this.state.initTags.concat(event.nativeEvent.text);
                        this.setState({initTags:newTags});
                        this.setState({inputState:''});
                        await AsyncStorage.setItem('myTags', JSON.stringify(newTags));
                    }}

                />
                <Interests data={this.state.initTags}/>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    }

});