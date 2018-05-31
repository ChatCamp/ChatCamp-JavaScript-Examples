import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
import { Icon, List, Image} from 'semantic-ui-react'
import _ from 'lodash'
import Immutable from 'immutable';
import AvatarWrapper from 'containers/ChatApp/Components/AvatarWrapper'
import UtilityTime from 'utility/UtilityTime'
import ChatCampIcon from 'containers/ChatApp/Components/ChatCampIcon'
import {ICONS} from 'constants/icons'

class GroupParticipantsList extends Component {

  state = {

  }

  render () {

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
      maxWidth: "140px",
      whiteSpace: "nowrap",
      overflowX: "hidden"
    }
    let inlineStyleHeightNameAdmin ={
      lineHeight: "36px",
      maxWidth: "20px",
      whiteSpace: "nowrap",
      overflowX: "hidden",
      fontSize:"17px"
    }
    let inlineStyleHeightImage ={
      lineHeight: "36px",
      height: "36px",
      position: "relative"
    }

    return (
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
              {/*  show admin from metadata*/}
              { this.props.groupChannels.getIn([this.props.id, 'metadata'], Immutable.Map()) && this.props.groupChannels.getIn([this.props.id, 'metadata'], Immutable.Map()).admins &&  _.includes(JSON.parse(this.props.groupChannels.getIn([this.props.id, 'metadata'], Immutable.Map()).admins), user.id) && <List.Content style={inlineStyleHeightNameAdmin} verticalAlign='middle' floated="left">
                <Icon name="check circle outline" color="black"/>
              </List.Content>}
              <List.Content style={inlineStyleHeight} floated='right' verticalAlign='middle'>
                {user.isOnline? <Icon name='circle' color="green" /> : <div>{user.lastSeen === 0? "Not Joined":UtilityTime.getTime('3', user.lastSeen*1000)}</div>}

              </List.Content>
            </List.Item>)
        })}
      </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupParticipantsList)
