import React, { Component } from 'react'
import Avatar from 'react-avatar';
import { Image } from 'semantic-ui-react'

class AvatarWrapper extends Component {

  render () {
    let avatar;
    let size;
    if(this.props.size){
      size = this.props.size
    }
    else{
      size = 36
    }
    if(this.props.src){
      avatar = <Image avatar src={this.props.src} className={"cc-avatar-size-" + size} circular/>
    }
    else{
      avatar = <Avatar style={this.props.style} color={this.props.color} name={this.props.name} size={this.props.size || 36} round className={this.props.className}/>
    }
    return (
      <div>
        {avatar}
      </div>
    )
  }

}

export default AvatarWrapper
