import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import { Icon, Header, Segment, Grid, Label, Popup, Item } from 'semantic-ui-react'
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

    let triggerComponent = <Header.Subheader as='div'>
      {this.props.groupChannels.getIn([this.props.id, 'participantsCount'], "0")} Participants
    </Header.Subheader>

    return (
    <Segment size="tiny">
      {/* <Header size= "tiny" as='h6'> */}
        <Grid>
          <Grid.Row color="red">
            <Grid.Column floated="left" width={10}>
              <Header as='h3'>
                # {this.props.groupChannels.getIn([this.props.id, 'name'], "Name")}

                  <Popup
                    trigger={triggerComponent}
                    hideOnScroll
                    position='bottom left'
                    on='click'>
                    <Popup.Header>Participants</Popup.Header>
                    <Popup.Content>
                      {this.props.groupChannels.getIn([this.props.id, 'participants']).map((user, id) => {
                        return (<Item key={"participant-content-list-" + user.id}>{user.display_name}</Item>)
                      })}
                    </Popup.Content>
                  </Popup>

              </Header>
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
