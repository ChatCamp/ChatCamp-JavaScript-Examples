import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'

import Window from 'containers/ChatApp/Components/Window'
import LeftPanel from 'containers/ChatApp/Components/LeftPanel'


class InboxView extends Component {

  render () {
    let windows = [];
    let number = 0;
    let id = this.props.groupChannelsState.keySeq().toArray()[0]
    windows.push(<LeftPanel key={"window-left"}/>)
    if(id !== undefined){
      windows.push(<Window key={"window-" + id} id={id} type={"group"} position = {number} state={"open"}/>)
    }

    // this.props.groupChannels.map((window, id) => {
    //   if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== "CLOSE" && this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== undefined && this.props.groupChannelsState.getIn([window.get('id'), "state"]) !== "HIDDEN" ){
    //     if(number < Math.floor(windowWidth/368)){
    //     // if(number < 3){
    //
    //     }
    //     else{
    //       showHidden = true
    //       that.props.actions.groupChannelsHide(window.get('id'))
    //     }
    //   }
    //   else if(this.props.groupChannelsState.getIn([window.get('id'), "state"]) === "HIDDEN") {
    //     showHidden = true
    //   }
    // })

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

export default connect(mapStateToProps, mapDispatchToProps)(InboxView)
