'use strict';

var NavigationBar = require('react-native-navbar');
var React = require('react-native');
var {StyleSheet,View, Image} = React;
var {Router, Route, Animations, Schema} = require('react-native-redux-router');

class NavBarBase extends React.Component {
   onPrev(){
       var Actions = this.props.routes;
       if (this.props.onPrev){
           this.props.onPrev();
           return;
       }
       if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
           Actions.pop();
       }
   }
   render() {
       var Actions = this.props.routes;
       console.log("Props : " + this.props);
       return <NavigationBar style={styles.navBar}
                             titleColor='#ffffff'
                             buttonsColor='white'
                             statusBar= {{style:'light-content', hidden: false}}
                             title= {{title:this.props.title, tintColor:'#ffffff'}}
                             prevTitle={this.props.initial ? " " : null}
                             leftButton = {this.props.leftButton ? this.props.leftButton : {title:''}}
                             rightButton = {this.props.rightButton ? this.props.rightButton : {title:''}}



           />
   }
}
//leftButton={{title:'Left', handler:this.props.onPrev || Actions.pop}}
class NavBar extends React.Component {
   render() {
     var Actions = this.props.routes;
       return <NavBarBase customNext={<View/>} {...this.props}
         leftButton = {<Image style={styles.logo} source={require('../assets/prev.png')}/>}
         rightButton={{title:'Details', tintColor:'#ffffff', handler:this.props.onPrev || Actions.pop}}/>
   }
}
class NavBarMessage extends React.Component {
   render() {
     var Actions = this.props.routes;
       return <NavBarBase customNext={<View/>} {...this.props}
         leftButton = {<Image style={styles.logo} source={require('../assets/burger.png')}/>}
         rightButton = {<Image style={styles.logo} source={require('../assets/edit.png')}/>}
         />
   }
}

class NavBarNewMessage extends React.Component {
   render() {
     var Actions = this.props.routes;
       return <NavBarBase customNext={<View/>} {...this.props}
         rightButton={{title:'Cancel', tintColor:'#ffffff', handler:this.props.onPrev || Actions.pop}}/>
   }
}

class NavBarModal extends React.Component {
   render() {
     var Actions = this.props.routes;
       return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props} rightButton={{title:'Close', handler:this.props.onNext || Actions.pop}}/>
   }
}

var styles = StyleSheet.create({
   navBar: {
       backgroundColor: '#003F58'
   },
});


module.exports = {NavBar, NavBarModal};
