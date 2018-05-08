import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannelsState/actions'
import * as actions1 from 'state/groupChannels/actions'
import * as smartChatActions from 'state/smartChat/actions'
import { Image } from 'semantic-ui-react'

class WelcomeBubble extends Component {

  state = {
  }
  startChat(){
    this.props.smartChatActions.smartChatOpen()
  }

  render () {
    let sourceURL = "http://localhost:3000/"
    let source =  sourceURL + "icons8-sms-100.png"
    let source_close = sourceURL + "icons8-delete-100.png"


    return (
      <div style={{right: "40px"}} onClick={()=>(this.startChat())}className="chatcamp-welcome-bubble">
        {/* <div className="chatcamp-wb-left">
          <div className="chatcamp-wb-left-text">How can I help you today?</div>
        </div>
        <div className="chatcamp-wb-close">
          <Image className="chatcamp-wb-right-icon" src={source_close}/>
        </div> */}
        <div className="chatcamp-wb-right">
          <Image className="chatcamp-wb-right-image" src={source}/>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    actions1: bindActionCreators(actions1, dispatch),
    smartChatActions: bindActionCreators(smartChatActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBubble)
