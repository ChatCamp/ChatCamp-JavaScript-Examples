import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'

import Window from 'containers/ChatApp/Components/Window'


class SmartChat extends Component {

  render () {
    let windows = [];
    let number = 0

    this.props.groupChannels.map((window, id) => {
      if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== "CLOSE" ){
        windows.push(<Window key={"window-" + window.get('id')} id={window.get('id')} type={"group"} position = {number++} state={"open"}/>)
      }
    })

    return (
      <div id="ifc-app">
        {windows}
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
