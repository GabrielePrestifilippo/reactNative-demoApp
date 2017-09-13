import React from "react";
import {Text, View, Button, ScrollView, Image, StyleSheet, RefreshControl, Linking, AsyncStorage} from "react-native";
import Influencer from "./Influencer";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {setToken} from '../actions'

async function getToken(navigation, callback) {
    let token = undefined;
    try {
        token = await AsyncStorage.getItem('token', (err, result) => {
            if (!result || typeof(result) == 'object') {
              Actions.login();
            } else {
                callback(result);
            }
        });

    }
    catch (error) {
        console.log(error);
    }

}

function getMedia(token) {
    return fetch('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + token)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

class Influencers extends React.Component {

    navigation = this.props.navigation;

    componentWillMount() {
        this.state = {
            token: this.props.code
        };
        if (!this.state.token) {
            var token = getToken(navigation, getMedia);
            this.setState({token: token});

        }
        else
            getMedia(token);


    };

    componentDidMount() {

    };

    componentWillUnmount() {
        //Linking.removeEventListener('url', this._handleOpenURL);
    };

    _handleOpenURL(event) {
        token = 1;
        console.log(event.url);
        alert("handle" + event.url);
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

Influencers.propTypes = {
    navigation: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    code: state.authReducer.token,
});

const mapDispatchToProps = dispatch => ({
    goBack: () => Actions.back(),
    setToken: (token) => dispatch(setToken(token)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Influencers);
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