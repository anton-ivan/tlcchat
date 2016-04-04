'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TextInput} = React;
var {NavBarMessage} = require('./NavBar');
var Button = require('react-native-button');
var { KeyboardAwareScrollView }=require('react-native-keyboard-aware-scroll-view');

class NewMessage extends React.Component {
    _scrollToInput (event, reactNode) {
      // Add a 'scroll' ref to your ScrollView
      this.refs.scroll.scrollToFocusedInput(event, reactNode)
    }
    render(){
        let Actions = this.props.routes;
        return (
            <KeyboardAwareScrollView  ref='scroll'>

                <View >

                 <TextInput ref='myInput' onFocus={this._scrollToInput}/>
               </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#005A7D',
    },
    item:{
      height: 60,
      backgroundColor:'#005B7D',
      borderBottomWidth:1.5,
      borderColor:'#004058',
      paddingLeft:20,
      paddingRight:20
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

module.exports = NewMessage;
