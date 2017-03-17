import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button,
    Linking,
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import ChatScreen from './pages/ChatScreen'

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => navigate('Chat', { user: 'Lucy' })}
                    title="Chat with Lucy"
                />
            </View>
        );
    }
}

class RecentChatsScreen extends React.Component {

    render() {
        return <Button
            onPress={() => Linking.canOpenURL('fb://notifications').then(supported => {
              if (!supported) {
                console.log('Can\'t handle url: ');
              } else {
                return Linking.openURL('fb://notifications');
              }
            }).catch(err => ('An error occurred'+ err))
            }
            title="Chat with ..."
        />
    }
}

class AllContactsScreen extends React.Component {
    render() {
        return <Button
            onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
            title="Chat with Lucy"
        />

    }
}

const MainScreenNavigator = TabNavigator({
    Recent: {screen: RecentChatsScreen},
    All: {screen: AllContactsScreen},
});

MainScreenNavigator.navigationOptions = {
    title: 'My Chats',
};

const myInfluencers = StackNavigator({
    Home: {screen: MainScreenNavigator},
    Chat: {
        screen: ChatScreen,

    }
});


AppRegistry.registerComponent('myInfluencers', () => myInfluencers);