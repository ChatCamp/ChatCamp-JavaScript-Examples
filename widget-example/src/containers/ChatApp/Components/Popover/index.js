import React from 'react'
import { Popup } from 'semantic-ui-react'

class Popover extends React.Component {
  state = { isOpen: false }

  componentWillReceiveProps(){
    this.setState({ isOpen: this.props.isOpen })
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  render() {
    return (
          <Popup
            trigger={this.props.trigger}
            content={this.props.content}
            on='click'
            hoverable
            open={this.state.isOpen}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            position={this.props.position}
            basic={true}
          />
    )
  }
}

export default Popover
