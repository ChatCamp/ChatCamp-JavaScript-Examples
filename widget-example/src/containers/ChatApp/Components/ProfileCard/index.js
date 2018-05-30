import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
import AvatarWrapper from 'containers/ChatApp/Components/AvatarWrapper'
import { Grid, Icon, Image } from 'semantic-ui-react'
import UtilityTime from 'utility/UtilityTime'
import Immutable from 'immutable';
import _ from 'lodash'


class ProfileCard extends Component {
  state = {

  }
  constructor(props,context){
    super(props,context);
  }


  render () {
    let {userM} = this.props
      return (
        <Grid className={"cc-user-profile-grid"} style={{width: "300px"}}>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image as={()=> <AvatarWrapper className="image" name={userM.getIn(["displayName"])} src = {userM.getIn(["avatarUrl"])} size={30} />}/>
          </Grid.Column>
          <Grid.Column width={6} verticalAlign='middle'>
            {userM.getIn(["displayName"])}
          </Grid.Column>
          {/*  show admin from metadata*/}
          <Grid.Column width={1} verticalAlign='middle' floated="left">
            { this.props.groupChannels.getIn([this.props.id, 'metadata'], Immutable.Map()) && this.props.groupChannels.getIn([this.props.id, 'metadata'], Immutable.Map()).admins &&  _.includes(JSON.parse(this.props.groupChannels.getIn([this.props.id, 'metadata'], Immutable.Map()).admins), userM.get("id")) && <Icon name="check circle outline" color="black"/>}
          </Grid.Column>
          <Grid.Column width={5} verticalAlign='middle'>
            {userM.get("isOnline", false)? <Icon style={{"float": "right"}} name='circle' color="green" /> : <div>{userM.get("lastSeen") === 0? "Not Joined":UtilityTime.getTime('3',userM.get("lastSeen")*1000)}</div>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)
