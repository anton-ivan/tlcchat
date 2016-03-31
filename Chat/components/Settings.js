'use strict';

var React = require('react-native');
var {View, Text, Image, StyleSheet} = React;
var Button = require('react-native-button');
var Switch = require('react-native-material-switch');

class Settings extends React.Component {
    render(){
        let Actions = this.props.routes;
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.logo} source={require('../assets/full-logo.png')}/>
                </View>
                <View style={styles.listItem}>
                    <Text>Notification</Text>
                    <Switch onChangeState={(state)=>{alert(state)}}/>
                </View>
                <View style={styles.listItem}>
                    <Button>Logout</Button>
                </View>
                <Button onPress={Actions.home}>Home</Button>
                <Button onPress={Actions.pop}>Back</Button>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F3F4',
    },
    listItem:{
      borderColor: '#eeeeee',
      borderBottomWidth: 3
    },
    logo:{
      alignItems:'center',
      top: 0,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = Settings;
