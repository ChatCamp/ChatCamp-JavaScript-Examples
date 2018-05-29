import React, { Component } from 'react'
import { connect } from 'react-redux'

class ChatCampIcon extends Component {

  state = {}

  render () {

    return (
      <svg
        className="cc-icons"
        viewBox={this.props.viewBox}
        preserveAspectRatio= "none"
        width={this.props.width}
        height={this.props.height}
      >
        <path
          d={this.props.icon}
        ></path>
      </svg>
    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatCampIcon)
