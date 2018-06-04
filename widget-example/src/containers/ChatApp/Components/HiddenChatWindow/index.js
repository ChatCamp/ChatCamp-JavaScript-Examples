import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'
import { Button, Popup, List } from 'semantic-ui-react'

class HiddenChatWindow extends Component {

  state = {
    cacheMessages : {},
    isLoading: false,
    modalMountNode: ""
  }

  componentWillMount(){
    let node = document.getElementById("ifc-app")
    this.setState({modalMountNode: node})
  }

  findLast(){
    let last = {};
    this.props.groupChannelsState.map((chatwindow, id) => {
      if(chatwindow.getIn(["state"]) === "OPEN"){
        if(chatwindow.getIn(["type"]) === "open"){
          last.id = id;
          last.type =  "open";
        }
        else if (chatwindow.getIn(["type"]) === "group"){
          last.id = id;
          last.type = "group";
        }
      }
    })
    return last
  }

  itemClick = (clickedID, chatWindow) => {
    let last = this.findLast();
    if(last.type === "open"){
      this.props.actions.openChannelsHide(last.id)
    }
    else if(last.type === "group"){
      this.props.actions.groupChannelsHide(last.id)
    }
    if(chatWindow.getIn(["type"]) === "open"){
      this.props.actions.openChannelsOpen(clickedID)
    }
    else if(chatWindow.getIn(["type"]) === "group"){
      this.props.actions.groupChannelsOpen(clickedID)
    }
  }

  getName(id, chatWindow){
    // let name;
    if(chatWindow.getIn(["type"]) === "open"){
      return  this.props.openChannels.getIn([id, "name"])
    }
    else if(chatWindow.getIn(["type"]) === "group"){
      let groupChannels = this.props.groupChannels
      if( (groupChannels.getIn([id, "participantsCount"]) === 2 )&& (groupChannels.getIn([id, "isDistinct"]) === true)){
        let userId = this.props.user.get("id")
        let participants = this.props.groupChannels.getIn([id, "participants"])
        for(let i in participants){
          if(participants[i].id !== userId){
            return participants[i].displayName
          }
        }
      }
      else{
        return this.props.groupChannels.getIn([id, "name"])
        
      }
    }

    // return name
  }

  render () {
    let hiddenWindows = []
    this.props.groupChannelsState.map((chatWindow, id) => {
      if(chatWindow.getIn(["state"]) === "HIDDEN" ){
        hiddenWindows.push(<List.Item onClick = {() => {this.itemClick(id, chatWindow)}} key={"participant-content-list-" + id}><List.Content verticalAlign='middle' floated="left"><List.Header>{this.getName(id, chatWindow)}</List.Header></List.Content></List.Item>)
      }
    })

    let finalData = <List>
      {hiddenWindows}
    </List>

    let popupRightAdjustment = "0";
    let mainClass = "chatcamp-popup-hidden cc-theme";
    if(this.props.smartChat.get("type") === "popup"){
      popupRightAdjustment = String(345*this.props.position + 20*(this.props.position + 1)) + "px"
    }
    return (
      <Popup hoverable trigger={<Button style={{right: popupRightAdjustment}} className={mainClass} icon='comment' />} content={finalData } className="cc-theme"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HiddenChatWindow)
