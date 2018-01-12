import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import { Segment, Comment } from 'semantic-ui-react'
import {Loader} from 'react-loaders'
import AvatarWrapper from 'containers/ChatApp/Components/AvatarWrapper'
import UnicodeToImg from 'utility/UnicodeToImg'
import UtilityTime from 'utility/UtilityTime'
import _ from 'lodash'

// import ReactList from 'react-list';
// import { Scrollbars } from 'react-custom-scrollbars';
// import './style.css'

class WindowContent extends Component {

  state = {
    messages : [],
    topVisible : false,
    shouldRequest: false,
    oldHeight: 0,
    oldScroll: 0,
    oldMessage: {}
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
    this.setState({
      oldHeight: this.state.node.scrollHeight,
      oldScroll: this.state.node.scrollTop
    })
    if(this.state.node.scrollTop === 0 && this.state.node.scrollHeight > this.state.node.clientHeight){
      // this.props.onLoadMore()
    }
  }

  // componentDidUpdate(prevProps, prevState){
  //   //TODO: Make functions for 'if' conditions to better understand the code
  //   // if((prevProps.messages.size !== this.props.messages.size || this.props.typingUser )&& (this.props.messages[this.props.messages.size - 1].sender.id === this.props.user.id || (prevProps.messages.size > 0 && this.props.messages.size > 0 && prevProps.messages[prevProps.messages.size - 1].id === this.props.messages[this.props.messages.size - 1].id))){
  //   let node = ReactDOM.findDOMNode(this);
  //   let bottom = ((node.clientHeight + this.state.oldScroll) === this.state.oldHeight)
  //   // console.log("before hello scroll",this.state.oldHeight,node.scrollHeight,(node.scrollHeight - this.state.oldHeight ) ,node.clientHeight, node.scrollTop )
  //   // console.log("before hello scroll 2", this.state.oldHeight - (node.clientHeight + node.scrollTop))
  //   if(this.state.oldScroll === 0 && this.state.oldHeight !== node.clientHeight){
  //     // console.log("inside first case")
  //     node.scrollTop = this.state.oldScroll + node.scrollHeight - this.state.oldHeight
  //   }
  //   else if((this.props.messages.size > 0 && this.props.messages[this.props.messages.size - 1].sender.id === this.props.user.id) || bottom){
  //     if(this.props.messages.size > 0){
  //       this.setState({shouldRequest: true})
  //       // setTimeout(()=> {node.scrollTop = this.state.oldScroll + node.scrollHeight - this.state.oldHeight}, 0)
  //       // console.log("hello scroll",node.scrollHeight, node.clientHeight )
  //       node.scrollTop = node.scrollHeight - node.clientHeight
  //     }
  //   }
  //   this.setState({
  //     oldHeight: node.scrollHeight,
  //     oldScroll: node.scrollTop
  //   })
  // }
  componentDidMount(){
    this.setState({node: ReactDOM.findDOMNode(this)})
    let node = ReactDOM.findDOMNode(this);
    setTimeout(()=> {node.scrollTop = node.scrollHeight }, 0)
    if(this.props.messages.size > 0){
      this.setState({shouldRequest: true})
    }
    this.setState({
      oldHeight: node.scrollHeight,
      oldScroll: node.scrollTop
    })
  }

  render () {
    const contextWindow = document.getElementById("ifc-" + this.props.id)
    const { contextRef } = this.state
    let messages = [];
    let oldMessage = {}
    // Iterate in Messages from props and Display them
    if(this.props.messages){
    this.props.messages.map((message, key) => {
      message = Map(message)
      //handle message clubbing
      let messageClubbing = this.handleClubbing(message,oldMessage)
      oldMessage = _.clone(message)

      messages.push(
        <Comment.Group key={"window-message-" + message.get('id')}>
          <Comment>
            {<Comment.Avatar as={() => <AvatarWrapper color={messageClubbing.color} className="avatar" name={message.getIn(['user', 'displayName']) || message.getIn(['user', 'displayName'])}/>} />}
            {/* <Comment.Avatar src="https://iflychat.com/sites/default/files/styles/thumbnail/public/pictures/picture-13-1347368850.jpg?itok=lz_uGf7g" /> */}
            <Comment.Content>
              {/* <Popover frame={"ifc-chat-frame-window"} position={"top left"} trigger={<Comment.Author as='a'>{message.name}</Comment.Author>} content={<ProfileCard/>}/> */}
              {!messageClubbing.info && <Comment.Author as='a'>{message.getIn(['user', 'displayName']) || message.getIn(['user', 'displayName'])}</Comment.Author>}
              {!messageClubbing.info && <Comment.Metadata>
                <div>{UtilityTime.getTime('1', message.get('insertedAt')*1000)}</div>
              </Comment.Metadata>}
              <Comment.Text>
                <div dangerouslySetInnerHTML={{ __html: UnicodeToImg.unicodeToImgTag(message.getIn(['text']), undefined, true)}}></div>
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
    if(this.props.typingUser) {
      messages.push(
        <Comment.Group key={"window-message-typing-" + (new Date()).getTime()}>
          <Comment>
            <Comment.Avatar as={() => <AvatarWrapper className="avatar" name={this.props.typingUser.user_name || this.props.typingUser.userName}/>} />
            {/* <Comment.Avatar src="https://iflychat.com/sites/default/files/styles/thumbnail/public/pictures/picture-13-1347368850.jpg?itok=lz_uGf7g" /> */}
            <Comment.Content>
              {/* <Popover frame={"ifc-chat-frame-window"} position={"top left"} trigger={<Comment.Author as='a'>{message.name}</Comment.Author>} content={<ProfileCard/>}/> */}
              <Comment.Author as='a'>{this.props.typingUser.user_name || this.props.typingUser.userName}</Comment.Author>
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

export default WindowContent
