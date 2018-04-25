import React, { Component } from 'react'
import { Dropdown, Grid, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'

class CannedResponse extends Component {
  state = {
    canned_response: ''
  }

  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value })
    this.props.actions.userMessage(this.props.id, value)
  }

  render() {

    let options = [
      {
        key: 'I am in a meeting',
        text: 'I am in a meeting',
        value: 'I am in a meeting',
      },
      {
        key: 'I will join shortly',
        text: 'I will join shortly',
        value: 'I will join shortly',
      },
      {
        key: 'I am on my way',
        text: 'I am on my way',
        value: 'I am on my way',
      }
    ]

    return (
      <Grid.Column width={1}>

        <Popup
          trigger={<Dropdown
                      name="canned_response"
                      icon="wizard"
                      upward>
                      <Dropdown.Menu>
                        <Dropdown.Header content='Canned Responses' />
                        {options.map(option => <Dropdown.Item onClick={this.handleChange} {...option} />)}
                      </Dropdown.Menu>
                    </Dropdown>}
                    content='Canned Responses'
                    inverted
        />
        {/* <Dropdown
          name="canned_response"
          icon="wizard"
          upward>
          <Dropdown.Menu>
            <Dropdown.Header content='Canned Responses' />
            {options.map(option => <Dropdown.Item onClick={this.handleChange} {...option} />)}
          </Dropdown.Menu>
        </Dropdown> */}

      </Grid.Column>
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

export default connect(mapStateToProps, mapDispatchToProps)(CannedResponse)
