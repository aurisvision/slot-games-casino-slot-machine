/**
 * ...
 * @author ivms-flash
 */

import * as PIXI from "pixi.js";
import { sound } from '@pixi/sound';

export class Sounds
{
	constructor()
	{
		this.MUTE = false;
		sound.add({
			back: '/sounds/background.mp3',
			swipe: '/sounds/swipe.mp3',
			click: '/sounds/click.mp3',
			wheel_spin: '/sounds/wheel_spin.mp3',
			wheel_end: '/sounds/wheel_end.mp3'
		});
		//
		sound.play('back', {loop: true});
	}

	playSound(namesound)
	{
		if(this.MUTE)
		{
		 	sound.muteAll();
			return;
		}
		sound.play(namesound);
	}

	globalSoundsPause()
	{
		sound.togglePauseAll();
	}

	globalSoundsStop()
	{
		sound.stopAll();
	}

	unmuteSounds() {
		this.MUTE = false;
		sound.unmuteAll();
	}

	muteSounds()
	{
		//sound.toggleMuteAll();
		this.MUTE = true;
		sound.muteAll();
	}

	static clear()
	{
		console.log("clear");
		//this.removeAllChildren();
	}
}

export default Sounds;

