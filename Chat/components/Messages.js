'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');
var SortableListView = require('react-native-sortable-listview');
var messages = {
  hello: {
    sender: 'Bryon McCane',
    text: 'Hello from the other side \nI must have called a thousand times',
    duration: '1h'
  },
  how: {
    sender: 'Charles Scruggs',
    text: 'Hello from the other side \nI must have called a thousand times',
    duration: '3d'
  },
  test: {
    sender: 'Steven Howse',
    text: 'Hello from the other side \nI must have called a thousand times',
    duration: '2h'
  },
  this: {
    sender: 'Welcome Group',
    text: 'Hello from the other side \nI must have called a thousand times',
    duration: '1d'
  },
  a: {
    sender: 'Deacons',
    text: 'Hello from the other side \nI must have called a thousand times',
    duration: '3d'
  },
  real: {
    sender: 'Cristiano Ronaldo',
    text: 'madridsta everything!',
    duration: '1d'
  }
};
var styles = StyleSheet.create({
    messageContainer:{
        paddingLeft:0,
        paddingRight:30,
        flexDirection:'row'
    },
    readStatus:{
       flex:0.03,
       backgroundColor:'#1A8FC8',
       borderColor:'#ff0000'
    },
    messageContent:{
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:20,
      flex:1
    },
    messageTitle:{
        color:'#fff',
        fontSize:16,
        color: '#ffffff',
        fontWeight:'bold',
        textAlign:'left'
    },
    messageDuration:{
        color:'#fff',
        fontSize:12,
        color: '#ffffff',
        textAlign:'right',
        flex:1                //Step 3
    },
    messageText:{
        color:'#fff',
        textAlign:'left',
        fontSize:12,
        color: '#ffffff'
    }
});

var order = Object.keys(messages); //Array of keys

var RowComponent = React.createClass({
  render: function() {
    return <TouchableHighlight underlayColor={'#eee'} style={{flex:1, backgroundColor: "#005B7D", borderBottomWidth:2, borderColor: '#004058'}} onLongPress={this.props.onLongPress}>
          <View style={styles.messageContainer}>
            <View style={styles.readStatus}>
            </View>
            <View style={styles.messageContent}>
              <View style={{flexDirection:'row'}}>
                  <Text style={styles.messageTitle}>{this.props.data.sender}</Text>
                  <Text style={styles.messageDuration}>{this.props.data.duration}</Text>
              </View>
              <View style={{flexDirection:'row', paddingTop:5}}>
                  <Text style={styles.messageText}>{this.props.data.text}</Text>
              </View>
            </View>

          </View>
      </TouchableHighlight>
  }
})

class Messages extends React.Component {
    render(){
        let Actions = this.props.routes;
        return (
              <SortableListView
                style={{flex: 1,backgroundColor:'#005B7D'}}
                data={messages}
                order={order}
                onRowMoved={e => {
                  order.splice(e.to, 0, order.splice(e.from, 1)[0]);
                  this.forceUpdate();
                }}
                renderRow={row => <RowComponent data={row} />}
              />
        );
    }
}

module.exports = Messages;
