'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');
var GiftedMessenger = require('react-native-gifted-messenger');
var {Dimensions} = React;

var Chat = React.createClass({
  getMessages() {
    return [
      {
        text: 'Hey this is a message that was sent to you during church!',
        name: 'Bryon McCane',
        image: null,
        position: 'left',
        date: new Date(2015, 0, 16, 19, 0)
      },
      {
        text: "This is empty!",
        name: '',
        image: null,
        position: 'right',
        date: new Date(2015, 0, 17, 19, 0)
      },
      {
        text: "Awesome! I was hoping you would get the message. Do you think we should add a read receipt to the messages?",
        name: 'Charles Scruggs',
        image: null,
        position: 'left',
        date: new Date(2015, 0, 17, 19, 0)
      },
      {
        text: 'I have an error when i use Navigator and TouchableHighlight in my app this is the code for my index.ios.js',
        name: 'Bryon McCane',
        image: null,
        position: 'right',
        date: new Date(2015, 0, 16, 19, 0)
      },
      {
        text: "What I do not understand is why in my case TouchableHighlight has more than one child (as I see it there are no children at all)???",
        name: '',
        image: null,
        position: 'right',
        date: new Date(2015, 0, 17, 19, 0)
      },
      {
        text: "Are you passing in an empty TouchableHighlight ?",
        name: 'Charles Scruggs',
        image: null,
        position: 'left',
        date: new Date(2015, 0, 17, 19, 0)
      },
      {
        text: 'Yeah you right, it was my bad. I just needed to add any child to the TouchableHighlight',
        name: 'Charles Scruggs',
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        position: 'left',
        date: new Date(2015, 0, 16, 19, 0)
      },
      ];
  },
  handleSend(message = {}, rowID = null) {
    // Send message.text to your server
  },
  handleReceive() {
    this._GiftedMessenger.appendMessage({
      text: 'Received message',
      name: 'Friend',
      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
      position: 'left',
      date: new Date(),
    });
  },
  render() {
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}
        messages={this.getMessages()}
        handleSend={this.handleSend}
        maxHeight={Dimensions.get('window').height - 64} // 64 for the navBar
        styles={styles}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#005A7D',
    flex:1,
  },
  bubbleLeft: {
    backgroundColor: '#114E6B',
    marginRight: 70
  },
  bubbleRight: {
    backgroundColor: '#DBF2FD',
    marginLeft: 70
  },
  textLeft: {
    color: '#fff',
  },
  textRight: {
    color: '#004F6B',
  },
  link:{
    color: '#ffffff'
  },
  date: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

module.exports = Chat;
