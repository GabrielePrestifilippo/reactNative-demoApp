import React from "react";
import {Text, View, Button, ScrollView, Image, WebView, AsyncStorage} from "react-native";

let started = false;
export default class Login extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {
        const {params} = this.props;
        const navigation = this.props.navigation;
        return (
            <WebView
                 onNavigationStateChange={async (webViewState)=>{
                     if (webViewState.url.indexOf("access_token=") !== -1) {
                         if (!started) {
                             started = true;
                             try {
                                 let code = webViewState.nativeEvent.url.split("access_token=")[1];
                                 await AsyncStorage.removeItem('token', async () => {
                                     await AsyncStorage.setItem('token', code, () => {
                                         navigation.navigate("Influencers", {code: code});
                                     });
                                 });

                             } catch (error) {
                                 console.log(error);
                             }
                         }
                     }
                 }}

                onLoadStart={async (webViewState) => {
                    if (webViewState.nativeEvent.url.indexOf("access_token=") !== -1) {
                        if (!started) {
                            started = true;
                            try {
                                let code = webViewState.nativeEvent.url.split("access_token=")[1];
                                await AsyncStorage.removeItem('token', async () => {
                                    await AsyncStorage.setItem('token', code, () => {
                                        navigation.navigate("Influencers", {code: code});
                                    });
                                });


                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }

                }}
                source={{
                    uri: 'https://www.instagram.com/oauth/authorize/?client_id=7a02b45d3ddc41a9ac1033b95eb3244b&redirect_uri=http://muvias.eoapps.eu&response_type=token&scope=basic+public_content'
                }}

            />
        );
    }
}