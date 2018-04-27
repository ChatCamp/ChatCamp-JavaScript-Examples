import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Header, Image, Segment } from 'semantic-ui-react'

class ListHeader extends Component {

  state = {
    fileRef: null
  }

  render () {
    let sourceURL = process.env.PUBLIC_URL + "/"
    let source =  sourceURL + "icons8-sms-100.png"

   return(
     <Segment className="cc-list-header cc-widget">
       <Image className="cc-list-header-image" size="tiny" src={source} />
       {/* <Header as='h5'> */}
          <div className="cc-list-header-text">My Chats</div>
        {/* </Header> */}
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
