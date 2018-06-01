import React, { Component } from 'react'
import Avatar from 'react-avatar'
import { Image } from 'semantic-ui-react'
import Sound from 'react-sound';
import ProcessMessage from 'utility/ProcessMessage'
import DetectBrowser from 'utility/DetectBrowser';
import { PlayButton, PauseButton, ProgressBar, TimeMarker, TimeMarkerType,FormattedTime } from 'react-player-controls'
import * as Debug from 'debug'
const debug = Debug('chatcamp:WindowContent')

class AudioPlayer extends Component {
    
    state = {
        soundPlay: "STOPPED",
        soundPlayURL: "",
        soundDuration: 0,
        soundCurrentPosition: 0
    }

    handleSoundPlay(soundURL) {
        debug("soundplay", soundURL)
        this.setState({soundPlay: Sound.status.PLAYING, soundPlayURL: soundURL})
    }
    
    handleSoundPause(){
        this.setState({soundPlay: Sound.status.PAUSED})
    }

    handleOnFinishedPlaying = () => {
        this.setState({soundPlay: Sound.status.STOPPED, soundPlayURL: ""})
    }

    handleOnLoading = (object) => {
        debug("handleOnLoading", object)
    }

    handleOnLoad = (object) => {
        debug("handleOnLoad", object)
    }

    handleOnPlaying = (object) => {
        debug("handleOnPlayiung", object.duration, object.position)
        this.setState({soundCurrentPosition: Math.floor(object.position/1000), soundDuration: Math.floor(object.duration/1000)})
    }

    render () {
        debug("debug autoplay", this.state.soundPlay, this.props.url, this.props.id)
        let player = [];
        if(!DetectBrowser.detectIE()){
            if(this.state.soundPlay === Sound.status.PAUSED || this.state.soundPlay === Sound.status.STOPPED){
                player.push(<PlayButton key={"playB"} className="PlayButton message-bubble" isEnabled={true} onClick={() => this.handleSoundPlay(this.props.url)} />)
            }
            else{
                player.push(<PauseButton key={"pauseB"} className="PauseButton message-bubble"
            onClick={() => this.handleSoundPause()} 
            />)
            }
            
            player.push(<FormattedTime key={"formattedT"} numSeconds={this.state.soundCurrentPosition}/>)
            player.push(<ProgressBar key={"progressB"} totalTime={this.state.soundDuration} currentTime={this.state.soundCurrentPosition}isSeekable={false} />)
        }
        else{
            // IE render link instead of audio player
            player.push(<div className="message-bubble" dangerouslySetInnerHTML={{ __html: ProcessMessage.MediaRender(this.props.url)}}></div>)
        }
        return (
            <div className="cc-sound-player">
                {player}
                <Sound key={"sound_" + this.props.id}
                    playStatus={this.state.soundPlay} 
                    autoLoad = {false} 
                    url={this.props.url} 
                    onFinishedPlaying = {this.handleOnFinishedPlaying}
                    onLoading = {this.handleOnLoading}
                    onLoad = {this.handleOnLoad}
                    onPlaying = {this.handleOnPlaying}
                    onPause = {this.handleOnPause}
                />
            </div>
        )
    }

}

export default AudioPlayer
