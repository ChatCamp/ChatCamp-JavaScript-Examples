import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'

import Window from 'containers/ChatApp/Components/Window'


class SmartChat extends Component {

  render () {
    let windows = [];


    this.props.groupChannels.map((window, id) => {
      windows.push(<Window key={"window-" + window.get('id')} id={window.get('id')} type={"group"} state={"open"}/>)
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
