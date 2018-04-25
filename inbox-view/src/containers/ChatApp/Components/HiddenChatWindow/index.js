import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'
import * as actionsG from 'state/groupChannels/actions'
import { Button, Popup, List, Label, Icon, Menu } from 'semantic-ui-react'

class HiddenChatWindow extends Component {

  state = {
    cacheMessages : {},
    isLoading: false
  }

  findLast(){
    let last;
    this.props.groupChannels.map((window, id) => {
      if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) === "OPEN"){
        last = window.get('id')
      }
    })
    return last
  }

  itemClick = (clickedID) => {
    let last = this.findLast()
    this.props.actions.groupChannelsHide(last)
    this.props.actions.groupChannelsOpen(clickedID)
    console.log("heeeeeeeee")
    this.props.actionsG.read(clickedID)
  }

  getName(window){
    let name;
    if(window.get('participantsCount') === 2 && window.get('isDistinct') === true){
      let id = this.props.user.get("id")
      let participants = window.get('participants')
      for(let i in participants){
        if(participants[i].id !== id){
            name = participants[i].displayName
        }
      }
    }
    else{
      name = window.get('name')
    }
    return name
  }

  render () {
    let hiddenWindows = []
    let totalUnread = 0
    this.props.groupChannels.map((window, id) => {
      if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) === "HIDDEN" ){
        hiddenWindows.push(<List.Item onClick = {() => {this.itemClick(window.get('id'))}} key={"participant-content-list-" + window.get('id')}><List.Content verticalAlign='middle' floated="left"><List.Header>{this.getName(window)}</List.Header></List.Content></List.Item>)
        if(this.props.groupChannels.getIn([window.get('id'), "unreadMessageCount"]) > 0 ){
          totalUnread ++
        }
      }
    })

    let finalData = <List>
      {hiddenWindows}
    </List>

    let popupRightAdjustment = "0";
    let mainClass = "chatcamp-popup-hidden";
    if(this.props.smartChat.get("type") === "popup"){
      popupRightAdjustment = String(345*this.props.position + 20*(this.props.position + 1)) + "px"
    }
    // let triggerContent = <Button style={{right: popupRightAdjustment}} className={mainClass} icon='comment' />
    let triggerContent =  <Menu style={{right: popupRightAdjustment}} className={mainClass} compact>
      <Menu.Item as='a'>
        <Icon name='mail' />
      </Menu.Item>
    </Menu>
    if(totalUnread > 0){
      triggerContent = <Menu style={{right: popupRightAdjustment}} className={mainClass} compact>
        <Menu.Item as='a'>
          <Icon name='mail' />
          <Label color='red' floating>{totalUnread}</Label>
        </Menu.Item>
      </Menu>
    }
    return (
      <Popup hoverable trigger={triggerContent} content={finalData}/>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch), //binds all the actions with dispatcher and returns them
    actionsG: bindActionCreators(actionsG, dispatch) //binds all the actions with dispatcher and returns them
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HiddenChatWindow)
