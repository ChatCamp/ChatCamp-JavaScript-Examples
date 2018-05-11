import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'

class ReadReceipt extends Component {

  state = {
    svgSingle : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="10" height="15"><path fill="#92A58C" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>,
    svgDouble: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="10" height="15"><path fill="#92A58C" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
  }

  ifReadByAll(){
    let messageTime = this.props.message.get("insertedAt")
    let currentId = this.props.user.get('id')
    let read = this.props.groupChannels.getIn([this.props.groupChannelId, 'readReceipt'])
    let flag = true
    Object.keys(read).forEach(function(key,index) {
      if(key !== currentId){
        if( messageTime > read[key]){
          flag = false
        }
      }
    })
    return flag
  }

  render () {

    return (
      <div className="message-read-receipt">{this.ifReadByAll()?this.state.svgDouble: this.state.svgSingle}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReadReceipt)
