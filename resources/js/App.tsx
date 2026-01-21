import './App.css';
import React from 'react';
import TopWindows from "./TopWindows";
import * as PIXI from "pixi.js";
import { listImages } from './common/Config';
import EventEmitter from "eventemitter3";
import { setup } from './Game';
import {MessageWin} from "./windows/MessageWin";
/**
 * global Event Emitter
 */
export let EE:EventEmitter = new EventEmitter();
///
export let imagesLoader:PIXI.Loader;
//show popup with message
export function showPopup(txt:string) {
	/*"Congratulations, you have completed more than 8 gems! Once time is over you'll receive a reward."*/
	EE.emit('SHOW_MESSAGE', txt);
}
class App extends React.Component <{}, { MESSAGE: string }> {
	constructor(props:any) {
		super(props);
		this.onCloseMessage = this.onCloseMessage.bind(this);
		this.state = {
			MESSAGE: ""
		}		
	}
	
	isSetup: any;
	componentDidMount() {
		EE.addListener('SHOW_MESSAGE', (txt)=>{
			this.setState({MESSAGE: txt});
		});
		
		const WebFont = require('webfontloader');
		WebFont.load({
			custom: {
				families: ['Bronzier']
			}
		});
		const preloaderbase = document.getElementsByClassName("preloader-game");
		const preloader = document.getElementsByClassName("prel-bar-line");
		//
		imagesLoader = PIXI.Loader.shared;
		imagesLoader.add(listImages);
		imagesLoader.onProgress.add(() => {
			const wdth = 917*(Math.ceil(100-imagesLoader.progress))/100;
			if(preloader[0]) {
				(preloader[0] as any).style.setProperty("clip-path", `inset(0 ${wdth}px 0 0)`);
			}
		});
		imagesLoader.onError.add((e) => {
			console.log('ERROR LOAD! ', e);
		});
		imagesLoader.onComplete.add(() => {
			if(preloaderbase[0]) {
				(preloaderbase[0] as any).style.setProperty("opacity", "0");
				setTimeout(()=>{
					(preloaderbase[0] as any).style.setProperty("display", "none");
					(preloaderbase[0] as any).parentNode.removeChild((preloaderbase[0] as any));
					EE.emit('CLEAR_TOP_WINDOWS');
					window.localStorage.setItem('game_orientation', 'landscape');
					
					var type:string = document.getElementById('root')?.getAttribute('type')!;
					if(type == 'hub')
					{
						if(!this.isSetup)
						{
							setup();
							this.isSetup = true;
							// EE.emit('SHOW_NEW_WEBSITE');
						}
					}
					else
					{
						EE.emit('SHOW_LOGIN');
						window.localStorage.setItem('giveaway', '0');
						document.getElementById('AppGame')?.style.setProperty("display", "none");
					}
				}, 1000);
			}

		});
		imagesLoader.load();
	}

	onCloseMessage () {
		this.setState({
			MESSAGE: ""
		})
	}

	render () {
		return (
			<div>
				{(this.state.MESSAGE !== "" && <MessageWin text={this.state.MESSAGE} onClose={this.onCloseMessage}/> )}
				<TopWindows/>
				<div id="AppGame"/>
			</div>
		)
	}
}

export default App;
