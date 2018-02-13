import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'
import { Icon, Header, Segment, Grid, Popup, List} from 'semantic-ui-react'
import './style.css'
import GroupParticipantsList from 'containers/ChatApp/Components/GroupParticipantsList'


class WindowHeader extends Component {
  state = {
  }

  handleItemClick = () => {
    this.props.fileRef.click()
  }

  openChannel = () => {
    this.props.actions.groupChannelsOpen(this.props.id)
  }

  closeChannel = () => {
    this.props.actions.groupChannelsClose(this.props.id)
  }
  minimizeChannel = () => {
    this.props.actions.groupChannelsMinimize(this.props.id)
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
    if(this.props.groupChannels.getIn([this.props.id, 'participantsCount'], "0") === 2){
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

    let participantsCount = <span className="header-count" >&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<Icon name="user outline"/>2</span>

    let groupChannelName = this.props.groupChannels.getIn([this.props.id, 'name'], "Name")

    return (
      <Segment size="tiny" className="window-header">
        <Grid>
          <Grid.Row color="purple" className="cc-chat-window-header">
            <Grid.Column verticalAlign="middle" width={1}>
              <Header as="h3">#</Header>
            </Grid.Column>

            <Grid.Column verticalAlign="middle" floated="left" width={11}>
              <Header as='h3'>
                {groupChannelName}
                { this.ifPopUp() && !this.ifP2P() && participantsCount}
                {!this.ifPopUp()  && embedParticipants}
              </Header>
            </Grid.Column>

            { this.ifPopUp() && this.ifPopUpOpen() && <Grid.Column className={"header-actions"} verticalAlign="middle" floated="right" width={1}>
              <Popup className="headerSettings"
                    trigger={<Icon onClick={() => {this.minimizeChannel()}} name="minus" size="large"/>}
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
                    trigger={<Icon onClick={() => {this.openChannel()}} name="chevron up" size="large"/>}
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
                    trigger={<Icon onClick={() => {this.closeChannel()}} name="close" size="large"/>}
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
