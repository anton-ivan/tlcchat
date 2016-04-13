'use strict';

var React = require('react-native');
//var {View, Text, StyleSheet, TouchableHighlight} = React;
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} =  React;
var Button = require('react-native-button');
var SettingsList = require('react-native-settings-list');
var menu = {
  hello: {
    sender: 'Bryon McCane',
    text: 'Archive Conversation',
    duration: '1d'
  },
};

class Settings extends React.Component {

  constructor()
  {
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false};

  }
  render() {
    let Actions = this.props.routes;
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Image style={{width: 32, height:32,marginTop:15, alignSelf:'center', marginRight:15, marginLeft:15, marginBottom:5}} source={require('../assets/burger.png')}/>
          <View style={{flex:1}}>
              <Text style={styles.navbartext}>Settings</Text>
          </View>

        </View>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <Image style={{alignSelf:'center' ,marginTop:50, marginBottom:50}} source={require('../assets/full-logo.png')}/>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              hasSwitch={true}
              switchState={this.state.switchValue}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Notifications'
              titleStyle={{fontSize:16}}
            />
            <SettingsList.Item
              title='Log Out'
              titleStyle={{fontSize:16, color: '#ff0000'}}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Actions.pop()}
            />
            </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(value){
    this.setState({switchValue: value});
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#F3F3F4',
    flex:1
  },
  navbar:{
    borderBottomWidth:1,
    backgroundColor:'#003F58',
    borderColor:'#c8c7cc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navbartext:{
    alignSelf:'center',
    marginTop:30,
    marginBottom:10,
    fontWeight:'bold',
    fontSize:16,
    color: '#ffffff'
  },
  imageStyle:{
    marginLeft:15,
    alignSelf:'center',
    height:30,
    width:30
  },
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  }
});

module.exports = Settings;
