import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Accordion, Segment } from 'semantic-ui-react'
import Roster from 'containers/ChatApp/Components/Roster'
import ListHeader from 'containers/ChatApp/Components/ListHeader'

// import './style.css'

class LeftPanel extends Component {

  state = {
    fileRef: null
  }

  render () {
   // const { getTotalRooms, getOnlineUsersCount } = this.props
   const panels = []
   const getInboxSize = this.props.groupChannelsList.size
   const getOnlineUsersCount = this.props.userList.size

  //  panels.push({title: "CHATROOMS " + "(" + getTotalRooms + ")", content: {content: ("hello"), key: "rooms" }})
  console.log("in panel")
   panels.push({title: "RECENT CHATS " + "(" + getInboxSize + ")", content: {content: (<Roster type="inbox"/>), key: "inbox" }})

   panels.push({title: "USERS " + "(" + getOnlineUsersCount + ")", content: {content: (<Roster type="users"/>), key: "users" }})

   return(
     <div className="chatcamp-left-panel cc-smart-chat-panel">

       <ListHeader />

         <Accordion className="chatcamp-list-roster cc-left-panel-inbox" defaultActiveIndex={[0,1,2]} panels={panels} exclusive={false} fluid />

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

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel)
