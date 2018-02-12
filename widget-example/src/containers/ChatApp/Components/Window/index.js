import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Segment } from 'semantic-ui-react'
import WindowHeader from 'containers/ChatApp/Components/WindowHeader'
import WindowContent from 'containers/ChatApp/Components/WindowContent'
import WindowFooter from 'containers/ChatApp/Components/WindowFooter'
import './style.css'

class Window extends Component {

  state = {
    fileRef: null
  }

  render () {
    let frameContent = []
    let popupRightAdjustment = "0";
    let customClass = "ifc-chat-frame-window"
    let visibleContent = null;
    let visibleFooter = null;
    let mainClass = "ifc-chat-window-container";

    //only for popup chat
    if(this.props.smartChat.get("type") === "popup"){
      popupRightAdjustment = String(345*this.props.position + 20*(this.props.position + 1)) + "px"
      mainClass = "chatcamp-popup ifc-chat-window-container";
      if(this.props.groupChannelsState.getIn([this.props.id, "state"]) === "MINIMIZE"){
        mainClass = "chatcamp-popup ifc-chat-window-container chatcamp-popup-minimize";

      }
    }

    if(!this.props.loading) {
      if(this.props.groupChannelsState.getIn([this.props.id, "state"]) === "OPEN" ){

        visibleContent = <WindowContent id = {this.props.id} type = {this.props.type} state = {this.props.state} />
        visibleFooter = <WindowFooter id = {this.props.id} type = {this.props.type} setFileRef = {(ref) => {this.setState({fileRef: ref})}} />
      }
      if(this.props.state === "minimize"){
        customClass = customClass + " ifc-chat-frame-window-min"
      }
    if(this.props.groupChannelsState.getIn([this.props.id, "state"]) !== "CLOSE" ){
      frameContent.push(
        <Segment.Group key={"window-data-" + this.props.id} size="tiny" className={"ifc-chat-window"}>
          <WindowHeader id = {this.props.id} type = {this.props.type} state = {this.props.state} fileRef = {this.state.fileRef}/>
          {visibleContent}
          {visibleFooter}
        </Segment.Group>
      )
    }

    }
    return (
      <div style={{right: popupRightAdjustment}} className={mainClass}>{frameContent}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Window)
