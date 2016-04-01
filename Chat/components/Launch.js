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
                <Button onPress={()=>Actions.login({data:"Custom data", title:'Login' })}>Login page</Button>
                <Button onPress={()=>Actions.register({data:"Custom data", title:'Register })}>Register page</Button>
                <Button onPress={()=>Actions.chat({data:"Custom data", title:'Chat' })}>Chat page</Button>
                <Button onPress={()=>Actions.settings({data:"Custom data", title:'Settings' })}>Settings page</Button>
                <Button onPress={()=>Actions.newmessage({data:"Custom data", title:'New Chat' })}>New Chat page</Button>
                <Button onPress={()=>Actions.messages({data:"Custom data", title:'Inbox/Outbox' })}>Messages page</Button>
                <Button onPress={()=>Actions.messagedetails({data:"Custom data", title:'Details Page' })}>Details page</Button>
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
