import React, { Component } from 'react'
import { Dropdown, Grid, Popup, Image } from 'semantic-ui-react'
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
    let sourceURL = process.env.PUBLIC_URL + "/"
    let source =  sourceURL + "icons8-fantasy-filled-100.png"

    let options = [
      {
        key: 'Hi, how can I help you today?',
        text: 'Hi, how can I help you today?',
        value: 'Hi, how can I help you today?',
      },
      {
        key: 'It was a pleasure talking to you',
        text: 'It was a pleasure talking to you',
        value: 'It was a pleasure talking to you',
      },
      {
        key: 'Please, give me a moment',
        text: 'Please, give me a moment',
        value: 'Please, give me a moment',
      }
    ]

    return (
      <Grid.Column width={1}>

        <Popup
          trigger={<Dropdown
                      name="canned_response"
                      icon="wizard"
                      pointing = "right"
                      // as={() => <Image className="chatcamp-widget-attach" src={source} />}
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
