import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import './app.css'
// import iFlyChatChatSdk from 'modules/iflychat-chat-sdk'

import SmartChat from './Components/SmartChat'


// import ChatListLauncher from './ChatList/ChatListLauncher'
// import ChatListView from './ChatList/ChatListView'
// import ChatWindowView from './ChatWindow/ChatWindowView'
// import Spinner from './HelperComponents/Spinner'
// import MobileNotification from './HelperComponents/MobileNotification'
// import WidgetUserChatButton from './HelperComponents/WidgetUserChatButton'
// import Utility from 'utility/Utility'
// import TimerMixin from 'react-timer-mixin'

class App extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  // getInitialState: function() {
  //   return {
  //   };
  // },
  componentWillMount(e){
    // this.props.apps.map((app, key) =>{
    //   if(app.get('type') === 'chat-popup'){
    //     this.setState({isPopup: true})
    //     return;
    //   }
    // })
  }

  // componentDidMount() {
  //   // Add CSS file to chat window iframe
  //   let iframeId = "ifc-chat-window-" + "1"
  //   let iframeContext = document.getElementById(iframeId);
  //   let innerDoc = iframeContext.contentDocument || iframeContext.contentWindow.document;
  //
  //   let cssLink = document.createElement("link");
  //   cssLink.href = 'semantic.min.css';
  //   cssLink.rel = "stylesheet";
  //   cssLink.type = "text/css";
  //   innerDoc.head.appendChild(cssLink);
  //
  //   let cssLink2 = document.createElement("link");
  //   cssLink2.href = 'style.css';
  //   cssLink2.rel = "stylesheet";
  //   cssLink2.type = "text/css";
  //   innerDoc.head.appendChild(cssLink2);
  //
  //   iframeId = "ifc-chat-window-" + "2"
  //   iframeContext = document.getElementById(iframeId);
  //   innerDoc = iframeContext.contentDocument || iframeContext.contentWindow.document;
  //
  //   cssLink = document.createElement("link");
  //   cssLink.href = 'semantic.min.css';
  //   cssLink.rel = "stylesheet";
  //   cssLink.type = "text/css";
  //   innerDoc.head.appendChild(cssLink);
  // }

  componentWillReceiveProps(nextProps){
    // if(nextProps.list.getIn(['global','users']) !== this.props.list.getIn(['global','users'])) {
    //   this.props.notification.map((item, key) => {
    //     if(nextProps.list.hasIn(['global', 'users', key]) === false && nextProps.list.hasIn(['global', 'rooms', key]) === false ){
    //       this.props.actions.deleteNotificationFromChatList(key);
    //     }
    //   });
    // }
    // if(nextProps.mobileNotification !== this.props.mobileNotification) {
    //   this.clearTimeout(this.state.timer)
    //   this.setState({
    //     showNotification: true,
    //     timer: this.setTimeout(() => {
    //       this.setState({showNotification: false})
    //     }, this.state.displayTime)
    //   })
    // }
    // if(nextProps.user.get('setNameSuccess') === true && this.state.showLoginModal === true) {
    //   this.setState({
    //     showLoginSuccessModal: true,
    //     showLoginModal: false
    //   });
    //   this.clearTimeout(this.state.timer);
    //   this.setState({
    //     modalTimer: setTimeout(function() {
    //       this.setState({showLoginSuccessModal: false});
    //       this.props.actions.setName(this.props.user.get('name'), false);
    //     }.bind(this), this.state.displayTime)
    //   });
    // }
  }

  handleUpdateWidth(value){
    this.setState({
      xContainer: value
    })
  }

  handleUpdateAutoFocus(value){
    if(!this.props.user.get('mobileDevice', false)) {
      this.setState({
        autoFocus: value
      })
    }
  }

  handleOpenLoginModal(){
    this.setState({
      showLoginModal: !this.state.showLoginModal
    })
  }

  handleCloseLoginModal() {
    this.setState({
      showLoginModal: false,
      showLoginSuccessModal: false
    })
  }

  removeMobileNotification(){
    this.clearTimeout(this.state.timer)
    this.setState({
      showNotification: false,
      timer: this.setTimeout(() => {
        this.setState({showNotification: false})
      }, 0)
    })
  }

  handleAppMaximize(){
    this.props.threads.map((thread, key) => {
      //check the notification exists for uid and windowstate
      if(this.props.notification.get(thread.get('uid')) && thread.get('windowState') === "OPEN"){
        //delete notification
        this.props.actions.deleteNotificationFromChatList(thread.get('uid'));
      }
    });
    // iFlyChatChatSdk.winOpen('list', 'appList')
    this.props.actions.appMaximize(this.props.appId)
  }

  render() {
    const { open } = this.state
    let modalCSS = {
      display : "none",
      position: "fixed",
      width: "100%",
      float: "right",
      height: "100%",
      border: 0,
      bottom: 0,
    }

    return (
      <div id="ifc-app-container" className="themeClass">
        {/* <div id="ifc-app">
          <ListData/>
          <WindowData/>
          <LauncherData/>
          <Button onClick={this.show(true)} className="backgroundNone" icon='camera' />
        </div> */}
        <SmartChat/>
        {/* <ModalFrame open={open} onClose={this.close}/>
        <Frame id={"ifc-chat-window-2"} style={modalCSS}></Frame> */}
      </div>

    )
  }

};

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(actions, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
