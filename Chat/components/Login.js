'use strict';

var React = require('react-native');
var {View, Text, Image,StyleSheet,TextInput} = React;
var Button = require('react-native-button');
import {
  MKTextField,
  MKColor,
  mdl,
} from 'react-native-material-kit';
import TextField from 'react-native-md-textinput';
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1A8FC8',
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
    }
});

var  textStyles = StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center', // this will prevent TFs from stretching horizontal
    marginLeft: 7, marginRight: 7,
    // backgroundColor: MKColor.Lime,
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 22,
  },
  textfieldWithFloatingLabel: {
    height: 38,  // have to do it on iOS
    marginTop: 10
  },
});

const Textfield = MKTextField.textfield()
  .withPlaceholder('Text...')
  .withStyle(textStyles.textfield)
  .build();

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('Number...')
  .withStyle(textStyles.textfieldWithFloatingLabel)
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .withKeyboardType('numeric')
  .build();

const ColoredTextfield = mdl.Textfield.textfield()
  .withPlaceholder('Text...')
  .withStyle(textStyles.textfield)
  .withTintColor(MKColor.Lime)
  .withTextInputStyle({color: MKColor.Orange})
  .build();

const PasswordInput = mdl.Textfield.textfieldWithFloatingLabel()
  .withPassword(true)
  .withPlaceholder('Password')
  .withDefaultValue('!123')
  .withHighlightColor('#ffffff')
  .withTintColor('#ffffff')
  .withTextInputStyle({color: '#ffffff'})
  .withStyle(textStyles.textfieldWithFloatingLabel)
  .withOnFocus(() => console.log('Focus'))
  .withOnBlur(() => console.log('Blur'))
  .withOnEndEditing((e) => console.log('EndEditing', e.nativeEvent.text))
  .withOnSubmitEditing((e) => console.log('SubmitEditing', e.nativeEvent.text))
  .withOnTextChange((e) => console.log('TextChange', e))
  .withOnChangeText((e) => console.log('ChangeText', e))
  .build();

class Login extends React.Component {
    render(){
        let Actions = this.props.routes;

        return (
            <View style={styles.container}>

                <Image style={styles.logo} source={require('../assets/logo.png')}/>
                <TextField label={'Email'} labelColor = {'#ffffff'} color={'#ffffff'} highlightColor={'#ffffff'} dense = {true}/>
                <PasswordInput/>
                <Button onPress={Actions.pop} containerStyle={{padding:30, height:45, overflow:'hidden', borderRadius:4, borderColor:'#ffffff', backgroundColor: 'white'}}
                   style={{fontSize: 20, color: '#ffffff'}}>Login</Button>
            </View>
        );
    }
}





module.exports = Login;
