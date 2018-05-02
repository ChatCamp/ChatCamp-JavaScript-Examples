import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'
import { Icon, Header, Segment, Grid, Popup, List, Image} from 'semantic-ui-react'
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
    let onlineStatus;
    let sourceURL = process.env.PUBLIC_URL + "/"
    let source_online =  sourceURL + "icons8-connection-status-on-96.png"
    let source_offline =  sourceURL + "icons8-connection-status-off-96.png"
    let source_close =  sourceURL + "icons8-delete-64.png"
    let source_minus =  sourceURL + "icons8-minus-48-white.png"
    let source_max =  sourceURL + "icons8-chevron-up-52-white.png"
    let source_hash =  sourceURL + "icons8-hashtag-50.png"
    // let status = <Header as="h3">#</Header>
    let status = <Image className= "cc-window-header-hash" src={source_hash} />
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
        onlineStatus = <Header.Subheader className="cc-window-header-name-subtext" as='div'>{'Available'}</Header.Subheader>
        status = <Image className= "cc-window-header-status" src={source_online} />
      }
      else {
        // status = <Icon name="circle outline" size="large"/>
        onlineStatus = <Header.Subheader className="cc-window-header-name-subtext" as='div'>{'Offline'}</Header.Subheader>
        status = <Image className= "cc-window-header-status" src={source_offline} />
      }

    }

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

            {  this.ifPopUp() && this.ifPopUpOpen() && <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={1}>
              <Popup className="headerSettings"
                    trigger={<Image onClick={() => {this.minimizeChannel()}} className= "cc-window-header-minus" src={source_minus} />}
                    hideOnScroll
                    position='bottom right'
                    on='hover' inverted>
                <Popup.Content>
                  Minimize
                </Popup.Content>
              </Popup>
            </Grid.Column>}

            { this.ifPopUp() && (this.ifPopUpMinimize()) && <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={1}>
                  <Popup className="headerSettings"
                    trigger={<Image onClick={() => {this.openChannel()}} className= "cc-window-header-max" src={source_max} />}
                    hideOnScroll
                    position='bottom right'
                    on='hover' inverted>
                    <Popup.Content>
                      Maximize
                    </Popup.Content>
                  </Popup>
            </Grid.Column>}

            <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={1}>
                  <Popup className="headerSettings"
                    trigger={<Icon name="setting" size="large"/>}
                    hideOnScroll
                    position='bottom right'
                    on='click'>
                    <Popup.Content>
                      <List size="large" divided relaxed="very">
                        <List.Item icon='add' content="Attach a File" onClick={this.handleItemClick}></List.Item>
                        <List.Item icon='image' content="Attach Media" onClick={this.handleItemClick}></List.Item>
                      </List>
                    </Popup.Content>
                  </Popup>
            </Grid.Column>

            { this.ifPopUp() && <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={1}>

                  <Popup className="headerSettings"
                    trigger={<Image onClick={() => {this.closeChannel()}} className= "cc-window-header-close" src={source_close} />}
                    hideOnScroll
                    position='bottom right'
                    on='hover' inverted>
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
    actions: bindActionCreators(actions, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowHeader)
