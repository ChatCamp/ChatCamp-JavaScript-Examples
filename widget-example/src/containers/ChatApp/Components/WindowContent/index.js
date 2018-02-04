import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Immutable from 'immutable';
import { bindActionCreators } from 'redux'
import {
  GROUP_CHANNELS_INVITE_ACCEPTANCE_REQUIRED,
  GROUP_CHANNELS_INVALID_PARTICIPANT
} from 'state/action-types'
import * as actions from 'state/groupChannels/actions'
import {Map} from 'immutable'
import { Segment, Comment, Confirm, Message, Image, Card, Icon } from 'semantic-ui-react'
import {Loader} from 'react-loaders'
import AvatarWrapper from 'containers/ChatApp/Components/AvatarWrapper'
import UnicodeToImg from 'utility/UnicodeToImg'
import UtilityTime from 'utility/UtilityTime'
import ProcessMessage from 'utility/ProcessMessage';
import _ from 'lodash'
// import MessageActionCard from '../MessageActionCard'

// import ReactList from 'react-list';
// import { Scrollbars } from 'react-custom-scrollbars';
// import './style.css'

class WindowContent extends Component {

  state = {
    messages : [],
    isLoading: false
  }

  handleInviteCancel() {

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
    else if(oldMessage.getIn(['user', 'id']) === currentMessage.getIn(['user', 'id'])){
      if(currentMessage.insertedAt - oldMessage.insertedAt < 300){
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
      this.props.actions.getHistory(this.props.id, this.props.groupChannels.getIn([this.props.id, 'messages'], false).first().id)
    }
    return false
  }

  componentWillUpdate() {
    let node = ReactDOM.findDOMNode(this);
    this.scrollHeight = node.scrollHeight;
    this.scrollTop = node.scrollTop;
  }

  componentDidUpdate(prevProps, prevState) {
    let node = ReactDOM.findDOMNode(this);
    if(node) {
      node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
    }

  }

  componentDidMount(){

  }



  render () {
    const contextWindow = document.getElementById("ifc-" + this.props.id)
    const { contextRef } = this.state

    let messages = [];
    let oldMessage = {}

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
    if(this.props.groupChannels.getIn([this.props.id, 'messages'], false)){
    this.props.groupChannels.getIn([this.props.id, 'messages'], false).map((message, key) => {
      message = Map(message)
      //handle message clubbing
      let messageClubbing = this.handleClubbing(message,oldMessage)
      oldMessage = _.clone(message)

      let text = null
      console.log(message.get('type'), message.get('text', false), message.getIn(['attachment', 'url'], false))
      if(message.get('type') === "attachment") {
        let attachment = message.getIn(['attachment'])
        // if(!message.getIn(['attachment', 'url'], false)) {
          text = <div dangerouslySetInnerHTML={{ __html: ProcessMessage.MediaRender(attachment.get('url'))}}></div>
          if(attachment.get('type').substring(0,5) === "image") {
            text = <Image src={attachment.get('url')} />
          }
        // }
      }
      else {
        // if(!message.getIn(['text'], false)) {
          text = <div dangerouslySetInnerHTML={{ __html: UnicodeToImg.unicodeToImgTag(ProcessMessage.MediaRender(message.getIn(['text'], "hello")), undefined, true)}}></div>
        // }
      }
      let customType = message.get('customType')
      let metadata = message.get('metadata')

      let role = false

      if(message.getIn(["user", "metadata"], false)) {
        let metadata = message.getIn(["user", "metadata"], false)
        if(metadata.roles) {
          role = JSON.parse(metadata.roles)[0]
        }
      }
      let messageAvatar;
      if(message.getIn(['user', 'avatarUrl'])){
        messageAvatar = <Comment.Avatar src={message.getIn(['user', 'avatarUrl'])} />
      }
      else{
        messageAvatar = <Comment.Avatar as={() => <AvatarWrapper color={messageClubbing.color} className="avatar" name={message.getIn(['user', 'displayName']) }/>} />
      }
      if(text!=null) messages.push(
        <Comment.Group key={"window-message-" + message.get('id')}>
          <Comment>

            {messageAvatar}
            {/* <Comment.Avatar src="https://iflychat.com/sites/default/files/styles/thumbnail/public/pictures/picture-13-1347368850.jpg?itok=lz_uGf7g" /> */}
            <Comment.Content>
              {/* <Popover frame={"ifc-chat-frame-window"} position={"top left"} trigger={<Comment.Author as='a'>{message.name}</Comment.Author>} content={<ProfileCard/>}/> */}
              {!messageClubbing.info && <Comment.Author as='a'>{message.getIn(['user', 'displayName']) || message.getIn(['user', 'displayName'])}</Comment.Author>}
              {role && <Comment.Metadata className="role">{role}</Comment.Metadata>}
              {!messageClubbing.info && <Comment.Metadata>
                <div>{UtilityTime.getTime('1', message.get('insertedAt')*1000)}</div>
              </Comment.Metadata>}
              <Comment.Text>
                {text}
                {/* {customType==="action_link" && <MessageActionCard product={JSON.parse(metadata.product)} />} */}
              </Comment.Text>
              <Comment.Actions>
                {/* <Popover trigger={<Comment.Action>Settings</Comment.Action>} content={<MessageSettings/>}/> */}
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      )
    })

    //Show if someone is typing
    if(this.props.groupChannels.getIn([this.props.id, 'typing'], false)
    && this.props.groupChannels.getIn([this.props.id, 'typingParticipants'])[0]['id'] !== this.props.user.get('id')) {
      messages.push(
        <Comment.Group key={"window-message-typing-" + (new Date()).getTime()}>
          <Comment>
            <Comment.Avatar as={() => <AvatarWrapper className="avatar" name={this.props.groupChannels.getIn([this.props.id, 'typingParticipants'])[0]['display_name']}/>} />
            {/* <Comment.Avatar src="https://iflychat.com/sites/default/files/styles/thumbnail/public/pictures/picture-13-1347368850.jpg?itok=lz_uGf7g" /> */}
            <Comment.Content>
              {/* <Popover frame={"ifc-chat-frame-window"} position={"top left"} trigger={<Comment.Author as='a'>{message.name}</Comment.Author>} content={<ProfileCard/>}/> */}
              <Comment.Author as='a'>{this.props.groupChannels.getIn([this.props.id, 'typingParticipants'])[0]['display_name']}</Comment.Author>
              <Comment.Metadata>
                <div></div>
              </Comment.Metadata>
              <Comment.Text>
                <Loader type="ball-beat" color="#222" size="sm" />
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
      <Segment onScroll={this.checkLoadMore.bind(this)} className="window-content" style={{overflowY: "auto", height: "375px"}} ref={node => this.handleContextRef = node}>
        {messages}
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

export default connect(mapStateToProps, mapDispatchToProps)(WindowContent)
