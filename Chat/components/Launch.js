'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');

class Launch extends React.Component {
    render(){
        var Actions = this.props.routes;
        return (
            <View style={styles.container}>
                <Text>Launch page</Text>
                <Button onPress={()=>Actions.login({data:"Custom data", title:'Custom title' })}>Login page</Button>
                <Button onPress={Actions.register}>Register page</Button>
                <Button onPress={Actions.register}>Chat page</Button>
                <Button onPress={Actions.register}>Settings page</Button>
                <Button onPress={Actions.register}>New Chat page</Button>
                <Button onPress={Actions.register}>Notification page</Button>
                <Button onPress={Actions.register}>Messages page</Button>
                <Button onPress={Actions.register}>Details page</Button>
                <Button onPress={()=>Actions.register2({title: 'Register 2'})}>Go to Register page without animation</Button>
                <Button onPress={()=>Actions.error("Error message")}>Error page</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

module.exports = Launch;
