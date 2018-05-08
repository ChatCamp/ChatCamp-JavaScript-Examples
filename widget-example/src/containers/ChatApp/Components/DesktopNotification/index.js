import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
import client from 'Client'


class DesktopNotification extends Component {
  state = {
    groupChannelId: ''
  }

  componentDidMount(){
    if (typeof Notification !== 'undefined') {
          Notification.requestPermission(function(result) {
          if (result === 'granted') {
          }
          else if (result === 'denied') {
          }
        });
      }
    let {groupChannelId, user} =  this.props
    let channelListener = new client.ChannelListener();
    channelListener.onGroupChannelMessageReceived = function(groupChannel, message) {
      if(groupChannelId === groupChannel.id){
        if(user.get("id") !== message.user.id){
          if(document.hasFocus() === false) {
            if(typeof Notification !== 'undefined') {
              let notificationRoom = new Notification(groupChannel.name, {
                icon: groupChannel.avatarUrl,
                body: message.user.displayName + ": " + message.text
              });
            }
          }
        }
      }
    }
    client.addChannelListener("DesktopNotification", channelListener)
  }

  render() {

    return (
      null
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

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNotification)
