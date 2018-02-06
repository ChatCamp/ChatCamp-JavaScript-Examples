import React, { Component } from 'react'
import { ReactMic } from 'react-mic';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
import { Segment, Grid, Icon, Progress } from 'semantic-ui-react'
import './style.css'
import Emoji from '../Emoji'
import UnicodeToImg from 'utility/UnicodeToImg'
import Popover from '../Popover'
import Textarea from 'react-textarea-autosize';
import client from 'Client'
// import MessageAction from '../MessageAction'
import CannedResponse from '../CannedResponse'
import Utility from 'utility/Utility';

class WindowFooter extends Component {
  state = {
    open: false,
    message: '',
    isEmojiOpen: false,
    footerHeight: 23,
    isFile: true,
    record: false,
    isAction: (process.env.REACT_APP_CHATCAMP_ACTION === "TRUE") || (Utility.getUrlQueryParams(window.location.href)['action'] && Utility.getUrlQueryParams(window.location.href)['action'][0] && Utility.getUrlQueryParams(window.location.href)['action'][0] === "true")
  }
  constructor(props,context){
    super(props,context);
    this.handleUpdateEmoji = this.handleUpdateEmoji.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleChange = (e) =>{
    let isFile = false;
    if(e.target.value === '') {
      isFile = true;
    }
    if(e.target.value !== '\n'){
      this.setState({
        message: e.target.value,
        isFile: isFile
      },function(){
        this.props.actions.startTyping(this.props.id)
      })
    }
  }
  handleChangeHeight(height){
    if(!isNaN(height)){
      let diff = height - this.state.footerHeight
      if(diff !== 0 & height !== 13){
        this.setState({footerHeight: height},function(){
          let contentHeight = this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].style.height
          let contentHeightInt = Number(contentHeight.substring(0, contentHeight.length - 2))
          let newContentHeightInt =  contentHeightInt - diff
          // console.log(newContentHeightInt)
          this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].style.height = newContentHeightInt + "px"
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
      this.props.actions.userMessage(this.props.id, message)
      this.setState({
        message: '',
        isFile: true
      })
    }
  }

  handleFileUpload(e) {
    e.preventDefault();
    // console.log("file uploaded", e, "group_channel", this.props.id)
    let reader = new FileReader();
    let file = e.target.files[0];
    this.props.actions.attachmentMessage(this.props.id, file)
    reader.onloadend = () => {
      // console.log("File Reader", reader)
      this.setState({
        attachment: file,
        // imagePreviewUrl: reader.result
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
    console.log('recordedBlob is: ', recordedBlob);
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

  componentDidMount() {
    // this.props.setInput(this.textInputRef);
    this.props.setFileRef(this.refs.attachmentField)
  }

  componentWillUnmount() {
    // this.props.removeInput(this.textInputRef)
  }

  render () {
    console.log("i ma here")
    const { open, message, isFile, isAction, record } = this.state
    let {frame, groupChannels, id} = this.props
    let percent = groupChannels.getIn([id, 'attachmentProgress'], 0)
    return (
    <Segment compact={true}>
      {/* <textArea className="borderNone" placeholder='Type and Send Message..' name ='message' value={message} style={{ width: "100%"}} onChange={this.handleChange} onKeyDown={this.handleKeyPress} ref={node => this.textInputRef = node} /> */}
      {!!percent && <Progress percent={percent} attached="top" size="large" color="purple" />}
      <Grid>
        <Grid.Column width={1}>

          <Popover
            frame={this.props.id}
            isOpen={this.state.isEmojiOpen}
            trigger={<Icon name='smile' size='large' />}
            content={<Emoji
                      className="backgroundNone"
                      key="ifc-chat-window-panel"
                      showEmojiPanel={true}
                      clickMethod ={this.handleUpdateEmoji}
                    />}
          />

        </Grid.Column>

        <Grid.Column width={(isFile && isAction)?9:(isFile?10:12)} style={{paddingLeft: "9px", fontSize: "13.5px"}}>

          <Textarea
            className="borderNone"
            name ='message'
            minRows={1}
            maxRows={5}
            placeholder={'Send Message as ' + this.props.user.get('displayName')}
            value={message}
            style={{ width: "100%", minHeight: "23px"}}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            inputRef={node => this.textInputRef = node}
            onHeightChange={(height, instance) => this.handleChangeHeight(height)}
          />
          <input ref="attachmentField" type="file" onChange={this.handleFileUpload} style={{visibility: "hidden"}}/>
        </Grid.Column>
        {isFile && <CannedResponse id={this.props.id} />}
        {isFile && <Grid.Column width={1}>
          <Icon name='add' size='large' onClick={() => {this.sendAttachmentClick()}}/>
        </Grid.Column>}
        {isFile && <Grid.Column width={1}>
          <Icon name='image' size='large' onClick={() => {this.sendAttachmentClick()}}/>
        </Grid.Column>}
        {/* {isAction && isFile && <Grid.Column width={1}>
          <MessageAction id={this.props.id}/>
        </Grid.Column>} */}
        {!isFile && <Grid.Column width={1}>
          <Icon name='arrow right' size='large' onClick={() => {this.sendMessageClick()}}/>
        </Grid.Column>}
        {isFile && !record && <Grid.Column width={1}>
          <Icon name='microphone' size='large' onClick={() => {this.startRecording()}}/>
        </Grid.Column>}
        {isFile && record && <Grid.Column width={1}>
          <Icon name='microphone slash' size='large' onClick={() => {this.stopRecording()}}/>
        </Grid.Column>}
      </Grid>
      <ReactMic
          record={this.state.record}
          className="hideMic"
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
    </Segment>

    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowFooter)
