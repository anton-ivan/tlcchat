'use strict';

var React = require('react-native');
var {
   AppRegistry,
   StyleSheet,
   Text,
   TextInput,
   View
 } = React;

 var {KeyBoardResizeView} = require('react-native-sk-keyboard-responder');

 var NewMessage  = React.createClass({
     getList: function(){
       var list = [];
       for (var i = 0; i < 20; i++) {
         list.push(<Text key={i} style={styles.item}>{'Sample' + i}</Text>)
       }
       return list;
     },
     render: function(){
     return (
       <View style={styles.container}>
        {this.getList()}
        <KeyBoardResizeView style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholderTextColor='#AFAFAF'
            placeholder='Placeholder'
            />
        </KeyBoardResizeView>
       </View>
     )
   },
 });


 const styles = StyleSheet.create({
    container: {
     //  flex: 1,
      backgroundColor: 'grey',
    },
    listBox: {
      flex: 1,
      justifyContent: 'space-around',
    },
    item: {
      fontSize: 17,
    },
    inputBox: {
      height: 50,
      margin: 5,
      borderWidth:1,
      borderColor:'#E1E1E1',
      borderRadius: 5,
      backgroundColor:'#FFF',
    },
    input: {
     flex: 1,
     fontSize:14,
    }
  });
module.exports = NewMessage;
