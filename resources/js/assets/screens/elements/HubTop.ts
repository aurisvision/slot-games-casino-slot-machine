import * as PIXI from "pixi.js";
import {EE} from "../../../App";
import { Settings } from "./HubRight";

export class HubTop extends PIXI.Sprite{
	cont:PIXI.Sprite;
	back:TopBack;

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.back = this.cont.addChild(new TopBack());

		this.onResize = this.onResize.bind(this);
		EE.addListener("RESIZE", this.onResize);
		EE.emit('FORCE_RESIZE');
	}

	onResize(_data:any) {
		//const spaceX = (data.w/data.scale) - PAGE_SIZE_DEFAULT.width;
		//this.back.width = (data.w/data.scale);
		//this.frame_ex1.width = this.frame_ex2.width = spaceX/2;
		//this.frame_ex2.x = (data.w/data.scale) - spaceX/2;
	}

}

class TopBack extends PIXI.Sprite{
	contL:PIXI.Sprite = new PIXI.Sprite();
	contR:PIXI.Sprite = new PIXI.Sprite();
	contC:PIXI.Sprite = new PIXI.Sprite();
	user:UserBlock;
	settings:PIXI.Sprite = new PIXI.Sprite();
	jackpot: PIXI.Text;
	constructor() {
		super();
		const styletext = new PIXI.TextStyle({
			fontFamily: "Bronzier",
			fontSize: "52px",
			fill: [
				"#FFF997",
				"#CB9F00",
				"#FFF997",
			],
			dropShadow: true,
			dropShadowBlur: 2,
			dropShadowColor: "#000000",
			dropShadowDistance: 4,
			align: "center",

		});

		this.contL = this.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/top_l.png")));
		this.contR = this.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/top_r.png")));
		this.contC = this.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/top_c.png")));
		
		this.jackpot = this.contC.addChild(new PIXI.Text("", styletext));
		this.jackpot.x = 315 - (this.jackpot.width/2);
		this.jackpot.y = 53;

		this.user = this.contC.addChild(new UserBlock());
		this.user.y = 105;
		this.user.x = -600;

		this.settings = this.contC.addChild(new Settings());
		this.settings.y = 60;
		this.settings.x = 850;

		this.onResize = this.onResize.bind(this);
		//
		EE.addListener("RESIZE", this.onResize);
		EE.emit('FORCE_RESIZE');
	}

	onResize(_data:any) {
		this.contC.x = (_data.w/_data.scale)/2 - 292;
		this.contL.x = 0;
		this.contR.x = (_data.w/_data.scale)/2 + 292;
		this.contL.width = this.contR.width = ((_data.w/_data.scale)-584)/2;		
	}
}
export class Frame extends PIXI.Sprite{
	cont:PIXI.Sprite;
	animate:PIXI.AnimatedSprite;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		this.play = this.play.bind(this);
		//
		const json0 = PIXI.Loader.shared.resources["/images/anim/frame_up.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		this.animate = new PIXI.AnimatedSprite(array0);
		this.animate.animationSpeed = 0.5;
		this.animate.loop = true;
		this.cont.addChild(this.animate);
		this.animate.gotoAndPlay(1);
	}

	play() {
		this.animate.gotoAndPlay(1);
	}

}

class UserBlock extends PIXI.Sprite{
	cont:PIXI.Sprite;
	moneyuser: PIXI.Text;
	constructor() {
		super();
		const styletext = new PIXI.TextStyle({
			fontFamily: "Bronzier",
			fontSize: "27px",
			fill: [
				"#ffffff",
				"#FCD13D",
			],
			dropShadow: true,
			dropShadowBlur: 1,
			dropShadowColor: "#000000",
			dropShadowDistance: 3,
			align: "center",

		});

		const styletext2 = new PIXI.TextStyle({
			fontFamily: "Bronzier",
			fontSize: "28px",
			fill: [
				"#EED9FF",
				"#DFB7FF",
			],
			dropShadow: true,
			dropShadowBlur: 2,
			dropShadowColor: "#000000",
			dropShadowDistance: 2,
			align: "center",
		});
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		const json0 = PIXI.Loader.shared.resources["/images/frenzy/anim/user.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate = new PIXI.AnimatedSprite(array0);
		animate.animationSpeed = 0.3;
		animate.loop = true;
		animate.y = -55;
		animate.x = -47;
		animate.scale.set(0.95);
		this.cont.addChild(animate);
		animate.gotoAndPlay(1);
		//
		var username:string = document.getElementById('root')?.getAttribute('username')!;
		const nameuser = this.cont.addChild(new PIXI.Text(username, styletext));
		nameuser.x = 190 - (nameuser.width/2);
		nameuser.y = -15;

		var balance:string = document.getElementById('root')?.getAttribute('balance')!;
		this.moneyuser = this.cont.addChild(new PIXI.Text(balance, styletext2));
		this.moneyuser.x = 195 - (this.moneyuser.width/2);
		this.moneyuser.y = 20;
		//
		this.cont.interactive = true;
		this.cont.buttonMode = true;
		this.cont.on('pointerdown', ()=>{
			EE.emit('SHOW_INFO');
		})
		this.cont.on('tap', ()=>{			
			EE.emit('SHOW_INFO');
		});
	}
}