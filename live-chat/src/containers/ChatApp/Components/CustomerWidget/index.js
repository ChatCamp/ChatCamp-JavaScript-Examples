import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'

import Window from 'containers/ChatApp/Components/Window'
import WelcomeBubble from 'containers/ChatApp/Components/WelcomeBubble'
import HiddenChatWindow from 'containers/ChatApp/Components/HiddenChatWindow'


class CustomerWidget extends Component {

  render () {
    let windows = [];
    let number = 0;
    let showHidden = true
    this.props.groupChannels.map((window, id) => {
      if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== "CLOSE" && this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== undefined && this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== "HIDDEN" ){
        windows.push(<Window key={"window-" + window.get('id')} id={window.get('id')} type={"group"} position = {number} state={"open"}/>)
        showHidden = false
      }
      else if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) === "HIDDEN") {
        showHidden = true
      }
    })

    return (
      <div id="ifc-app">
        {!showHidden && windows}
        {showHidden && <WelcomeBubble />}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerWidget)
