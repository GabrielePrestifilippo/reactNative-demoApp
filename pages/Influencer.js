import React from "react";
import {
    Text,
    View,
    Button,
    ScrollView,
    Image,
    StyleSheet,
    RefreshControl,
    TouchableWithoutFeedback
} from "react-native";


export default class Influencer extends React.Component {
    static navigationOptions = {
        title: ({state}) => {
            return `Influencer`;
        },
    };

    constructor(props) {
        super(props);
    }


    render() {
        const params = this.props;
        const navigation = params.navigation;

        return (
            <TouchableWithoutFeedback   style={styles.postContainer}
                onPress={()=>navigation.navigate('InfluencerPosts', { user: 'Lucy', navigation: navigation })}>
                <View style={styles.influencer}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <View style={styles.imageContainer}>
                        <Image resizeMode='center' resizeMethod='scale' style={styles.profilePic}
                               source={{uri:this.props.img}}

                        />
                    </View>
                    <View style={styles.subImage}>
                        <Text style={styles.number}>222 Followers</Text>
                        <View title="like" onPress={() => {
                    }} style={styles.follow}><Text>F</Text></View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 3,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },
    influencer: {
        width:'40%',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: 10,
        alignSelf: 'flex-end',
        flexDirection: 'column',

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
        width: '100%',
        height: '100%',
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
    follow: {
        flex: 1,
        backgroundColor: '#a2ffe2',
        borderBottomRightRadius: 5
    }

});