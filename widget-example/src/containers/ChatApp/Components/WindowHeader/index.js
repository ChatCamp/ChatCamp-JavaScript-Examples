import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/smartChat/actions'
import Immutable from 'immutable';
import { Icon, Header, Segment, Grid, Label, Popup, Item, List, Image } from 'semantic-ui-react'
import AvatarWrapper from 'containers/ChatApp/Components/AvatarWrapper'
import UtilityTime from 'utility/UtilityTime'
import './style.css'

import status from 'utility/status'

class WindowHeader extends Component {
  handleItemClick = () => {
    this.props.fileRef.click()
  }
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

    let inlineListStyle = {
      width: "300px"
    }
    let inlineStyleDisplay ={
      display: "table-cell"
    }

    let inlineStyleHeight ={
      lineHeight: "36px"
    }
    let inlineStyleHeightName ={
      lineHeight: "36px",
      maxWidth: "120px",
      whiteSpace: "nowrap",
      overflowX: "hidden"
    }
    let inlineStyleHeightImage ={
      lineHeight: "36px",
      height: "36px",
      position: "relative"
    }

    let getStatusStyle = (statusCode) => {
      return {
        top: "-25px",
        left: "43px",
        position: "relative",
        border: "1px solid",
        borderColor: "#fff",
        backgroundColor: status.getColorFromStatusCode(statusCode)
      }
    }

    return (
    <Segment size="tiny">
      {/* <Header size= "tiny" as='h6'> */}
        <Grid>
          <Grid.Row className="cc-chat-window-header">
            <Grid.Column verticalAlign="middle" width={2}>
              <Icon name="group" size="big"/>
            </Grid.Column>
            <Grid.Column floated="left" width={8}>
              <Header as='h3'>
                 {this.props.groupChannels.getIn([this.props.id, 'name'], "Name")}

                  <Popup
                    trigger={triggerComponent}
                    hideOnScroll
                    position='bottom left'
                    on='click'>
                    <Popup.Header>Participants</Popup.Header>
                    <Popup.Content>

                      <List style={inlineListStyle}>
                        {this.props.groupChannels.getIn([this.props.id, 'participants'], Immutable.Map()).map((user, id) => {
                          return (
                            <List.Item key={"participant-content-list-" + user.id}>


                              {/* <Image as={()=> <AvatarWrapper style={inlineStyleDisplay} className="image" name={rosterItem.userName} />} /> */}
                              <List.Content style={inlineStyleHeightImage} floated='left' verticalAlign='middle'>
                                <Image as={()=> <AvatarWrapper style={inlineStyleDisplay} className="image" name={user.displayName} />}/>
                                {/* <Icon name="circle"/> */}
                                {/* <Label style={getStatusStyle('1')} circular floating empty /> */}
                              </List.Content>

                              <List.Content style={inlineStyleHeightName} verticalAlign='middle' floated="left">
                                <List.Header>{user.displayName}</List.Header>
                              </List.Content>
                              <List.Content style={inlineStyleHeight} floated='right' verticalAlign='middle'>
                                {user.isOnline? <Icon name='circle' color="green" /> : <div>{UtilityTime.getTime('3', user.lastSeen*1000)}</div>}

                              </List.Content>
                            </List.Item>)
                        })}
                      </List>

                    </Popup.Content>
                  </Popup>

              </Header>
            </Grid.Column>

            {minimize}

            <Grid.Column floated="right" width={2}>
              <Popup
                trigger={
                  <Popup
                    trigger={<Icon name="setting" size="big"/>}
                    hideOnScroll
                    position='bottom right'
                    on='click'>
                    <Popup.Content>
                      <List size="large" divided relaxed="very">
                        <List.Item icon='add' content="Attach a File" onClick={this.handleItemClick}></List.Item>
                        <List.Item icon='image' content="Attach Media" onClick={this.handleItemClick}></List.Item>
                      </List>
                    </Popup.Content>
                  </Popup>
                }
                content='Hello. This is an inverted popup'
                inverted
              />
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
