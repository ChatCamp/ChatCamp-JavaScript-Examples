import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Sound from 'react-sound';
import { PlayButton, PauseButton, ProgressBar, TimeMarker, TimeMarkerType,FormattedTime } from 'react-player-controls'
import {
  GROUP_CHANNELS_INVITE_ACCEPTANCE_REQUIRED,
  GROUP_CHANNELS_INVALID_PARTICIPANT
} from 'state/action-types'
import * as actions from 'state/groupChannels/actions'
import * as openChannelsActions from 'state/openChannels/actions'
import {Map} from 'immutable'
import { Segment, Comment, Confirm, Message, Image, Popup, Modal } from 'semantic-ui-react'
import {Loader} from 'react-loaders'
import AvatarWrapper from 'containers/ChatApp/Components/AvatarWrapper'
import ProfileCard from 'containers/ChatApp/Components/ProfileCard'
import SoundNotification from 'containers/ChatApp/Components/SoundNotification'
import TitleAlert from 'containers/ChatApp/Components/TitleAlert'
import DesktopNotification from 'containers/ChatApp/Components/DesktopNotification'
import ReadReceipt from 'containers/ChatApp/Components/ReadReceipt'
import UnicodeToImg from 'utility/UnicodeToImg'
import UtilityTime from 'utility/UtilityTime'
import ProcessMessage from 'utility/ProcessMessage';
import DetectBrowser from 'utility/DetectBrowser';
import client from 'Client'
import _ from 'lodash'
import MessageActionCard from '../MessageActionCard'
import * as Debug from 'debug'
const debug = Debug('chatcamp:WindowContent')


// import ReactList from 'react-list';
// import { Scrollbars } from 'react-custom-scrollbars';
// import './style.css'

class WindowContent extends Component {

  updateNodeInfo = true

  state = {
    cacheMessages : {},
    isLoading: false,
    soundPlay: "STOPPED",
    soundPlayURL: "",
    soundDuration: 0,
    soundCurrentPosition: 0,
    cardState: {"$id": "2",
    "ProductID": 44,
    "Name": "Streaker Fitbit",
    "Code": "SF001",
    "ImageURL": "[\"https://pbs.twimg.com/profile_images/621318447335665664/_cRrRqZZ_400x400.jpg\"]",
    "ShortDescription": "Streaker Fitbit",
    "LongDescription": "Streaker Fitbit",
    "CategoryID": 45,
    "ShippingCost": 0,
    "Status": 1,
    "BrandID": 40}
  }

  handleInviteCancel() {

  }

  handleSoundPlay(soundURL) {
    // alert("heya")
    debug("soundplay", soundURL)
    this.setState({soundPlay: Sound.status.PLAYING, soundPlayURL: soundURL})
  }

  handleSoundPause(){
    this.setState({soundPlay: Sound.status.PAUSED})
  }

  handleOnFinishedPlaying = () => {
    this.setState({soundPlay: Sound.status.STOPPED, soundPlayURL: ""})
  }

  handleOnLoading = (object) => {
    debug("handleOnLoading", object)
  }

  handleOnLoad = (object) => {
    debug("handleOnLoad", object)
  }

  handleOnPlaying = (object) => {
    debug("handleOnPlayiung", object.duration, object.position)
    this.setState({soundCurrentPosition: Math.floor(object.position/1000), soundDuration: Math.floor(object.duration/1000)})
  }

  handleInviteConfirm() {
    this.props.actions.acceptInvitation(this.props.id)
  }

  handleClubbing = (currentMessage, oldMessage) => {
    //send true if message needs to be clubbed. Also, send color as #FFF to insert dummy white avatar.
    //TODO: Dummy white avatar can be replaced with class
    if(_.isEmpty(oldMessage)){
      return {info: false, color: ""}
    }
    else if((oldMessage.getIn(['user', 'id']) === currentMessage.getIn(['user', 'id'])) && (oldMessage.getIn(['type']) !== "announcement")){
      if(currentMessage.get('insertedAt') - oldMessage.get('insertedAt') < 300){
        return {info: true, color: "#FFF"}
      }
      else{
        return {info: false, color: ""}
      }
    }
    else{
      return {info: false, color: ""}
    }
  }

  checkLoadMore = (e) => {
    let node = ReactDOM.findDOMNode(this);
    if(node.scrollTop === 0) {
      if(this.props.type === "group") {
        this.props.actions.getHistory(this.props.id, this.props.groupChannels.getIn([this.props.id, 'messages'], false).first().id)
      }
      else if(this.props.type === "open") {
        this.props.openChannelsActions.getHistory(this.props.id, this.props.openChannels.getIn([this.props.id, 'messages'], false).first().id)
      }
    }
    // send read if scrolled to bottom but not when new message is received and scroll was already at bottom.
    if((node.clientHeight === (node.scrollHeight - node.scrollTop)) && (node.clientHeight !== (this.scrollHeight - this.scrollTop)) ) {
      if(this.props.type === "group") {
        this.props.actions.read(this.props.id)
      }
    }
    return false
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.groupChannels !== nextProps.groupChannels
  // }

  componentWillUpdate() {
    if(this.updateNodeInfo) {
      let node = ReactDOM.findDOMNode(this);
      this.scrollHeight = node.scrollHeight;
      this.scrollTop = node.scrollTop;
    }
    this.updateNodeInfo = true
  }

  componentDidUpdate(prevProps, prevState) {
    let node = ReactDOM.findDOMNode(this);
    if(node) {
      node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
    }

  }

  componentDidMount() {
    let modalMountNode = document.getElementById("ifc-app")
    this.setState({modalMountNode: modalMountNode})

    this.updateNodeInfo = true

    let node = ReactDOM.findDOMNode(this);
    if(node) {
      node.scrollTop = node.scrollHeight
      this.scrollHeight = node.scrollHeight
      this.scrollTop = node.scrollTop
    }

    // let t = this
    // let currentChannelId = this.props.id
    // let channelListener = new client.ChannelListener();
    // channelListener.onGroupChannelMessageReceived = function(groupChannel, message) {
    //   if(currentChannelId === groupChannel.id){
    //     debug("heyaaaaa1111", message)
    //     this.serialize = message.serialize()
    //     debug("heyaaaaa2222", this.serialize)
    //     debug("heyaaaaa333", message.__proto__, JSON.stringify(message.__proto__))
    //     let m = client.Message.deSerialize(this.serialize)
    //     debug("heyaaaaa", m,m.getText)
    //     // debug(m.getText())
    //   }
    // }
    // client.addChannelListener("WindowContent", channelListener)
    // client.GroupChannel.get(this.props.id, function(error, groupChannel) {
    //   let previousMessageListQuery = groupChannel.createPreviousMessageListQuery();
    //   previousMessageListQuery.load(20, null, function(previousMessageListQueryError, messages) {
    //
    //   })

    // })


  }

  ifPopUp = () => {
    if (this.props.smartChat.get("type") === "popup"){
      return true
    }
    else{
      return false
    }
  }

  render () {
    const contextWindow = document.getElementById("ifc-" + this.props.id)
    const { contextRef } = this.state

    let messages = [];
    let oldMessage = {}
    let windowContent = "window-content cc-embed"
    if(this.ifPopUp()){
      windowContent = "window-content cc-popup"
    }

    if(this.props.groupChannels.getIn([this.props.id, 'errorType'], false) === GROUP_CHANNELS_INVITE_ACCEPTANCE_REQUIRED) {
      messages.push(<Confirm
          open={true}
          header={'Join ' + this.props.groupChannels.getIn([this.props.id, 'name'])}
          content={'Would you like to join ' + this.props.groupChannels.getIn([this.props.id, 'name']) + '?'}
          onCancel={this.handleInviteCancel.bind(this)}
          onConfirm={this.handleInviteConfirm.bind(this)}
        />)
    }

    if(this.props.groupChannels.getIn([this.props.id, 'errorType'], false) === GROUP_CHANNELS_INVALID_PARTICIPANT) {
      messages.push(
        <Message negative>
          <Message.Header>Unauthorized Access</Message.Header>
          <p>User is not a participant of this group</p>
        </Message>
      )
    }

    if(this.props.groupChannels.getIn([this.props.id, 'errorCode'], "").length>0) {
      messages.push(
        <Message negative>
          <Message.Header>{this.props.groupChannels.getIn([this.props.id, 'errorCode'], "")}</Message.Header>
          <p>{this.props.groupChannels.getIn([this.props.id, 'errorMessage'], "")}</p>
        </Message>
      )
    }
    // Iterate in Messages from props and Display them
    let messageList;
    if(this.props.type === "group"){
      messageList = this.props.groupChannels.getIn([this.props.id, 'messages'], false)
    }
    else if(this.props.type === "open"){
      messageList = this.props.openChannels.getIn([this.props.id, 'messages'], false)
    }

    if(messageList){
    messageList.map((message, key) => {
      message = Map(message)
      //handle message clubbing
      let messageClubbing = this.handleClubbing(message,oldMessage)
      let oldMessageTime;

      //Time Divider Logic
      if(_.isEmpty(oldMessage)){
        oldMessageTime = (message.get('insertedAt') - 172800)*1000
      }
      else{
        oldMessageTime = oldMessage.get('insertedAt')*1000
      }

      var currentReadableDate = UtilityTime.getReadableDate()
      var messageReadableDate = UtilityTime.getReadableDate(message.get('insertedAt')*1000)
      var oldMessageReadableDate = UtilityTime.getReadableDate(oldMessageTime)
      let timeDivider = false;
      if(currentReadableDate.fullDate ===  messageReadableDate.fullDate){
        if(messageReadableDate.fullDate !== oldMessageReadableDate.fullDate){
          timeDivider = "Today"
        }
      }
      else{
        if(messageReadableDate.fullDate !== oldMessageReadableDate.fullDate){
            if((messageReadableDate.date - currentReadableDate.date === -1) && (messageReadableDate.month === currentReadableDate.month) && (messageReadableDate.year === currentReadableDate.year)){
              timeDivider = "Yesterday"
            }
            else{
              timeDivider = messageReadableDate.fullDate
            }
        }
      }
      //for next iteration, store old Message
      oldMessage = _.clone(message)

      //Message prep
      let text = null
      if(message.get('type') === "attachment") {
        let attachment = message.getIn(['attachment'])
        // if(!message.getIn(['attachment', 'url'], false)) {
          text = <div className="message-bubble" dangerouslySetInnerHTML={{ __html: ProcessMessage.MediaRender(attachment.get('url'))}}></div>
          if(attachment.get('type').substring(0,5) === "image") {
            text = <Image
               className="message-bubble" src={attachment.get('url')} onLoad={(e) => {
                  this.updateNodeInfo = false
                  this.forceUpdate()
                }} />
            let modal = <Modal mountNode= {this.state.modalMountNode} className="cc-theme" trigger={text} closeIcon>
              <Modal.Header>Photo</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  {text}
                </Modal.Description>
              </Modal.Content>
            </Modal>
            text = modal
          }
          if(attachment.get('type').substring(0,5) === "video"){
            text = <video className="message-bubble" controls><source src={attachment.get('url')} />Your browser does not support the video tag.</video>
            let modal = <Modal mountNode= {this.state.modalMountNode} trigger={text} closeIcon>
              <Modal.Header>Video</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  {text}
                </Modal.Description>
              </Modal.Content>
            </Modal>
            text = modal
          }
          if(attachment.get('type').substring(0,5) === "audio"){
            if(!DetectBrowser.detectIE()){
              // text = <audio className="message-bubble" controls><source src={attachment.get('url')} type="audio/ogg"/></audio>
              if(this.state.soundPlay === Sound.status.PAUSED || this.state.soundPlay === Sound.status.STOPPED){
                text = <div className="cc-sound-player"><PlayButton className="PlayButton message-bubble"
                isEnabled={true}
                onClick={() => this.handleSoundPlay(attachment.get('url'))} 
                />
                {/* <TimeMarker
                totalTime={this.state.soundDuration}
                currentTime={this.state.soundCurrentPosition}
                markerSeparator={"/"}
                firstMarkerType={TimeMarkerType.ELAPSED}
                secondMarkerType={TimeMarkerType.DURATION}
              /> */}
              <FormattedTime
              numSeconds={this.state.soundCurrentPosition}
                />
              <ProgressBar
                totalTime={this.state.soundDuration}
                currentTime={this.state.soundCurrentPosition}
                isSeekable={true}
              /></div>
              
              }
              else{
                text = <div className="cc-sound-player"><PauseButton className="PauseButton message-bubble"
                onClick={() => this.handleSoundPause()} 
                />
                <FormattedTime
                  numSeconds={this.state.soundCurrentPosition}
                />
                <ProgressBar
                totalTime={this.state.soundDuration}
                currentTime={this.state.soundCurrentPosition}
                isSeekable={true}
              /></div>
              }
              
              {text}
              // <Sound className="message-bubble" playStatus={Sound.status.PLAYING} autoLoad = {true} url={attachment.get('url')} />
              //TODO: remove modal from recordings
              // let modal = <Modal trigger={text} closeIcon>
              //   <Modal.Header>Audio</Modal.Header>
              //   <Modal.Content>
              //     <Modal.Description>
                    
              //     </Modal.Description>
              //   </Modal.Content>
              // </Modal>
              // text = modal
            }
            else{
              // IE render link instead of audio player
              text = <div className="message-bubble" dangerouslySetInnerHTML={{ __html: ProcessMessage.MediaRender(attachment.get('url'))}}></div>
            }
          }
        // }
      }
      else if(message.get('type') === "announcment"){
        text = ""
      }
      else {
        // if(!message.getIn(['text'], false)) {
          text = <div className="message-bubble" dangerouslySetInnerHTML={{ __html: UnicodeToImg.unicodeToImgTag(ProcessMessage.MediaRender(message.getIn(['text'], "hello")), undefined, true)}}></div>
        // }
      }

      let customType = message.get('customType')
      let metadata = message.get('metadata')

      let role = false

      // user roles
      if(message.getIn(["user", "metadata"], false)) {
        let metadata = message.getIn(["user", "metadata"], false)
        if(metadata.roles) {
          role = JSON.parse(metadata.roles)[0]
        }
      }

      //user avatar
      let messageAvatar;
      messageAvatar = <Comment.Avatar as={() => <AvatarWrapper className="avatar" name={message.getIn(['user', 'displayName']) } size={30} src={message.getIn(['user', 'avatarUrl'])}/>} />

      let classes = "window-message window-message-receive"

      if(message.getIn(['user', 'id']) === this.props.user.get('id')){
        classes = "window-message window-message-self"
      }

      if(messageClubbing.info){
        classes = classes + " cc-window-message-clubbing"
      }
      else{
        classes = classes + " cc-window-message-first"
      }

      if(timeDivider){
        messages.push(<div key={"window-message-" + message.get('id') + timeDivider} className="window-message cc-window-content-announcment">{timeDivider}</div>)
      }
      //message object
      if(text!=null && message.get('type') !== "announcement"){
        messages.push(
          <Comment.Group key={"window-message-" + message.get('id')} className={classes + " window-message-" + message.get('id')}>
            <Comment>
              {!messageClubbing.info && messageAvatar}
              <Comment.Content>
                {/*  message author*/}
                {!messageClubbing.info && <Popup
                  trigger={<Comment.Author as='a'>{message.getIn(['user', 'displayName'])}</Comment.Author>}
                  hideOnScroll
                  position='right center'
                  on='click'
                  basic
                  className="cc-theme cc-user-profile">
                  <Popup.Content>
                    <ProfileCard userM={message.getIn(['user'])} id={this.props.id} type={this.props.type} />
                  </Popup.Content>
                </Popup>}

                {/*  message role*/}
                {false && role && <Comment.Metadata className="role">{role}</Comment.Metadata>}
                {false && !messageClubbing.info && <Comment.Metadata>
                  <div>{UtilityTime.getTime('1', message.get('insertedAt')*1000)}</div>
                </Comment.Metadata>}

                <Comment.Text>
                  <div className="message-content">
                    {text}
                    {this.props.type === "group" && <ReadReceipt groupChannelId ={this.props.id} message={message} />}
                    {<div className="message-time">{UtilityTime.getTime('5', message.get('insertedAt')*1000)}</div>}
                  </div>
                  {/* <ReadReceipt groupChannelId ={this.props.id} message={message} /> */}
                  {/* {customType==="action_link" && <FlightCard product={JSON.parse(metadata.product)} />} */}
                </Comment.Text>
                {/* <Comment.Actions>
                  <div>{"16:40"}</div>
                </Comment.Actions> */}
              </Comment.Content>
            </Comment>
          </Comment.Group>
        )
      }
      else if(message.get('type') === "announcement"){
        messages.push(<div key={"window-message-" + message.get('id')} className="window-message cc-window-content-announcment">{message.get('text')}</div>)
      }
    })


    //Show if someone is typing
    if(this.props.groupChannels.getIn([this.props.id, 'typing'], false)
    && this.props.groupChannels.getIn([this.props.id, 'typingParticipants'])[0]['id'] !== this.props.user.get('id')) {
      messages.push(
        <Comment.Group className={"window-message window-message-receive cc-window-message-first"} key={"window-message-typing-" + (new Date()).getTime()}>
          <Comment>
            <Comment.Avatar as={() => <AvatarWrapper className="avatar" name={this.props.groupChannels.getIn([this.props.id, 'typingParticipants'])[0]['displayName']} size={30} src={this.props.groupChannels.getIn([this.props.id, 'typingParticipants'])[0]['avatarUrl']}/>} />
            <Comment.Content>
              {/* <Popover frame={"ifc-chat-frame-window"} position={"top left"} trigger={<Comment.Author as='a'>{message.name}</Comment.Author>} content={<ProfileCard/>}/> */}
              <Comment.Author as='a'>{this.props.groupChannels.getIn([this.props.id, 'typingParticipants'])[0]['displayName']}</Comment.Author>
              <Comment.Metadata>
                <div></div>
              </Comment.Metadata>
              <Comment.Text>
                <div className="message-content">
                  <Loader type="ball-beat" color="#222" size="sm" />
                </div>
              </Comment.Text>
              <Comment.Actions>
                {/* <Popover trigger={<Comment.Action>Settings</Comment.Action>} content={<MessageSettings/>}/> */}
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      )
    }
  }

    return (
      <Segment onScroll={this.checkLoadMore.bind(this)} className={windowContent} ref={node => this.handleContextRef = node}>
        {messages}
        {/* <FlightCard product={this.state.cardState} /> */}
        <SoundNotification groupChannelId = {this.props.id}/>
        <TitleAlert groupChannelId = {this.props.id}/>
        <DesktopNotification groupChannelId = {this.props.id}/>
        <Sound 
          playStatus={this.state.soundPlay} 
          autoLoad = {true} 
          url={this.state.soundPlayURL} 
          onFinishedPlaying = {this.handleOnFinishedPlaying}
          onLoading = {this.handleOnLoading}
          onLoad = {this.handleOnLoad}
          onPlaying = {this.handleOnPlaying}
          onPause = {this.handleOnPause}
        />
      </Segment>
    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch), //binds all the actions with dispatcher and returns them
    openChannelsActions: bindActionCreators(openChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowContent)
