'use strict';

var React = require('react-native');
var InvertibleScrollView = require('react-native-invertible-scroll-view');
var GiftedSpinner = require('react-native-gifted-spinner');
var Button = require('react-native-button');

var Dimensions = require('Dimensions');
var LayoutAnimation = require('LayoutAnimation');

var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;

var moment = require('moment');
// var ParsedText = require('react-native-parsed-text');
var ParsedText =require('react-native-parsed-text');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicatorIOS,
  Component,
  ScrollView,
  Animated,
  ListView,
  Platform
} = React;

var styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  top: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    borderBottomWidth: 3
  },
  triple: {
    width: 16,
    height: 16,
    marginTop: 10
  },
  title: {
    flex: 1,
    paddingTop: 10,
    textAlign: 'center'
  },
  avatar: {
    width: 30,
    height: 30
  },
  content: {
    // flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column',
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    alignSelf: 'center',
    borderColor: '#0000FF',
    backgroundColor: '#FFF',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
    fontSize: 15,
    borderWidth: 1
  },
  messages: {
    flex: 1,
    backgroundColor: '#ffff00',
  },
  listView: {
    flex: 1,
    backgroundColor: '#DDEEDD'
  },
  contentContainer: {
    height: 600
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  date: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8
  },
  name: {
    color: '#aaaaaa',
    fontSize: 12,
    marginLeft: 60,
    marginBottom: 5
  },
  status: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'right',
    marginRight: 15,
    marginBottom: 10,
    marginTop: -5
  },
  spacer: {
    width: 10
  },
  bubble: {
    borderRadius: 15,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 10,
    paddingTop: 8,
    flex: 1
  },
  bubbleLeft: {
    marginRight: 70,
    backgroundColor: '#e6e6eb'
  },
  bubbleRight: {
    marginLeft: 70,
    backgroundColor: '#007aff'
  },
  bubbleError: {
    backgroundColor: '#e01717'
  }
});

var animations = {
  layout: {
    spring: {
      duration: 400,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 400,
      },
    },
    easeInEaseOut: {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

class NewMessage extends Component{


  // Constructor
  constructor(props){
    super(props);

    //============================Variables=========================
    // props.aa = 'abc';
    // console.log(props);
    // console.log('constructor');
    this.keyboardAnimationDuration = 200; // in milliseconds
    this.topMenuHeight = 50; //
    this.textInputHeight = 44;
    this.loadEarlierMessagesButtonText = 'Load earlier messages';
    this.windowHeight = Dimensions.get('window').height;

    this._data = []; //message items
    this._rowIds = []; //
    this.scrollResponder = null;
    this.senderName = 'Sender';
    this.senderImage = null;
    this.allLoaded = false; // as of now false

    //prepare for DataSource
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      if (typeof r1.status !== 'undefined') {
        return true;
      }
      return r1 !== r2;
    }});

    //Set InitialState
    this.state = {
      height: new Animated.Value(this.windowHeight - this.topMenuHeight - this.textInputHeight),
      contentHeight: this.windowHeight - this.topMenuHeight - this.textInputHeight,
      dataSource: ds.cloneWithRows([])
    };

    // Keyboard show event
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillShowEvent, (frames) => {

      if (frames.begin) {
        var keyboardHeight = frames.begin.height;

        Animated.timing(this.state.height, {
          toValue: this.state.contentHeight - keyboardHeight,
          duration: this.keyboardAnimationDuration,
        }).start();
      }

      // we can use this way as well
      // LayoutAnimation.configureNext(animations.layout.spring);
      // this.setState({
      //   height: this.state.contentHeight - 280
      // });
      // console.log(this.state);


    });

    // Keyboard hide event
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, (frames) => {

      // LayoutAnimation.configureNext(animations.layout.spring);
      // this.setState({height: this.state.contentHeight});

      if (frames.begin) {
        var keyboardHeight = frames.begin.height;

        Animated.timing(this.state.height, {
          toValue: this.state.contentHeight,
          duration: this.keyboardAnimationDuration,
        }).start();
      }

    });

  }


  render() {

    return (
      <View style={styles.page} ref='page'>

        <View style={[styles.top, {height: this.topMenuHeight}]}>

          <TouchableOpacity style={styles.triple} onPress={this.onHamburgerIconPressed.bind(this)}>
            <Image source={require('../assets/general.png')}/>
          </TouchableOpacity>

          <Text style={styles.title}>My Mentee</Text>
          <Image style={styles.avatar} source={require('../assets/wifi.png')}/>
        </View>

        {/*Content Screen: messages + textinput*/}
        <View>

          {/*Animated Screen*/}
          <Animated.View style={{height: this.state.height, borderWidth: 1}}>

            <ListView
              ref='listView'
              style={styles.listView}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              renderFooter={this.renderLoadEarlierMessages.bind(this)}
              renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}

              //not working android RN 0.14.2, disabled now
              // currently keyboard anitmation is fired through native keyboard event emitter
              // onKeyboardWillShow = {this.onKeyboardWillShow.bind(this)}
              // onKeyboardWillHide = {this.onKeyboardWillHide}

              keyboardShouldPersistTaps={true}
              keyboardDismissMode='on-drag'

              {...this.props}
              />

          </Animated.View>

          {/*Text Input Container: type messages*/}
          <View style={styles.textInputContainer}
            ref='textInputContainerView'>
            <TextInput
              style={[styles.textInput, {height: this.textInputHeight}]}
              ref='textInput'
              placeholder='Type Message'
              onChangeText={this.onChangeText.bind(this)}
              autoFocus={true}
              returnKeyType={'default'}
              onSubmitEditing={this.onSend.bind(this)}
              value={this.state.text}
              />
          </View>
        </View>
      </View>


    )
  }

  componentDidMount() {
    console.log('componentDidMount');

    let initialMessages = [
      {
        text: 'Are you building a chat app?',
        name: 'React-Native',
        image: {uri: 'https://facebook.github.io/react/img/cellular.png'},
        position: 'left',
        date: new Date(2015, 10, 16, 19, 0)
      },
      {
        text: 'Yes, and I use Gifted Messenger!',
        name: 'Developer',
        image: null,
        position: 'right',
        date: new Date(2015, 10, 17, 19, 0)
      }
    ];
    console.log(this.props);

    this.appendMessages(initialMessages);
  }

  /**
  * These two functions can be specified as ListView properties,
  * but currently keyboard processing is done by native-keyboard-emitter in constructor
  **/
  onKeyboardWillShow(e) {
    console.log('will show from listView');
  }

  onKeyboardWillHide(e) {
   console.log('will show from listView');
  }

  // hamburger icon pressed
  onHamburgerIconPressed() {
    console.log(this.keyboardAnimationDuration);
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  //add messages on top of page
  prependMessages(messages = []) {
    var rowID = null;
    for (let i = 0; i < messages.length; i++) {
      messages[i].isOld = true;
      this._data.push(messages[i]);
      this._rowIds.push(this._data.length - 1);
      rowID = this._data.length - 1;
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds)
    });

    return rowID;
  }

  //add one message on top of page
  prependMesssage(message = {}) {
    var rowID = this.prependMessages([message]);
  }

  //append message to the bottom of page
  appendMessages(messages = []) {

    var rowID = null;

    for (let i=0; i<messages.length; i++) {
      this._data.push(messages[i]);
      this._rowIds.unshift(this._data.length - 1);
      rowID = this._data.length - 1;
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data, this._rowIds)
    });

    return rowID;
  }

  //append one message
  appendMessage(message = {}) {

    var rowID = this.appendMessages([message]);
    return rowID;
  }

  //render earlier messages
  renderLoadEarlierMessages() {
    if (false === this.allLoaded) {
      if (true === this.isLoadingEarlierMessages) {
        return (
          <View style={styles.loadEarlierMessage}>
            <GiftedSpinner />
          </View>
        );
      }
      else {
        return (
          <View style = {styles.loadEarlierMessages}>
            <Button
              style={styles.loadEarlierMessagesButton}
              onPress={() => {this.preloadEarlierMessages.bind()}}
            >
              {this.loadEarlierMessagesButtonText}
            </Button>
          </View>
        );
      }
    }
  }

  //render each row item
  renderRow(rowData = {}, sectionID = null, rowID = null) {

    return (
      <View>
       {this.renderDate(rowData, rowID)}
       {rowData.position === 'left' ? this.renderName(rowData, rowID) : null}
       <View style={styles.rowContainer}>
        {rowData.position === 'left' ? this.renderImage(rowData, rowID) : null}
        {rowData.position === 'right' ? this.renderErrorButton(rowData, rowID) : null}
        <View style={[styles.bubble, (rowData.position === 'left' ? styles.bubbleLeft : styles.bubbleRight), (rowData.status === 'ErrorButton' ? styles.bubbleError : null )]}>
          {this.renderText(rowData, rowID)}
        </View>
       </View>

       {rowData.position === 'right' ? this.renderStatus(rowData, rowID) : null}
      </View>
    );
  }

  //render Date
  renderDate(rowData = {}, rowID = null) {
    if (rowData.date instanceof Date) {

      return (
        <Text style={styles.date}>
         {moment(rowData.date).calendar()}
         </Text>
      );
    }
    return null;
  }

  //render Name
  renderName(rowData = {}, rowID = null) {
    return (
      <Text style={styles.name}>
        {rowData.name}
      </Text>
    );
  }

  //render Status
  renderStatus(rowData = {}, rowID = null) {
    if (rowData.status !== 'ErrorButton' && typeof rowData.status === 'string') {
      if (rowData.status.length > 0) {
        return (
          <View>
            <Text style={styles.status}>
              {rowData.status}
            </Text>
          </View>
        );
      }
    }

    return null;
  }

  //render Image
  renderImage(rowData = {}, rowID = null) {
    if (rowData.image !== null) {
      <Image source={rowData.image} style={[styles.imagePosition, styles.image, (rowData.position === 'left' ? styles.imageLeft : styles.imageRight)]} />
    }
    return (
      <View style={styles.spacer}/>
    );
  }

  //renderErrorButton
  renderErrorButton(rowData = {}, rowID = null) {
    if (rowData.status === 'ErrorButton') {
      <ErrorButton onErrorButtonPress={this.onErrorButtonPress}
        rowData={rowData}
        rowID={rowID}
        styles={{
          errorButtonContainer: styles.errorButtonContainer,
          errorButton: styles.errorButton
        }}
      />
    }
  }

  //renderText
  renderText(rowData = {}, rowID = null) {
    // if (Platform.OS !== 'android') {
    //   let parse = [
    //     {type: 'url', style: [styles.link, (rowData.position === 'left' ? styles.linkLeft : styles.linkRight)], onPress: this.handleUrlPress},
    //     {type: 'phone', style: [styles.link, (rowData.position === 'left' ? styles.linkLeft : styles.linkRight)], onPress: this.handlePhonePress},
    //     {type: 'email', style: [styles.link, (rowData.position === 'left' ? styles.linkLeft : styles.linkRight)], onPress: this.handleEmailPress}
    //   ];

    //   return (

    //     <ParsedText
    //       style={[styles.text, (rowData.position === 'left' ? styles.textLeft : styles.textRight)]}
    //       parse={parse}
    //     >
    //     </ParsedText>

    //   );


    //   // return null;
    // }
    return (
      <Text
        style={[styles.text, (rowData.position === 'left' ? styles.textLeft : styles.textRight)]}
      >
        {rowData.text}
      </Text>
    );
  }

  //Text on Change Text
  onChangeText(text) {
    this.setState({
      text: text
    });
  }

  //onSendFunction: when user clicks the Send button
  onSend() {
    console.log('onSend');

    let message = {
      text: this.state.text.trim(),
      name: this.senderName,
      image: this.senderImage,
      position: 'right',
      date: new Date()
    };

    var rowID = this.appendMessage(message);
    this.transferMessage(this.state.text.trim());
    this.onChangeText('');

    this.receiveMessage({text: 'I saw your message', name: 'React-Native', image: {uri: 'https://facebook.github.io/react/img/logo_og.png'}, position: 'left', date: new Date()}); //receive dummy message
    // this is for dismissing the keyboard automatically
    // this.scrollResponder.scrollTo(0);
    // this.refs.textInput.blur();
  }

  //transfer the text over the network.
  transferMessage(text) {
    console.log('transferring message over network:' + text);
  }

  //receive message from network
  receiveMessage(message) {
    this.appendMessage(message);
  }

  //get


}

var ErrorButton = React.createClass({
  getInitialState() {
    return {
      isLoading: false
    };
  },
  getDefaultProps() {
    return {
      onErrorButtonPress: () => {},
      rowData: {},
      rowID: null,
      styles: {}
    };
  },
  onPress() {
    this.setState({
      isLoading: true,
    });

    this.props.onErrorButtonPress(this.props.rowData, this.props.rowData);
  },
  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={[this.props.styles.errorButtonContainer, {
          backgroundColor: 'transparent',
          borderRadius: 0
        }]}>
          <GiftedSpinner />
        </View>
      );
    }

    return (
      <View style={this.props.styles.errorButtonContainer}>
        <TouchableHighlight underlayColor='transparent' onPress={this.onPress}>
          <Text style={this.props.styles.errorButton}>↻</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

/**
 * This part is very important. Without it you wouldn't be able to access `menuActions`
 * @type {Object}
 */
NewMessage.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};


module.exports = NewMessage;
