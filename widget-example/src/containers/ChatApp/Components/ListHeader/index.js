import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Image, Segment, Popup } from 'semantic-ui-react'

class ListHeader extends Component {

  state = {
    fileRef: null
  }

  ifPopUp = () => {
    if (this.props.smartChat.get("type") === "popup" || this.props.smartChat.get("type") === "inbox"){
      return true
    }
    else{
      return false
    }
  }
  closeSmartChat = () => {
    this.props.actions.smartChatClose()
  }

  render () {
    let sourceURL = process.env.PUBLIC_URL + "/"
    let source =  sourceURL + "icons8-sms-100.png"
    let source_close =  sourceURL + "icons8-delete-64.png"

   return(
     <Segment className="cc-list-header cc-widget">
       <Image className="cc-list-header-image" size="tiny" src={source} />
        <div className="cc-list-header-text">My Chats</div>
        { this.ifPopUp() && <div className={"cc-list-header-actions"}>
          <Popup className="headerSettings"
            trigger={<Image onClick={() => {this.closeSmartChat()}} className= "cc-list-header-close" src={source_close} />}
            hideOnScroll
            position='bottom right'
            on='hover' inverted>
            <Popup.Content>
              Close
            </Popup.Content>
          </Popup>
        </div>}
     </Segment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader)
