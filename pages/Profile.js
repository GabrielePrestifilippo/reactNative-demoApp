import React from "react";
import {Text, View, Button, TextInput, StyleSheet} from "react-native";

import Interests from "./Interests";

export default class Profile extends React.Component {
    static navigationOptions = {
        // Nav options can be defined as a function of the navigation prop:
        title: ({state}) => {
            return `Profile`;
        },
        header: ({state, setParams}) => {

        },
    };

    constructor(props) {
        super(props);
        this.initState = {text: ['a1', 'a2', 'a3']};
        this.state = {text: ''};
        this.inputState={text: ''};
    }

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40}}
                    placeholder="Add new interest!"
                    value={this.inputState.text}
                    onChangeText={(text) => {
                        this.setState({text});
                        this.inputState.text=text;
                        if(text.indexOf(" ")!=-1){
                            this.setState({});
                            this.initState.text.push(text);
                            this.inputState.text="";
                        }
                    }}
                    onSubmitEditing={(event) => {
                        this.setState({});
                        this.initState.text.push(event.nativeEvent.text);
                        this.inputState.text = "";
                    }}

                />
                    <Interests data={this.initState.text} />

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