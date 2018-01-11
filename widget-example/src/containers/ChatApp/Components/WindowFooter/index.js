import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'state/groupChannels/actions'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import './style.css'
import Textarea from 'react-textarea-autosize';

class WindowFooter extends Component {
  state = { open: false, message: '', isEmojiOpen: false, footerHeight: 23}
  constructor(props,context){
    super(props,context);
    this.handleUpdateEmoji = this.handleUpdateEmoji.bind(this);
  }

  handleChange = (e) =>{
    if(e.target.value !== '\n'){
      this.setState({message: e.target.value},function(){
      })
    }
  }
  handleChangeHeight(height){
    if(!isNaN(height)){
      let diff = height - this.state.footerHeight
      if(diff !== 0 & height !== 13){
        this.setState({footerHeight: height},function(){
          let contentHeight = this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].style.height
          let contentHeightInt = Number(contentHeight.substring(0, contentHeight.length - 2))
          let newContentHeightInt =  contentHeightInt - diff
          console.log(newContentHeightInt)
          this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].style.height = newContentHeightInt + "px"
          if(diff > 0){
            this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].scrollTop = this.textInputRef.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("window-content")[0].scrollTop + diff
          }

        })
      }
    }
  }

  handleKeyPress = (e) =>{
    if(e.key === "Enter"){
      e.preventDefault();
      this.sendMessage()
    }
  }

  sendMessageClick = () => {
    this.sendMessage()
  }

  sendMessage = () => {
    if((this.state.message !== '')){
      this.props.actions.userMessage(this.props.id, this.state.message)
      this.setState({message: ''})
    }
  }

  handleUpdateEmoji(emoji, e) {
    //update emoji in text box
    let oldMessage = this.state.message;
    let newMessage = oldMessage + emoji['colons'] + " "
    this.setState({message: newMessage})
    //close emoji panel
    this.setState({isEmojiOpen: false})
    //focus in textarea on choosing emoji
    this.textInputRef.focus()
  }

  componentDidMount() {
    // this.props.setInput(this.textInputRef);
  }

  componentWillUnmount() {
    // this.props.removeInput(this.textInputRef)
  }

  render () {
    const { open, message } = this.state
    let {frame} = this.props
    return (
    <Segment compact={true}>
      {/* <textArea className="borderNone" placeholder='Type and Send Message..' name ='message' value={message} style={{ width: "100%"}} onChange={this.handleChange} onKeyDown={this.handleKeyPress} ref={node => this.textInputRef = node} /> */}
      <Grid>
        {/* <Grid.Column width={2}>

          <Popover
            frame={this.props.id}
            isOpen={this.state.isEmojiOpen}
            trigger={<Icon name='smile' size='large' />}
            content={<Emoji
                      className="backgroundNone"
                      key="ifc-chat-window-panel"
                      showEmojiPanel={true}
                      clickMethod ={this.handleUpdateEmoji}
                    />}
          />

        </Grid.Column> */}
        <Grid.Column width={13} style={{paddingLeft: "9px", fontSize: "13.5px"}}>

          <Textarea
            className="borderNone"
            name ='message'
            minRows={1}
            maxRows={5}
            placeholder='Type and Send Message..'
            value={message}
            style={{ width: "100%", minHeight: "23px"}}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            inputRef={node => this.textInputRef = node}
            onHeightChange={(height, instance) => this.handleChangeHeight(height)}
          />

        </Grid.Column>
        <Grid.Column width={2}>
          <Icon name='send' size='large' onClick={() => {this.sendMessageClick()}}/>
          {/* <Popover
            frame={this.props.id}
            isOpen={this.state.isEmojiOpen}
            trigger={<Icon name='send' size='large' onClick={this.handleKeyPress}/>}
            content={<Emoji
                      className="backgroundNone"
                      key="ifc-chat-window-panel"
                      showEmojiPanel={true}
                      clickMethod ={this.handleUpdateEmoji}
                    />}
          /> */}

        </Grid.Column>
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

export default connect(mapStateToProps, mapDispatchToProps)(WindowFooter)
