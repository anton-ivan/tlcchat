'use strict';

var React = require('react-native');
var {AppRegistry, StyleSheet,Text,View} = React;
var Launch = require('./components/Launch');
var Register = require('./components/Register');
var Login = require('./components/Login');
var NewMessage = require('./components/NewMessage');
var Messages = require('./components/Messages');
var Chat = require('./components/Chat');
var Settings = require('./components/Settings');
var MessageDetails = require('./components/MessageDetails');
var Error = require('./components/Error');
var Home = require('./components/Home');

var {Router, routerReducer, Route, Container, Animations, Schema} = require('react-native-redux-router');
var {NavBar, NavBarModal} = require('./components/NavBar');

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux/native';
import createLogger from 'redux-logger';

const loggerMiddleWare = createLogger();

const createStoreWithMiddleware = applyMiddleware(loggerMiddleWare)(createStore);
const reducer = combineReducers({routerReducer});
let store = createStoreWithMiddleware(reducer);

class App extends React.Component {
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
                <Router>
                    <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal}/>
                    <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
                    <Schema name="withoutAnimation" navBar={NavBar}/>
                    <Schema name="tab" navBar={NavBar}/>

                    <Route name="launch" component={Launch} initial={true} hideNavBar={true} title="Launch"/>
                    <Route name="register" component={Register} title="Register"/>
                    <Route name="messages" component={Messages} title="Messages"/>
                    <Route name="settings" component={Settings} title="Settings"/>
                    <Route name="newmessage" component={NewMessage} title="NewMessage"/>
                    <Route name="chat" component={Chat} title="Chat"/>
                    <Route name="home" component={Home} title="Home" type="replace"/>
                    <Route name="login" component={Login} hideNavBar = {true} schema="modal"/>
                    <Route name="register2" component={Register} schema="withoutAnimation"/>
                    <Route name="error" component={Error} schema="popup"/>
                </Router>

            </View>
        );
    }
}
class Example extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {() => <App />}
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Example', () => Example);
