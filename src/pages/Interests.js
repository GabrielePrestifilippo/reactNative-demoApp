import React from "react";
import {Text, View, Button, StyleSheet} from "react-native";

export default class Interests extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var self = this;
        return <View style={styles.interests}>
            {this.props.data.map(function (key, val) {
                return <View key={val} style={styles.interest}>
                    <Text style={styles.interestText}>{key}</Text>
                    <Text onPress={() => {
                        self.props.data.splice(self.props.data.indexOf(key),1);
                        self.setState({data: self.props.data}); //update state

                    }}
                          style={styles.deleteButton}>x</Text>
                </View>
            })}
        </View>
            ;
    }
}
const styles = StyleSheet.create({
    interests: {
        padding: 10,
        position: 'relative',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap:'wrap',
        flex:1
    },
    interest: {
        backgroundColor: "#98e7ff",
        borderColor: '#1459ff',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        height:30,
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },
    interestText: {
        color: 'white',
        padding: 5
    },
    deleteButton: {
        color: "#777a78",
        padding: 5
    }

});