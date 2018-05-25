import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
import * as actions1 from 'state/openChannels/actions'
import { Segment, Grid, Icon, Progress, Popup, Image } from 'semantic-ui-react'
import './style.css'
import Emoji from '../Emoji'
import UnicodeToImg from 'utility/UnicodeToImg'
import Popover from '../Popover'
import Textarea from 'react-textarea-autosize';
import MessageAction from '../MessageAction'
import CannedResponse from '../CannedResponse'
import Utility from 'utility/Utility';
import DetectBrowser from 'utility/DetectBrowser';

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
    let mic
    if(!DetectBrowser.detectIE()){
      mic = require("react-mic").ReactMic
      this.setState({mic: mic})
    }
    else{
      this.setState({mic: false})
    }
  }

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
      if(diff !== 0 & !this.state.initialLoad){
        this.setState({footerHeight: height},function(){
          let contentHeight = this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].offsetHeight
          let contentHeightInt = contentHeight
          let newContentHeightInt =  contentHeightInt - diff
          this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].style.height = newContentHeightInt  + "px"

          if(diff > 0){
            this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].scrollTop = this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].scrollTop + diff
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
    let reader = new FileReader();
    let file = e.target.files[0];
    if(this.props.type === "group"){
      this.props.actions.attachmentMessage(this.props.id, file)
    }
    else {
      this.props.actions1.attachmentMessage(this.props.id, file)
    }
    reader.onloadend = () => {
      this.setState({
        attachment: file,
      });
    }

    reader.readAsDataURL(file)
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
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onStop = (recordedBlob) =>{

    // var fd = new FormData();
    // fd.append('fname', 'test.wav');
    // fd.append('data', recordedBlob);
    var file = new File([recordedBlob.blob], "recording.mp3", {type: "audio/mp3", lastModified: Date.now()});
    // let reader = new FileReader();
    this.props.actions.attachmentMessage(this.props.id, file)
    // reader.onloadend = () => {
    //   // console.log("File Reader", reader)
    //   this.setState({
    //     attachment: file,
    //     // imagePreviewUrl: reader.result
    //   });
    // }
    //
    // reader.readAsDataURL(file)
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
    // this.props.setInput(this.textInputRef);
    this.props.setFileRef(this.refs.attachmentField)
  }

  componentWillUnmount() {
    // this.props.removeInput(this.textInputRef)
  }

  render () {
    const { message, isFile, isAction, record } = this.state
    let {groupChannels, id} = this.props
    let percent = groupChannels.getIn([id, 'attachmentProgress'], 0)
    let sourceURL = process.env.PUBLIC_URL + "/"
    let source =  sourceURL + "icons8-attach-60.png"
    let source_send = sourceURL + "icons8-sent-60.png"
    let source_emoji = sourceURL + "icons8-happy-100.png"

    return (
    <Segment className="window-footer" compact={true} size={"mini"} style={{paddingBottom: "0", paddingTop: "0"}}>
      {/* <textArea className="borderNone" placeholder='Type and Send Message..' name ='message' value={message} style={{ width: "100%"}} onChange={this.handleChange} onKeyDown={this.handleKeyPress} ref={node => this.textInputRef = node} /> */}
      {!!percent && <Progress percent={percent} attached="top" size="large" color="purple" />}
      <Grid style={{margin: 0, height: "100%", minHeight: "48px"}}>
        <Grid.Column className="chatcamp-widget-emoji-main" style={{paddingLeft:"3px"}} verticalAlign="middle" width={1}>
          <Popup
            trigger={<Image className="chatcamp-widget-emoji" src={source_emoji} />}
            content={<Emoji
                      className="backgroundNone"
                      key="ifc-chat-window-panel"
                      showEmojiPanel={true}
                      clickMethod ={this.handleUpdateEmoji}
                    />}
            on='click'
            hoverable
            size="large"
            className="cc-popup-emoji"
          />

        </Grid.Column>

        <Grid.Column verticalAlign="middle" width={(isFile && isAction)?13:(isFile?13:13)} className="cc-window-footer-text-main">

          <Textarea
            className="window-textarea borderNone"
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
          <input ref="attachmentField" type="file" onChange={this.handleFileUpload} style={{visibility: "hidden", width: 0}}/>
        </Grid.Column>
        {/* Canned Responses Add */}
        {isFile && <CannedResponse id={this.props.id} />}
        {/* Attach File */}
        {isFile && <Grid.Column className="chatcamp-widget-attach-main" verticalAlign="middle" width={1}>
          <Popup
            trigger={<Image className="chatcamp-widget-attach" src={source} onClick={() => {this.sendAttachmentClick()}}/>}
            content='Attach a File'
            inverted
          />
        </Grid.Column>}
        {/* Attach Media */}
        {false && isFile && !this.ifPopUp() && <Grid.Column verticalAlign="middle" width={1}>
          <Popup
            trigger={<Icon name='image' size='large' onClick={() => {this.sendAttachmentClick()}}/>}
            content='Attach Media'
            inverted
          />
        </Grid.Column>}
        { isAction && isFile && <Grid.Column width={1}>
          <MessageAction id={this.props.id}/>
        </Grid.Column>}
        {/* Send Message Button */}
        {!isFile && <Grid.Column className="chatcamp-widget-send-main" verticalAlign="middle" width={1}>
          <Popup
            // trigger={<Icon name='send outline' color={"purple"} size='large' onClick={() => {this.sendMessageClick()}}/>}
            trigger={<Image className="chatcamp-widget-send" src={source_send} onClick={() => {this.sendMessageClick()}}/>}
            content='Send Message'
            inverted
          />
        </Grid.Column>}
        {/* Start Recording*/}
        {false && isFile && !record && <Grid.Column verticalAlign="middle" width={1}>
          <Popup
            trigger={<Icon name='microphone' size='large' onClick={() => {this.startRecording()}}/>}
            content='Start Recording'
            inverted
          />
        </Grid.Column>}
        {/* Stop Recording*/}
        {false && isFile && record && <Grid.Column verticalAlign="middle" width={1}>
          <Popup
            trigger={<Icon name='microphone slash' size='large' onClick={() => {this.stopRecording()}}/>}
            content='Stop Recording'
            inverted
          />
        </Grid.Column>}
      </Grid>
      {/* React Mic Hidden Component*/}
      { this.state.mic && <this.state.mic
          record={this.state.record}
          className="hideMic"
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081" />}
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
    actions1: bindActionCreators(actions1, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowFooter)
