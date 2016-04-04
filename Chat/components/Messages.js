'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');
var SortableListView = require('react-native-sortable-listview');
var messages = {
  hello: {
    sender: 'Bryon McCane',
    text: 'world',
    duration: '1d'
  },
  how: {
    sender: 'Charles Scruggs',
    text: 'are you',
    duration: '3d'
  },
  test: {
    sender: 'Steven Howse',
    text: 'Meet me!',
    duration: '1d'
  },
  this: {
    sender: 'Welcome Group',
    text: 'is',
    duration: 'd'
  },
  a: {
    sender: 'Deacons',
    text: 'a',
    duration: '2d'
  },
  real: {
    sender: 'Cristiano Ronaldo',
    text: 'madridsta everything!',
    duration: '1d'
  },
  drag: {
    sender: 'Didier Drogba',
    text: 'drag and drop',
    duration: '2d'
  },
  bb: {
    sender: 'Gareth Bale',
    text: 'Mammamia!',
    duration: '3d'
  }
};

var order = Object.keys(messages); //Array of keys

var RowComponent = React.createClass({
  render: function() {
    return <TouchableHighlight underlayColor={'#eee'} style={{padding: 25, backgroundColor: "#005B7D", borderBottomWidth:2, borderColor: '#eee'}} onLongPress={this.props.onLongPress}>
          <View style={{color:'#ffffff'}}>
            <View>
              <Text style={{color:'#ffffff', flexDirection:'row', flex:3}}>{this.props.data.sender}</Text>
              <Text style={{color:'#ffffff', flexDirection:'row',flexWrap:'wrap', flex:1}}>{this.props.data.duration}</Text>
            </View>
            <Text style={{color:'#ffffff'}}>{this.props.data.text}</Text>
          </View>
      </TouchableHighlight>
  }
})

class Messages extends React.Component {
    render(){
        let Actions = this.props.routes;
        return (
              <SortableListView
                style={{flex: 1, color:'#ffffff', backgroundColor:'#005B7D'}}
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

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#005B7D',
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

module.exports = Messages;
