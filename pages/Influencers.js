import React from "react";
import {Text, View, Button, ScrollView, Image, StyleSheet, RefreshControl, WebView, Linking } from "react-native";
import Influencer from "./Influencer";
import login from "./login";

export default class Influencers extends React.Component {

    componentWillMount() {
        var clientId = '7a02b45d3ddc41a9ac1033b95eb3244b';
        Linking.openURL('https://api.instagram.com/oauth/authorize/?client_id='+clientId+'&redirect_uri=https://www.instagram.com/&response_type=code')

    }
    componentDidMount() {
        Linking.addEventListener('url', this._handleOpenURL);
        const url = Linking.getInitialURL().then(url => {
            if (url) {
                console.log(url);
            }
        });
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL);
    }
    _handleOpenURL(event) {
        console.log(event.url);
    }

    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: ({state}) => {
            return `Influencers`;
        },
        header: ({state, setParams}) => {

        },
    }

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
        var navigation=this.props.navigation;
        var clientId = '7a02b45d3ddc41a9ac1033b95eb3244b';
        return (

            <ScrollView
                style={styles.influencers}
                keyboardShouldPersistTaps="always"
                refreshControl={
                    <RefreshControl
                        colors={["#ee001c", "#EE0EAE", "#511AEE"]}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}/>
                }
            >

                <Influencer
                    navigation={this.props.navigation}
                    name="GabrieleP"
                    img="https://scontent-mxp1-1.cdninstagram.com/t51.2885-19/s320x320/15625029_192333571230902_5577959308185829376_a.jpg"
                />

                <Influencer
                    navigation={this.props.navigation}
                    name="Pippo"
                    img="http://www.halkidikiproperties.com/images/news_images/online_anathesi/%CE%97%CE%BB%CE%B5%CE%BA%CF%84%CF%81%CE%BF%CE%BD%CE%B9%CE%BA%CE%AE%20%CE%B1%CE%BD%CE%AC%CE%B8%CE%B5%CF%83%CE%B7%20%CE%BA%CE%B1%CE%B9%20%CE%B5%CF%80%CE%B9%CE%BB%CE%BF%CE%B3%CE%AE%20%CF%80%CE%B1%CE%BA%CE%AD%CF%84%CE%BF%CF%85%20%CE%B4%CE%B9%CE%B1%CF%86%CE%AE%CE%BC%CE%B9%CF%83%CE%B7%CF%82%20%CE%B1%CE%BA%CE%B9%CE%BD%CE%AE%CF%84%CE%BF%CF%85%202.jpg"
                />
            </ScrollView>

        );
    }


}

const styles = StyleSheet.create({

    influencers: {
        flexDirection: 'column',
        flex: 3,
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