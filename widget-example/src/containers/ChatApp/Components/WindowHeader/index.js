import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'
import * as actionsGroupChannels from 'state/groupChannels/actions'
import * as actionsUserList from 'state/userList/actions'
import { Icon, Header, Segment, Grid, Popup, Image, Modal, Form, Label, Dropdown, Button, Message} from 'semantic-ui-react'
import Utility from 'utility/Utility';
import GroupParticipantsList from 'containers/ChatApp/Components/GroupParticipantsList'
import ChatCampIcon from 'containers/ChatApp/Components/ChatCampIcon'
import {ICONS} from 'constants/icons'


class WindowHeader extends Component {
  state = {
    groupName: "",
    groupParticipants: [],
    showGroupNameError: false,
    showGroupParticipantsError: false,
    modalOpen: false
  }

  findFirstHidden(){
    let first = false;
    this.props.groupChannels.map((window, id) => {
      if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) === "HIDDEN"){
        if(!first){
          first = window.get('id')
        }
      }
    })
    if(!first){
      this.props.openChannels.map((window, id) => {
        if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) === "HIDDEN"){
          if(!first){
            first = window.get('id')
          }
        }
      })
    }
    return first
  }

  handleItemClick = () => {
    this.props.fileRef.click()
  }

  openChannel = () => {
    if(this.props.type === "group"){
      this.props.actions.groupChannelsOpen(this.props.id)
    }
    else if(this.props.type === "open"){
      this.props.actions.openChannelsOpen(this.props.id)
    }
  }

  closeChannel = () => {
    if(this.props.type === "group"){
      this.props.actions.groupChannelsClose(this.props.id)
    }
    else if(this.props.type === "open"){
      this.props.actions.openChannelsClose(this.props.id)
    }
    if(Utility.mobileCheck() && (process.env.REACT_APP_CHATCAMP_LIST_PANEL_SHOW === "FALSE")){
      var el = document.getElementById('cc-app-inner');
      if(el) {
        el.className += ' cc-app-mobile-min';
      }
    }
    if(this.findFirstHidden()){
      if(this.props.groupChannelsState.getIn([this.findFirstHidden(), "type"]) === "group"){
        this.props.actions.groupChannelsOpen(this.findFirstHidden())
      }
      else if(this.props.groupChannelsState.getIn([this.findFirstHidden(), "type"]) === "open"){
        this.props.actions.openChannelsOpen(this.findFirstHidden())
      }
    }
  }
  minimizeChannel = () => {
    if(this.props.type === "group"){
      this.props.actions.groupChannelsMinimize(this.props.id)
    }
    else if(this.props.type === "open"){
      this.props.actions.openChannelsMinimize(this.props.id)
    }
  }

  p2pOtherParticipant = () => {
    let id = this.props.user.get("id")
    let participants = this.props.groupChannels.getIn([this.props.id, 'participants'])
    for(let i in participants){
      if(participants[i].id !== id){
          return participants[i]
      }
    }
  }

  ifPopUp = () => {
    if (this.props.smartChat.get("type") === "popup" || this.props.smartChat.get("type") === "inbox"){
      return true
    }
    else{
      return false
    }
  }

  ifP2P = () => {
    if(this.props.groupChannels.getIn([this.props.id, 'participantsCount'], "0") === 2 && this.props.groupChannels.getIn([this.props.id, 'isDistinct'], false) === true){
      return true
    }
    else{
      return false
    }
  }

  ifPopUpOpen = () => {
    if (this.props.groupChannelsState.getIn([this.props.id, "state"]) === "OPEN"){
      return true
    }
    else{
      return false
    }
  }

  ifPopUpMinimize = () => {
    if (this.props.groupChannelsState.getIn([this.props.id, "state"]) === "MINIMIZE"){
      return true
    }
    else{
      return false
    }
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
    let { groupParticipants} = this.state
    // if(groupName !== ""){
      if(groupParticipants.length > 0){
        // groupParticipants.push(this.props.user.getIn(['id']))
        this.props.actionsGroupChannels.addParticipants({id: this.props.id,  groupParticipants: groupParticipants})
        this.setState({groupParticipants: []})
        this.setState({modalOpen: false})
      }
      else{
        this.setState({showGroupParticipantsError: true})
      }
    // }
    // else{
    //   this.setState({showGroupNameError: true})
    // }
  }

  leaveGroup = () => {
    this.props.actionsGroupChannels.leaveParticipant({id: this.props.id})
  }

  leaveOpen = () => {
    this.props.actions.openChannelsLeave(this.props.id)
  }

  handleGroupChange = (event) => {
    this.setState({showGroupNameError: false})
    this.setState({ [event.target.name]: event.target.value })
  }

  handleParticipantChange = (event, data) => {
    this.setState({showGroupParticipantsError: false})
    this.setState({ [data.name]: data.value })
  }

  handleClose = (event, data) => {
    this.setState({groupName: "", groupParticipants: []})
  }
  buttonClick= () => {
    this.setState({modalOpen: true})
  }
  handleCancel = () => {
    this.setState({groupName: "", groupParticipants: []})
    this.setState({modalOpen: false})
  }

  render () {

    let triggerComponent = <Header.Subheader as='div'>
      {this.props.groupChannels.getIn([this.props.id, 'participantsCount'], "0")} Participants
    </Header.Subheader>
    let embedParticipants = <Popup
      trigger={triggerComponent}
      hideOnScroll
      position='bottom left'
      on='click'
      className="cc-theme">
      <Popup.Header>Participants</Popup.Header>
      <Popup.Content>
        <GroupParticipantsList id={this.props.id} groupChannels={this.props.groupChannels}/>
      </Popup.Content>
    </Popup>

    let triggerComponentPopup = <span className="header-count" >&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<Icon name="user outline"/>{this.props.groupChannels.getIn([this.props.id, 'participantsCount'], "0")}</span>
    let participantsCount = <Popup
      trigger={triggerComponentPopup}
      basic
      hideOnScroll
      position='bottom left'
      on='click'
      className="cc-theme">
      <Popup.Header>Participants</Popup.Header>
      <Popup.Content>
        <GroupParticipantsList id={this.props.id} groupChannels={this.props.groupChannels}/>
      </Popup.Content>
    </Popup>
    let onlineStatus;
    let sourceURL = process.env.PUBLIC_URL + "/"
    // let source_online =  sourceURL + "icons8-connection-status-on-96.png"
    // let source_offline =  sourceURL + "icons8-connection-status-off-96.png"
    let source_status = <ChatCampIcon icon={ICONS.STATUS} height="16px" width="16px" viewBox="0 0 50 50"/>
    // let source_close =  sourceURL + "icons8-delete-64.png"
    let source_close =  <ChatCampIcon icon={ICONS.CLOSE} height="24px" width="24px" viewBox="0 0 50 50"/>
    let source_minus =  <ChatCampIcon icon={ICONS.MINIMIZE} height="24px" width="19px" viewBox="0 0 22 24"/>
    // let source_max =  sourceURL + "icons8-chevron-up-52-white.png"
    let source_max =  <ChatCampIcon icon={ICONS.MAXIMIZE} height="19px" width="19px" viewBox="0 0 24 24"/>
    // let source_hash =  sourceURL + "icons8-hashtag-50.png"
    let source_hash =  <ChatCampIcon icon={ICONS.HASHTAG} height="23px" width="23px" viewBox="0 0 50 50"/>

    // let status = <Image className= "cc-window-header-hash" src={source_hash} />
    let status = <div className= "cc-window-header-hash" >{source_hash}</div>
    let groupChannelName
    if(this.props.type === "open"){
      groupChannelName = this.props.openChannels.getIn([this.props.id, 'name'], "Name")
    }
    else if(this.props.type === "group"){
      groupChannelName = this.props.groupChannels.getIn([this.props.id, 'name'], "Name")
    }

    if(this.ifPopUp() && this.ifP2P()){
      let other = this.p2pOtherParticipant()
      if(other){
        groupChannelName = other.displayName
      }
      if(other && other.isOnline){
        // status = <Icon name="circle" size="large"/>
        // onlineStatus = <Header.Subheader className="cc-window-header-name-subtext" as='div'>{'Available'}</Header.Subheader>
        // status = <Image className= "cc-window-header-status" src={source_online} />
        status = <div className= "cc-window-header-status cc-online">{source_status}</div>
      }
      else {
        // status = <Icon name="circle outline" size="large"/>
        // onlineStatus = <Header.Subheader className="cc-window-header-name-subtext" as='div'>{'Offline'}</Header.Subheader>
        status = <div className= "cc-window-header-status cc-offline">{source_status}</div>
      }

    }

    let options = []
    let { groupParticipants, modalOpen, showGroupParticipantsError } = this.state
    let participantsError = <Message error size={"tiny"}
      header='Atleast one participant must be added to the group'/>
    this.props.userList.map((rosterItem) => {
      if(rosterItem.getIn(['id']) !== this.props.user.getIn(['id'])){
          let id = rosterItem.getIn(['id'])
          let name = rosterItem.getIn(['displayName'])
          // let image = rosterItem.getIn(['avatarUrl'])
          // options.push({key: id, value: id, image: image, text: name  })
          let participants = this.props.groupChannels.getIn([this.props.id, 'participants'])
          let alreadyMember = false;
          for(let i in participants){
            if(participants[i].id === id){
              alreadyMember = true;
            }
          }
          if(!alreadyMember){
            options.push({key: id, value: id, text: name  })
          }
      }
    })

    return (
      <Segment size="tiny" className="window-header">
        <Grid>
          <Grid.Row color="purple" className="cc-chat-window-header">
            <Grid.Column className="cc-window-header-status-main" verticalAlign="middle" width={1}>
              {status}
            </Grid.Column>

            <Grid.Column className="cc-window-header-name" verticalAlign="middle" floated="left" width={10}>
              <Header as='h4'>
                {groupChannelName}
                { (this.props.type === "group") && this.ifPopUp() && !this.ifP2P() && participantsCount}
                {/* {!this.ifPopUp()  && embedParticipants} */}
                {/* {this.ifPopUp() && !this.ifP2P() && embedParticipants} */}
                {/* {this.ifPopUp() && this.ifP2P() && onlineStatus} */}
              </Header>
            </Grid.Column>

            { !Utility.mobileCheck() && this.ifPopUp() && this.ifPopUpOpen() && <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={1}>
              <Popup className="headerSettings"
                    trigger={<div onClick={() => {this.minimizeChannel()}} className= "cc-window-header-minus">{source_minus}</div>}
                    hideOnScroll
                    position='bottom right'
                    on='hover' className="cc-theme cc-tooltips">
                <Popup.Content>
                  Minimize
                </Popup.Content>
              </Popup>
            </Grid.Column>}

            { this.ifPopUp() && (this.ifPopUpMinimize()) && <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={1}>
                  <Popup className="headerSettings"
                    trigger={<div onClick={() => {this.openChannel()}} className= "cc-window-header-max">{source_max}</div>}
                    hideOnScroll
                    position='bottom right'
                    on='hover' className="cc-theme cc-tooltips">
                    <Popup.Content>
                      Maximize
                    </Popup.Content>
                  </Popup>
            </Grid.Column>}

            <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={1}>
                          <Dropdown icon='setting' floating className='icon cc-window-header-settings' direction="left">
                            <Dropdown.Menu className="cc-window-header-settings-options cc-theme">
                              <Dropdown.Item onClick={this.handleItemClick} icon='image' text='Attach a File' />
                              {(this.props.type === "group") && !this.ifP2P() && <Dropdown.Item onClick={this.buttonClick.bind()} icon='add square' text='Add Participants' />}
                              {(this.props.type === "group") &&<Dropdown.Item onClick={this.leaveGroup.bind()} icon='sign out' text='Leave Chat' />}
                              {(this.props.type === "open") &&<Dropdown.Item onClick={this.leaveOpen.bind()} icon='sign out' text='Leave Chat' />}
                            </Dropdown.Menu>
                          </Dropdown>
                  <Modal className="cc-create-group-modal cc-theme" open={modalOpen} size="tiny">
                   <Modal.Header>Add Participants</Modal.Header>
                     <Modal.Content>
                       <Modal.Description>
                         {showGroupParticipantsError && participantsError}
                         <Form>
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
                               Add
                             </Form.Button>
                           </Button.Group>
                           <br/>
                           <br/>
                         </Form>
                       </Modal.Description>
                     </Modal.Content>
                   </Modal>
            </Grid.Column>

            { this.ifPopUp() && <Grid.Column className={"header-actions header-actions-last"} verticalAlign="middle" floated="right" width={Utility.mobileCheck()? 2:1}>

                  <Popup className="headerSettings"
                    trigger={<div onClick={() => {this.closeChannel()}} className= "cc-window-header-close">{source_close}</div>}
                    hideOnScroll
                    position='bottom right'
                    on='hover' className="cc-theme cc-tooltips">
                    <Popup.Content>
                      Close
                    </Popup.Content>
                  </Popup>
            </Grid.Column>}
          </Grid.Row>
        </Grid>
    </Segment>
    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch) ,
    actionsGroupChannels: bindActionCreators(actionsGroupChannels, dispatch),
    actionsUserList: bindActionCreators(actionsUserList, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowHeader)
