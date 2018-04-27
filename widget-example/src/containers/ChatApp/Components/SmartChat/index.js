import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'

import Window from 'containers/ChatApp/Components/Window'
import LeftPanel from 'containers/ChatApp/Components/LeftPanel'
import HiddenChatWindow from 'containers/ChatApp/Components/HiddenChatWindow'


class SmartChat extends Component {

  render () {
    let windows = [];
    let number = 1;
    let showHidden = false
    let windowWidth = window.innerWidth
    let that = this
    windows.push(<LeftPanel key={"window-left"}/>)
    this.props.groupChannels.map((window, id) => {
      if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== "CLOSE" && this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== undefined && this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== "HIDDEN" ){
        if(number < Math.floor(windowWidth/368)){
        // if(number < 3){
          windows.push(<Window key={"window-" + window.get('id')} id={window.get('id')} type={"group"} position = {number++} state={"open"}/>)
        }
        else{
          showHidden = true
          that.props.actions.groupChannelsHide(window.get('id'))
        }
      }
      else if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) === "HIDDEN") {
        showHidden = true
      }
    })
    console.log("windows", windows)
    return (
      <div id="ifc-app">
        {/* <LeftPanel key={"1"}/> */}
        {windows}
        {showHidden && <HiddenChatWindow position={Math.floor(windowWidth/368)} />}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SmartChat)
