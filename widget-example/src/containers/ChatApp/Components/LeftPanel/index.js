import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Accordion, Tab } from 'semantic-ui-react'
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
   const chatrooms = this.props.openChannels.size

  //  panels.push({title: "CHATROOMS " + "(" + getTotalRooms + ")", content: {content: ("hello"), key: "rooms" }})
  const panes = [
  { menuItem: "RECENT " + "(" + getInboxSize + ")", render: () => <Tab.Pane className="chatcamp-list-roster-horizontal-item"><Roster type="inbox"/></Tab.Pane> },
  { menuItem: "ROOMS " + "(" + chatrooms + ")", render: () => <Tab.Pane className="chatcamp-list-roster-horizontal-item"><Roster type="chatrooms"/></Tab.Pane> },
  { menuItem: "USERS " + "(" + getOnlineUsersCount + ")", render: () => <Tab.Pane className="chatcamp-list-roster-horizontal-item"><Roster type="users"/></Tab.Pane> },
]

  // panels.push({title: "CHATROOMS " + "(" + chatrooms + ")", content: {content: (<Roster type="chatrooms"/>), key: "chatroom" }})
  //
  //  panels.push({title: "RECENT CHATS " + "(" + getInboxSize + ")", content: {content: (<Roster type="inbox"/>), key: "inbox" }})
  //
  //  panels.push({title: "USERS " + "(" + getOnlineUsersCount + ")", content: {content: (<Roster type="users"/>), key: "users" }})

   return(
     <div className="chatcamp-left-panel cc-smart-chat-panel">

       <ListHeader />
        <Tab panes={panes} className="chatcamp-list-roster-horizontal" menu={{ secondary: true, pointing: true }} />
         {/* <Accordion className="chatcamp-list-roster cc-left-panel-inbox" defaultActiveIndex={[0,1,2]} panels={panels} exclusive={false} fluid /> */}

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
