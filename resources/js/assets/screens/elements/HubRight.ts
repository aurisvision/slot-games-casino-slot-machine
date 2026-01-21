import * as PIXI from "pixi.js";
import {ButtonItem} from "../../gui/ButtonItem";
// import {EE} from "../../../App";
import {AD_SHOW, SOUND} from "../../../Game";
import { EE } from "../../../App";
export class Settings extends PIXI.Sprite{
	cont:PIXI.Sprite;

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/settings2.png")));
		function buttonSoundOn() 
		{
			buttonSnd.visible = false;
			buttonSndOff.visible = true;
			SOUND.muteSounds();		
		}
		function buttonSoundOff()
		{
			buttonSnd.visible = true;
			buttonSndOff.visible = false;
			SOUND.unmuteSounds();
		}

		this.cont.scale.set(0.7);
        this.cont.x = 0;
		const buttonNews = this.cont.addChild(
            new ButtonItem("images/frenzy/right_menu5.png", () => {
				if(AD_SHOW == 1)
                	EE.emit("SHOW_NEWS");
            })
        );
        buttonNews.x = 215;
        buttonNews.y = 35;
        buttonNews.scale.set(0.9);
		// buttonNews.visible = false;

		const buttonSnd = this.cont.addChild(new ButtonItem("/images/frenzy/right_menu2.png", buttonSoundOn));
		buttonSnd.x = 75;
		buttonSnd.y = 35;
		buttonSnd.scale.set(0.9);
		const buttonSndOff = this.cont.addChild(new ButtonItem("/images/frenzy/right_menu3.png", buttonSoundOff));
		buttonSndOff.visible = false;
		buttonSndOff.x = 75;
		buttonSndOff.y = 35;
		buttonSndOff.scale.set(0.9);

		/*
		const buttonLetter = this.cont.addChild(new ButtonItem("/images/frenzy/right_menu1.png", ()=>{
			EE.emit('SHOW_MAIL');
		}));
		buttonLetter.x = 250;
		buttonLetter.y = 23;
		buttonLetter.scale.set(0.8);
		*/

		function buttonExitFunc(){
			console.log('exit');
			var isMobile;
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
				// true for mobile device                
				isMobile = true;
			}
			else 
			{
				// false for not mobile device
				isMobile = false;
			}
			
			if(!isMobile)
				window.location.href = '/logout';
			else
			{
				var data = JSON.stringify({event: 'Logout', value: "logout"});
				window.postMessage(data, "*");
				window.location.href = '/logout';				
			}
		}
		const buttonExit = this.cont.addChild(new ButtonItem("/images/frenzy/right_menu4.png", buttonExitFunc));
		buttonExit.x = 350;
		buttonExit.y = 30;
		buttonExit.scale.set(0.9);
	}

}