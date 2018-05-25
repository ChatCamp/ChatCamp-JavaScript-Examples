import React, { Component } from 'react'
import UnicodeToImg from '../../../../utility/UnicodeToImg'
import './style.css'
import {Picker} from "emoji-mart";

class Emoji extends Component {
  constructor(props,context){
    super(props,context);
    this.state = {
      _emojiMart: null
    };
  }

  componentWillMount() {
    let t = this;
      let __emojiMart = Picker;
      t.setState({
        _emojiMart: __emojiMart
      });
  }



  handleEmojiSet(){
    return UnicodeToImg.getEmojiSet("1");
  }

  render() {
    let viewEmojiPanel;

    if(this.props.showEmojiPanel === true && typeof this.state._emojiMart !== 'undefined' && this.state._emojiMart !== null) {
      viewEmojiPanel =
                          <this.state._emojiMart
                            set={this.handleEmojiSet()}
                            onClick={this.props.clickMethod}
                            title='Pick your emoji..'
                            emojiSize={24}
                            sheetSize={64}
                           backgroundImageFn={((set, sheetSize) => 'https://cdn.iflychat.com/img/international-emoji/v3.0.0/sheet_apple_32.png')}
                            emoji='point_up' />
    } else if(this.props.showEmojiPanel === true && (typeof this.state._emojiMart === 'undefined' || this.state._emojiMart === null)) {
    }


    return (
      <div className="cc-chat-window-content cc-chat-window-content-panel" ref={node => this.panelHeight = node}>
        {viewEmojiPanel}
      </div>

    )
  }

}

export default Emoji
