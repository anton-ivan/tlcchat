'use strict';

var React = require('react-native');
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


class MessageDetails extends React.Component {
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
            <Image style={{width: 32, height:32,marginTop:15, alignSelf:'center', marginRight:15, marginLeft:15, marginBottom:5, borderBottomWidth:0}} source={require('../assets/prev.png')}/>
            <View style={{flex:1}}>
                <Text style={styles.navbartext}>Details</Text>
            </View>

          </View>
          <View style={{backgroundColor:'#005A7D',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
              <SettingsList.Item
                hasNavArrow={false}
                title='Archive Message'
                titleStyle={{fontSize:16, color:'#ffffff'}}
                backgroundColor ='#005B7D'
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
    backgroundColor:'#005879',
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
module.exports = MessageDetails;
