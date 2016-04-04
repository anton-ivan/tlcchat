'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');
var SortableListView = require('react-native-sortable-listview');
var menu = {
  hello: {
    sender: 'Bryon McCane',
    text: 'Archive Conversation',
    duration: '1d'
  },
};

var order = Object.keys(menu); //Array of keys

var RowComponent = React.createClass({
  render: function() {
    return <TouchableHighlight underlayColor={'#eee'} style={{padding: 25, backgroundColor: "#005B7D", borderBottomWidth:2, borderColor: '#eee'}} onLongPress={this.props.onLongPress}>
          <View style={{color:'#ffffff'}}>
            <Text style={{color:'#ffffff', fontSize:13}}>{this.props.data.text}</Text>
          </View>
      </TouchableHighlight>
  }
})

class MessageDetails extends React.Component {
    render(){
        let Actions = this.props.routes;
        return (
              <SortableListView
                style={{flex: 1, color:'#ffffff', backgroundColor:'#005B7D'}}
                data={menu}
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

module.exports = MessageDetails;
