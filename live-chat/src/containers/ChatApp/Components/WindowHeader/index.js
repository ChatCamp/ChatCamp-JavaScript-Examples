import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'
import { Icon, Header, Segment, Grid, Popup, Image} from 'semantic-ui-react'
import './style.css'
import GroupParticipantsList from 'containers/ChatApp/Components/GroupParticipantsList'


class WindowHeader extends Component {
  state = {
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
    return first
  }

  handleItemClick = () => {
    this.props.fileRef.click()
  }

  openChannel = () => {
    this.props.actions.groupChannelsOpen(this.props.id)
  }

  closeChannel = () => {
    this.props.actions.groupChannelsClose(this.props.id)
    if(this.findFirstHidden()){
      this.props.actions.groupChannelsOpen(this.findFirstHidden())
    }
  }
  minimizeChannel = () => {
    this.props.actions.groupChannelsMinimize(this.props.id)
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
    if (this.props.smartChat.get("type") === "popup"){
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

  render () {

    let triggerComponent = <Header.Subheader as='div'>
      {this.props.groupChannels.getIn([this.props.id, 'participantsCount'], "0")} Participants
    </Header.Subheader>

    let embedParticipants = <Popup
      trigger={triggerComponent}
      hideOnScroll
      position='bottom left'
      on='click'>
      <Popup.Header>Participants</Popup.Header>
      <Popup.Content>
        <GroupParticipantsList id={this.props.id} groupChannels={this.props.groupChannels}/>
      </Popup.Content>
    </Popup>

    let triggerComponentPopup = <span className="header-count" >&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<Icon name="user outline"/>{this.props.groupChannels.getIn([this.props.id, 'participantsCount'], "0")}</span>
    let participantsCount = <Popup
      trigger={triggerComponentPopup}
      hideOnScroll
      position='bottom left'
      on='click'>
      <Popup.Header>Participants</Popup.Header>
      <Popup.Content>
        <GroupParticipantsList id={this.props.id} groupChannels={this.props.groupChannels}/>
      </Popup.Content>
    </Popup>

    let sourceURL = "http://localhost:3000/"
    let source =  sourceURL + "icons8-sms-100.png"
    let source_close = sourceURL + "icons8-delete-100-white.png"
    let groupChannelName = this.props.groupChannels.getIn([this.props.id, 'name'], "Name")
    if(this.ifPopUp() && this.ifP2P()){
      let other = this.p2pOtherParticipant()
      groupChannelName = other.displayName


    }

    return (
      <Segment size="small" className="window-header">
        <Grid>
          <Grid.Row className="cc-chat-window-header">
            <Grid.Column verticalAlign="middle" width={3}>
              <Image className="chatcamp-widget-top-brand" src={source}/>
            </Grid.Column>

            <Grid.Column verticalAlign="middle" floated="left" width={10}>
              <Header className= "cc-primary-text" as='h3'>
                {/* {groupChannelName}
                { this.ifPopUp() && !this.ifP2P() && participantsCount}
                {!this.ifPopUp()  && embedParticipants} */}
                Chat With Us!
              </Header>
            </Grid.Column>


            { this.ifPopUp() && <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={2}>

                  <Popup className="headerSettings"
                    trigger={<Icon onClick={() => {this.closeChannel()}} name="close" size="large"/>}
                    trigger={<Image onClick={() => {this.closeChannel()}} className="chatcamp-widget-top-close" src={source_close}/>}
                    hideOnScroll
                    position='bottom right'
                    on='hover' inverted>
                    <Popup.Content>
                      Close
                    </Popup.Content>
                  </Popup>
            </Grid.Column>}
          </Grid.Row>
          <Grid.Row className="cc-chat-window-header-secondary">
            <Header className= "cc-secondary-text" as='h4'>Our support rockstars are here for you.</Header>
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
    actions: bindActionCreators(actions, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowHeader)
