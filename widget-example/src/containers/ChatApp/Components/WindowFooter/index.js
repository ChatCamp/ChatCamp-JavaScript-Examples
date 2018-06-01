import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
import * as actions1 from 'state/openChannels/actions'
import { Segment, Grid, Icon, Progress, Popup, Image } from 'semantic-ui-react'
import Emoji from '../Emoji'
import UnicodeToImg from 'utility/UnicodeToImg'
import Popover from '../Popover'
import Textarea from 'react-textarea-autosize';
import MessageAction from '../MessageAction'
import CannedResponse from '../CannedResponse'
import Utility from 'utility/Utility';
import DetectBrowser from 'utility/DetectBrowser';
import ChatCampIcon from 'containers/ChatApp/Components/ChatCampIcon'
import {ICONS} from 'constants/icons'
import * as Debug from 'debug';
const debug = Debug('chatcamp:WindowFooter')

class WindowFooter extends Component {
  state = {
    open: false,
    message: '',
    isEmojiOpen: false,
    footerHeight: 23,
    isFile: true,
    record: false,
    initialLoad: true,
    isAction: (process.env.REACT_APP_CHATCAMP_ACTION === "TRUE") || (Utility.getUrlQueryParams(window.location.href)['action'] && Utility.getUrlQueryParams(window.location.href)['action'][0] && Utility.getUrlQueryParams(window.location.href)['action'][0] === "true")
  }
  constructor(props,context){
    super(props,context);
    this.handleUpdateEmoji = this.handleUpdateEmoji.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentWillMount(){
    // let mic
    // if(!DetectBrowser.detectIE()){
    //   mic = require("react-mic").ReactMic
    //   this.setState({mic: mic})
    // }
    // else{
    //   this.setState({mic: false})
    // }
  }
  componentDidUpdate

  handleChange = (e) =>{
    let isFile = false;
    if(e.target.value === '') {
      isFile = true;
      this.handleChangeHeight(this.state.initialHeight)
      this.setState({initialLoad: true})
    }
    else{
      this.setState({initialLoad: false})
    }
    if(e.target.value !== '\n'){
      this.setState({
        message: e.target.value,
        isFile: isFile
      },function(){
        if(this.props.type === "group"){
          this.props.actions.startTyping(this.props.id)
        }
      })
    }
  }
  handleChangeHeight(height){
    if(this.state.initialLoad){
      this.setState({initialHeight: height})
    }
    if(!isNaN(height)){
      let diff = height - this.state.footerHeight
      if(diff !== 0 && !this.state.initialLoad){
        this.setState({footerHeight: height},function(){
          let contentHeight = this.textInputRef.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].offsetHeight
          let contentHeightInt = contentHeight
          let newContentHeightInt =  contentHeightInt - diff
          this.textInputRef.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].style.height = newContentHeightInt  + "px"
          if(diff > 0){
            this.textInputRef.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].scrollTop = this.textInputRef.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].scrollTop + diff
          }

        })
      }
    }
  }

  handleKeyPress = (e) =>{
    if(e.key === "Enter"){
      e.preventDefault();
      this.sendMessage()
      // Scrolling to bottom if message is being sent
      let node = ReactDOM.findDOMNode(this);
      var contentNode = node.parentNode.getElementsByClassName("window-content")[0];
      contentNode.scrollTop = contentNode.scrollHeight;
    }
  }

  sendAttachmentClick = () => {
    let inputAttachment = this.refs.attachmentField;
    inputAttachment.click()
  }

  sendMessageClick = () => {
    this.sendMessage()
  }

  sendMessage = () => {
    if((this.state.message !== '')){
      let message = UnicodeToImg.colonToUnicode(UnicodeToImg.checkIfEmoji(this.state.message))
      if(this.props.type === "group"){
        this.props.actions.userMessage(this.props.id, message)
        this.setState({
          message: '',
          isFile: true
        })
      }
      else if(this.props.type === "open"){
        this.props.actions1.userMessage(this.props.id, message)
        this.setState({
          message: '',
          isFile: true
        })
      }
    }
  }

  handleFileUpload(e) {
    e.preventDefault();
    // let reader = new FileReader();
    let file = e.target.files[0];
    if(file !== 'undefined'){
      if(this.props.type === "group"){
        this.props.actions.attachmentMessage(this.props.id, file)
      }
      else {
        this.props.actions1.attachmentMessage(this.props.id, file)
      }
    }
  }


  handleUpdateEmoji(emoji, e) {
    //update emoji in text box
    let oldMessage = this.state.message;
    let newMessage = oldMessage + emoji['colons'] + " "
    this.setState({message: newMessage})
    //close emoji panel
    this.setState({isEmojiOpen: false})
    //focus in textarea on choosing emoji
    this.textInputRef.focus()
  }

  startRecording = () => {
    let mic
    if(!DetectBrowser.detectIE()){
      mic = require("react-mic").ReactMic
      this.setState({mic: mic, record: true}, function(){

      })
    }
    else{
      this.setState({mic: false, record: true})
    }
    // this.setState({
    //   record: true
    // });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onStop = (recordedBlob) =>{
    debug("on stop recording", this.props.id)
    var file = new File([recordedBlob.blob], "recording.mp3", {type: "audio/mp3", lastModified: Date.now()});
    this.props.actions.attachmentMessage(this.props.id, file)
    this.setState({
      mic: false
    });
  }

  ifPopUp = () => {
    if (this.props.smartChat.get("type") === "popup"){
      return true
    }
    else{
      return false
    }
  }

  componentDidMount() {
    this.props.setFileRef(this.refs.attachmentField)
  }


  render () {
    const { message, isFile, isAction, record } = this.state
    let {groupChannels, id} = this.props
    let percent = groupChannels.getIn([id, 'attachmentProgress'], 0)
    let sourceURL = process.env.PUBLIC_URL + "/"
    let source =  <ChatCampIcon icon={ICONS.ATTACH} height="23px" width="23px" viewBox="0 0 32 32"/>
    let source_send = <ChatCampIcon icon={ICONS.SEND} height="24px" width="24px" viewBox="0 0 32 32"/>
    let source_emoji = <ChatCampIcon icon={ICONS.SMILEY} height="20px" width="20px" viewBox="0 0 50 50"/>

    return (
    <div>
      {!!percent && <Progress className="cc-window-progress" percent={percent} size="tiny" />}
      
    <div className="window-footer" size={"mini"}>
      <div className="cc-window-footer-inner">
        <div className="chatcamp-widget-emoji-main cc-footer-elements">
          <Popup

            trigger={<div className="chatcamp-widget-emoji">{source_emoji}</div>}
            content={<Emoji
                      // className="backgroundNone"
                      key="ifc-chat-window-panel"
                      showEmojiPanel={true}
                      clickMethod ={this.handleUpdateEmoji}
                    />}
            on='click'
            basic
            hoverable
            size="large"
            className="cc-popup-emoji cc-theme"
          />

        </div>

        <div className="cc-window-footer-text-main">
          <Textarea
            className="window-textarea"
            name ='message'
            minRows={1}
            maxRows={5}
            // placeholder={'Send Message as ' + this.props.user.get('displayName')}
            placeholder={'Send Message...'}
            value={message}
            // style={}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            inputRef={node => this.textInputRef = node}
            onHeightChange={(height, instance) => this.handleChangeHeight(height)}
            onClick={this.handleKeyPress}
          />
          <input ref="attachmentField" type="file" onChange={this.handleFileUpload} style={{visibility: "hidden", width: 0, height: 0, display: "none"}}/>
        </div>
        {/* Canned Responses Add */}
        {false && isFile && <CannedResponse id={this.props.id} />}
        {/* Attach File */}
        {isFile && <div className="chatcamp-widget-attach-main cc-footer-elements">
          <Popup
            trigger={<div onClick={() => {this.sendAttachmentClick()}} className= "chatcamp-widget-attach">{source}</div>}
            content='Attach a File'
            className="cc-theme cc-tooltips"
          />
        </div>}
        {/* Attach Media */}
        {false && isFile && !this.ifPopUp() && <Grid.Column stretched verticalAlign="middle" width={1}>
          <Popup
            trigger={<Icon name='image' size='large' onClick={() => {this.sendAttachmentClick()}}/>}
            content='Attach Media'
            className="cc-theme cc-tooltips"
          />
        </Grid.Column>}
        { isAction && isFile && <Grid.Column width={1}>
          <MessageAction id={this.props.id}/>
        </Grid.Column>}
        {/* Send Message Button */}
        {!isFile && <div className="chatcamp-widget-send-main cc-footer-elements">
          <Popup
            trigger={<div onClick={() => {this.sendMessageClick()}} className= "chatcamp-widget-send">{source_send}</div>}
            content='Send Message'
            className="cc-theme cc-tooltips"
          />
        </div>}
        {/* Start Recording*/}
        { isFile && !record && <div className="chatcamp-widget-record-main cc-footer-elements">
          <Popup
            trigger={<Icon className= "chatcamp-widget-record" name='microphone' size='large' onClick={() => {this.startRecording()}}/>}
            content='Start Recording'
            className="cc-theme cc-tooltips"
          />
        </div>}
        {/* Stop Recording*/}
        {isFile && record && <div className="chatcamp-widget-record-main cc-footer-elements">
          <Popup
            trigger={<Icon className= "chatcamp-widget-record" name='microphone slash' size='large' onClick={() => {this.stopRecording()}}/>}
            content='Stop Recording'
            className="cc-theme cc-tooltips"
          />
        </div>}
      </div>
      {/* React Mic Hidden Component*/}
      { this.state.mic && <this.state.mic
          record={this.state.record}
          className="cc-hideMic"
          onStop={this.onStop}
          key= {this.props.id}
          strokeColor="#000000"
          backgroundColor="#FF4081" />}
    </div>
    </div>

    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch), //binds all the actions with dispatcher and returns them
    actions1: bindActionCreators(actions1, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowFooter)
