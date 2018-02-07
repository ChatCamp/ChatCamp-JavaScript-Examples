import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Segment } from 'semantic-ui-react'

// import FrameWrapper from 'containers/ChatApp/Components/FrameWrapper'
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
    let frame = []
    let customClass = "ifc-chat-frame-window"
    let visibleContent = null;
    let visibleFooter = null;
    if(!this.props.loading) {
      if(this.props.state === "open" ){
        visibleContent = <WindowContent id = {this.props.id} type = {this.props.type} state = {this.props.state} />
        visibleFooter = <WindowFooter id = {this.props.id} type = {this.props.type} setFileRef = {(ref) => {this.setState({fileRef: ref})}} />
      }
      if(this.props.state === "minimize"){
        customClass = customClass + " ifc-chat-frame-window-min"
      }

      frameContent.push(
        <Segment.Group key={"window-data-" + this.props.id} size="tiny" className={"ifc-chat-window"}>
          <WindowHeader id = {this.props.id} type = {this.props.type} state = {this.props.state} fileRef = {this.state.fileRef}/>
          {visibleContent}
          {visibleFooter}
        </Segment.Group>
      )


    }
    return (
      <div className={"ifc-chat-window-container"}>{frameContent}</div>
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
