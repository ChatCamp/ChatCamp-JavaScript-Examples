import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Icon, Header, Segment, Grid, Label } from 'semantic-ui-react'
import './style.css'

import status from 'utility/status'

class WindowHeader extends Component {

  render () {
    let statusColor ={
      color: status.getColorFromStatusCode(this.props.headerStatus)
    }

    let statusSign = 'circle';
    if(this.props.type === 'room'){
      statusSign = 'hashtag'
    }
    let minimize;

    return (
    <Segment size="tiny">
      {/* <Header size= "tiny" as='h6'> */}
        <Grid>
          <Grid.Row color="red">
            <Grid.Column width={2} >
              {/* <Label style={statusColor} circular empty /> */}
              <Icon style={statusColor} name={statusSign}/>
            </Grid.Column>
            <Grid.Column floated="left" width={10}>
              {this.props.groupChannels.getIn([this.props.id, 'name'], "Name")} ({this.props.groupChannels.getIn([this.props.id, 'participantsCount'], "0")})
            </Grid.Column>
            {minimize}

            <Grid.Column floated="left" width={1}>

            </Grid.Column>
          </Grid.Row>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(WindowHeader)
