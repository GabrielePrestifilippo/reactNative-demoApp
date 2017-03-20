import React from "react";
import {Text, View, Button, ScrollView, Image, StyleSheet, RefreshControl} from "react-native";

export default class Influencers extends React.Component {
    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: ({state}) => {
            return `Influencers`;
        },
        header: ({state, setParams}) => {

        },
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(()=>this.setState({refreshing: false}),100)
    }

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const {params} = this.props.navigation.state;
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        colors={["#ee001c","#EE0EAE", "#511AEE"]}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}/>
                }
                    >
                        <View style={styles.postContainer}>
                            <Text style={styles.name}>GabrieleP92</Text>
                            <View style={styles.imageContainer}>
                                <Image resizeMode='center' resizeMethod='scale' style={styles.profilePic}
                                       source={require('../img/me.jpg')}/>
                            </View>
                            <View style={styles.subImage}>
                                <Text style={styles.number}>222 Followers</Text>
                                <View title="like" onPress={() => {
                                }} style={styles.like}><Text>L</Text></View>
                            </View>
                        </View>
                        <View style={styles.postContainer}>
                            <Text style={styles.name}>GabrieleP92</Text>
                            <View style={styles.imageContainer}>
                                <Image resizeMode='center' resizeMethod='scale' style={styles.profilePic}
                                       source={require('../img/me.jpg')}/>
                            </View>
                            <View style={styles.subImage}>
                                <Text style={styles.number}>222 Followers</Text>
                                <View title="like" onPress={() => {
                                }} style={styles.like}><Text>L</Text></View>
                            </View>
                        </View>
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
        height:30
    },
        name: {
        flex: 1,
        backgroundColor:'#42ff6a',
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
        number: {
        flex: 1,
        backgroundColor:'#fdff6e',
        borderBottomLeftRadius:5
    },
        like: {
        flex: 1,
        backgroundColor:'#a2ffe2',
        borderBottomRightRadius:5
    }

    });