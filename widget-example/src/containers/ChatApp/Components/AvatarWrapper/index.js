import React, { Component } from 'react'
import Avatar from 'react-avatar';

class AvatarWrapper extends Component {

  render () {
    return (
      <Avatar style={this.props.style} color={this.props.color} name={this.props.name} size={this.props.size || 36} round className={this.props.className}/>
      //avatar class required for semantic positioning
    )
  }

}

export default AvatarWrapper
