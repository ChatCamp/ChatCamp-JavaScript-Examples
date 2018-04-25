import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Image, Segment } from 'semantic-ui-react'

class ListBranding extends Component {

  state = {
    fileRef: null
  }

  render () {


   return(
     <Segment>
       <Image src='https://happyeasygo.com/static/images/logo.png' size='large' />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListBranding)
