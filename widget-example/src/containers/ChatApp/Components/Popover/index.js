import React from 'react'
import { Button, Grid, Header, Popup } from 'semantic-ui-react'

const timeoutLength = 2500

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
            // frame={"ifc-" +this.props.frame}
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
