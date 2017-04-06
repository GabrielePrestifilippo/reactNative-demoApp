import React from "react";
import {Text, View, Button, ScrollView, Image, StyleSheet, RefreshControl, Linking} from "react-native";
import Influencer from "./Influencer";

var token=undefined;
export default class Influencers extends React.Component {
    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: ({state}) => {
            return `Influencers`;
        },
        header: ({state, setParams}) => {

        },
    };

    componentDidMount() {

        if(!token) {
            url = 'https://api.instagram.com/oauth/authorize/?client_id=' +
                '7a02b45d3ddc41a9ac1033b95eb3244b&redirect_uri=http://muvias.eoapps.eu/ESTWA/redirect.html&response_type=code';
            //cannot be here
            Linking.openURL(url).catch(err => console.error('An error occurred', err));

        }
        //when instagram redirects me here
        var url = Linking.getInitialURL().then((url) => {
            if (url) {

                token=1;
                alert('Initial url is: ' + url);
            }
        }).catch(err => console.error('An error occurred', err));

        Linking.addEventListener('url', this._handleOpenURL);
    };

    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL);
    };

    _handleOpenURL(event) {
        token=1;
        console.log(event.url);
        alert("handle"+event.url);
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };

    }

    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(() => this.setState({refreshing: false}), 100)
    }

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const {params} = this.props.navigation.state;
        navigation = this.props.navigation;
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        colors={["#ee001c", "#EE0EAE", "#511AEE"]}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}/>
                }
            >

                <Influencer navigation={navigation}
                            name="GabrieleP"
                            img="https://scontent-mxp1-1.cdninstagram.com/t51.2885-19/s320x320/15625029_192333571230902_5577959308185829376_a.jpg"
                />
                <Influencer navigation={navigation}
                            name="Pippo"
                            img="https://i.vimeocdn.com/portrait/6193893_640x640"
                />
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    imageContainer: {
        height: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        position: 'relative',
    },
    profilePic: {
        position: 'absolute',
    },
    subImage: {
        flex: 1,
        flexDirection: 'row',
        height: 30
    },
    name: {
        flex: 1,
        backgroundColor: '#42ff6a',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    number: {
        flex: 1,
        backgroundColor: '#fdff6e',
        borderBottomLeftRadius: 5
    },
    like: {
        flex: 1,
        backgroundColor: '#a2ffe2',
        borderBottomRightRadius: 5
    }

});