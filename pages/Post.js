import React from "react";
import {Text, View, Button, ScrollView, Image, StyleSheet, RefreshControl, TouchableWithoutFeedback} from "react-native";


export default class Post extends React.Component {
    static navigationOptions = {
        title: ({state}) => {
            return `InfluencerPosts`;
        },
    };

    constructor(props) {
        super(props);
    }


    render() {
        const params = this.props;


        return (
            <TouchableWithoutFeedback>
                <View
                    style={styles.postContainer}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <View style={styles.imageContainer}>
                        <Image resizeMode='center' resizeMethod='scale' style={styles.profilePic}
                            //source={{uri:this.props.img}}
                               source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        />
                    </View>
                    <View style={styles.subImage}>
                        <Text style={styles.number}>222 Followers</Text>
                        <View title="like" onPress={() => {
                    }} style={styles.like}><Text>L</Text></View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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