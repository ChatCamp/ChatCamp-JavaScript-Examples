import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import * as actionsUserList from 'state/userList/actions'
import * as actionsGroupChannels from 'state/groupChannels/actions'
import ChatCampIcon from 'containers/ChatApp/Components/ChatCampIcon'
import {ICONS} from 'constants/icons'

import { Image, Segment, Popup, Modal, Input, Form, Label, Dropdown, Button, Message } from 'semantic-ui-react'
class ListHeader extends Component {

  state = {
    fileRef: null,
    groupName: "",
    groupParticipants: [],
    showGroupNameError: false,
    showGroupParticipantsError: false,
    modalOpen: false
  }

  ifPopUp = () => {
    if (this.props.smartChat.get("type") === "popup" || this.props.smartChat.get("type") === "inbox"){
      return true
    }
    else{
      return false
    }
  }
  closeSmartChat = () => {
    this.props.actions.smartChatClose()
  }

  checkLoadMore = (e) => {
    let parentNode = ReactDOM.findDOMNode(this.handleContextRef);
    let node = parentNode.querySelector('.menu')
    if(node.clientHeight === (node.scrollHeight - node.scrollTop)) {
      this.props.actionsUserList.getUserList(5, this.props.userList.last().get("id"))
    }
    return false
  }

  handleSubmit = (e) => {
    let {groupName, groupParticipants} = this.state
    if(groupName !== ""){
      if(groupParticipants.length > 0){
        groupParticipants.push(this.props.user.getIn(['id']))
        this.props.actionsGroupChannels.createChannel({groupChannelName: groupName, groupParticipants: groupParticipants, isDistinct: false})
        this.setState({groupName: "", groupParticipants: []})
        this.setState({modalOpen: false})
      }
      else{
        this.setState({showGroupParticipantsError: true})
      }
    }
    else{
      this.setState({showGroupNameError: true})
    }
  }

  handleGroupChange = (event) => {
    this.setState({showGroupNameError: false})
    this.setState({ [event.target.name]: event.target.value })
  }

  handleParticipantChange = (event, data) => {
    this.setState({showGroupParticipantsError: false})
    this.setState({ [data.name]: data.value })
  }

  // handleClose = (event, data) => {
  //   this.setState({groupName: "", groupParticipants: []})
  // }
  buttonClick= () => {
    this.setState({modalOpen: true})
  }
  handleCancel = () => {
    this.setState({groupName: "", groupParticipants: []})
    this.setState({modalOpen: false})
  }

  render () {
    let sourceURL = process.env.PUBLIC_URL + "/"
    let source =  <ChatCampIcon icon={ICONS.CREATE} height="20px" width="20px" viewBox="0 0 35 35"/>
    let source_close =  <ChatCampIcon icon={ICONS.CLOSE} height="24px" width="24px" viewBox="0 0 50 50"/>
    let options = []
    let {groupName, groupParticipants, modalOpen, showGroupParticipantsError, showGroupNameError} = this.state
    let nameError = <Message error size={"tiny"}
      header='Group Name can not be empty'/>
    let participantsError = <Message error size={"tiny"}
      header='Atleast one participant must be added to the group'/>
    this.props.userList.map((rosterItem) => {
      if(rosterItem.getIn(['id']) !== this.props.user.getIn(['id'])){
          let id = rosterItem.getIn(['id'])
          let name = rosterItem.getIn(['displayName'])
          // let image = rosterItem.getIn(['avatarUrl'])
          // options.push({key: id, value: id, image: image, text: name  })
          options.push({key: id, value: id, text: name  })
      }
    })

   return(
     <Segment className="cc-list-header cc-widget">
       <Modal className="cc-create-group-modal cc-theme" open={modalOpen} size="tiny"
         trigger={<Popup className="headerSettings"
                         trigger={<div onClick={this.buttonClick.bind()} className= "cc-list-header-image">{source}</div>}
                         hideOnScroll
                         position='bottom left'
                         on='hover' className="cc-theme cc-tooltips">
                  <Popup.Content>Create New Group Chat</Popup.Content>
                  </Popup>}
        // onClose = {this.handleClose.bind(this)}
        >
        <Modal.Header>Create New Group Chat</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {showGroupParticipantsError && participantsError}
              {showGroupNameError && nameError}
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Field>
                  <Label>Group Name</Label>
                  <Input placeholder='Type here' name= 'groupName' value={groupName} onChange={this.handleGroupChange.bind(this)} />
                </Form.Field>
                <Form.Field>
                  <Label>Participants</Label>
                  <Dropdown ref={node => this.handleContextRef = node} onScroll={this.checkLoadMore.bind(this)} placeholder='Add Participants' fluid multiple selection options={options} name= 'groupParticipants' value={groupParticipants} onChange={this.handleParticipantChange.bind(this)} />
              </Form.Field>
              <br/>
              <Button.Group>
              <Form.Button onClick={this.handleCancel.bind()}>
                Cancel
              </Form.Button>
              <Button.Or />
              <Form.Button primary onClick={this.handleSubmit.bind(this)}>
                Create
              </Form.Button>
            </Button.Group>
            <br/>
            <br/>
            </Form>

            </Modal.Description>
          </Modal.Content>

        </Modal>
        <div className="cc-list-header-text">My Chats</div>
        { this.ifPopUp() && <div className={"cc-list-header-actions"}>
          <Popup className="headerSettings"
            trigger={<div onClick={() => {this.closeSmartChat()}} className= "cc-lisr-header-close">{source_close}</div>}
            hideOnScroll
            position='bottom right'
            on='hover' className="cc-theme cc-tooltips">
            <Popup.Content>
              Close
            </Popup.Content>
          </Popup>
        </div>}
     </Segment>
   )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    actionsUserList: bindActionCreators(actionsUserList, dispatch),
    actionsGroupChannels: bindActionCreators(actionsGroupChannels, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader)
