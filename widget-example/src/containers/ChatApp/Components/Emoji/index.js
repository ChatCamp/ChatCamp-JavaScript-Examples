import React, { Component } from 'react'
import UnicodeToImg from '../../../../utility/UnicodeToImg'
import './style.css'
import {Picker} from "emoji-mart";
// import emojisList from "emojis-list";

class Emoji extends Component {
  constructor(props,context){
    super(props,context);
    this.state = {
      _emojiMart: null
    };
    this.handleUpdateEmoji = this.handleUpdateEmoji.bind(this);
  }

  componentWillMount() {
    let t = this;
    // require.ensure([emojisList], function(require) {
    // if(emojisList){
      let __emojiMart = Picker;
      t.setState({
        _emojiMart: __emojiMart
      });
    // }
    // });
  }

  componentDidMount() {
    // this.props.setPanelHeight(this.panelHeight.offsetHeight)
  }

  handleUpdateEmoji(emoji, e) {
    //**********Code for editable div**********
    // let style = UnicodeToImg.getImgTagStyle(item);
    // let newMsg = this.props.msg + '<img src="//cdn.iflychat.com/img/international-emoji/blank.gif" class="img" style="'
    //   + style + '" alt="' + item[5] + '" title="' + item[3] + '">';
    //**********Code Ends**********

    //**********Code for TextArea**********
    // let newMsg = this.props.msg + item[3];
    let newMsg = this.props.msg + emoji['colons'];
    //**********Code for TextArea**********

    // this.props.handleUpdateMsg(newMsg);
    // this.props.handleRemoveEmojiPanel();
    // this.props.handleUpdateAutoFocus(true);
  };

  // handleUpdateColor(item, threadId) {
  //   this.props.handleRemoveColorPanel();
  //   this.props.actions.pickColor(item, threadId);
  //   iFlyChatChatSdk.changeColor(threadId,item);
  // }

  handleEmojiSet(){
    return UnicodeToImg.getEmojiSet("1");
  }

  render() {
    let viewEmojiPanel;
    let viewColorPanel;

    if(this.props.showEmojiPanel === true && typeof this.state._emojiMart !== 'undefined' && this.state._emojiMart !== null) {
      viewEmojiPanel =
                          <this.state._emojiMart
                            set={this.handleEmojiSet()}
                            // sheetURL={this.handleEmojiSet()}
                            onClick={this.props.clickMethod}
                            title='Pick your emoji�'
                            emojiSize={24}
                            sheetSize={64}
                           backgroundImageFn={((set, sheetSize) => 'https://cdn.iflychat.com/img/international-emoji/v3.0.0/sheet_apple_32.png')}
                            emoji='point_up' />
                        // </Popover>
    } else if(this.props.showEmojiPanel === true && (typeof this.state._emojiMart === 'undefined' || this.state._emojiMart === null)) {
      // viewEmojiPanel = <Spinner loadTopClass={true}/>
    }

    // if(this.props.showColorPanel === true) {
    //   viewColorPanel = <Overlay
    //                       show={true}
    //                       container={this}
    //                       rootClose={true}
    //                       onHide={this.props.handleRemoveColorPanel}
    //                     >
    //                       <ColorPicker chatSettings={this.props.chatSettings} actions={this.props.actions} handleUpdateColor={this.handleUpdateColor} thread={this.props.thread} />
    //                     </Overlay>
    // }

    return (
      <div className="cc-chat-window-content cc-chat-window-content-panel" ref={node => this.panelHeight = node}>
        {viewEmojiPanel}
      </div>

    )
  }

}

export default Emoji
