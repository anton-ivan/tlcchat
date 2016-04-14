'use strict';
var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} = React;
var styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005B7D',
    alignItems: 'stretch',
    paddingTop: 100,
  },
  scrollView :{
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
  },
  inputcontainer: {
    flex: .5,
    backgroundColor: '#005B7D',
    alignItems: 'center',
    marginBottom: 3,
    borderWidth:2,
    borderColor:'#ff0000'
  },
  message: {
    flex: .25,
    alignItems: 'center',
    paddingTop:10,
  },
  msgMenu: {
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    borderBottomWidth:1,
    borderColor:'#004058'
  },
  msgheader: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    width: 200,
    fontSize:14,
    fontWeight: 'bold',
    paddingLeft:20,
    borderWidth:2,
    borderColor:'#ff0000',
    color: '#ffffff',
  },
});

class NewMessage extends React.Component{
  constructor() {
    super();

  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView ref='scrollView' keyboardDismissMode='interactive' style={styles.scrollView}
           contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.msgMenu}>
            <Text style={styles.msgheader}>Subject:</Text>
          </View>
          <View style={styles.msgMenu}>
            <Text style={styles.msgheader}>To:</Text>
          </View>
          <View style={styles.msgMenu}>
            <Text style={styles.msgheader}>When to Send:</Text>
          </View>

          <View ref='firstname' style={styles.inputcontainer}>
            <TextInput
              style={styles.input}
              placeholder='First Name'
              returnKeyType='next'
              onFocus={this.inputFocused.bind(this,'firstname')}></TextInput>
          </View>


          <View style={styles.message}>
            <Text style={styles.msgheader}>Is there a text input above?</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  inputFocused(refName){
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110,
        true
      );
    }, 50);
  }
}



module.exports = NewMessage;
