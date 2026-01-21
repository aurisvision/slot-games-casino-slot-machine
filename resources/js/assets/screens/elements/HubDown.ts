import * as PIXI from "pixi.js";
import { EE } from "../../../App";
import {Buttons} from "./Buttons";
import { SELECTED_PART, updateSelectButton } from "../../../Game";
//import { convertTimeToStr } from "../../../common/Utils";

export class HubDown extends PIXI.Sprite{
	cont:PIXI.Sprite = new PIXI.Sprite();
	coin:PIXI.Sprite = new PIXI.Sprite();
	table:PIXI.Sprite = new PIXI.Sprite();
	logo:PIXI.Sprite = new PIXI.Sprite();
	wheel:PIXI.Sprite = new PIXI.Sprite();
	back_l:PIXI.Sprite = new PIXI.Sprite();
	back_r:PIXI.Sprite = new PIXI.Sprite();
	dback:PIXI.Sprite = new PIXI.Sprite();
	buttons:PIXI.Sprite = new PIXI.Sprite();

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.dback = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/down_c.png")));
		this.back_l = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/down_l.png")));
		this.back_r = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/down_r.png")));


		//this.dback.addChild(new SliderControl());
		//
		this.logo = this.cont.addChild(new Logo());

		this.wheel = this.cont.addChild(new WheelButton());
		this.wheel.interactive = true;
		this.wheel.buttonMode = true;
		this.wheel.on('pointerdown', () => {
			EE.emit('SHOW_WHEEL');
		});

		this.table = this.cont.addChild(new TableButton());

		this.coin = this.cont.addChild(new CoinButton());
		//
		this.buttons = this.cont.addChild(new Buttons());

		this.onResize = this.onResize.bind(this);
		EE.addListener("RESIZE", this.onResize);
		EE.emit('FORCE_RESIZE');
	}

	onResize(data:any) {
		this.table.y = (data.h/data.scale) - 187;
		this.coin.y = (data.h/data.scale) - 187;
		this.wheel.y = (data.h/data.scale) - 155;

		this.logo.x = (data.w/data.scale)/2 - 190;
		this.logo.y = (data.h/data.scale) - 200;

		this.dback.x = (data.w/data.scale)/2 - 331;
		this.dback.y = (data.h/data.scale) - 125;
		this.back_l.y = (data.h/data.scale) - 125;
		this.back_r.y = (data.h/data.scale) - 124;
		this.back_l.x = 0;
		this.back_r.x = (data.w/data.scale)/2 + 294;
		this.back_l.width = ((data.w/data.scale) - 660)/2;
		this.back_r.width = this.back_l.width + 35;
		this.buttons.x = (data.w/data.scale)/2 - 820;
		this.buttons.y = this.back_r.y - 65;
		//
		let ds = data.scale;
		if(ds<1) ds=1;
		this.table.x = (data.w/data.scale)/2 + 280;
		this.coin.x = (data.w/data.scale)/2 + 460;
		this.wheel.x = (data.w/data.scale)/2 + 670;
	}

}

export class Logo extends PIXI.Sprite{
	cont:PIXI.Sprite;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		const json0 = PIXI.Loader.shared.resources["/images/frenzy/anim/logo.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate = new PIXI.AnimatedSprite(array0);
		animate.animationSpeed = 0.2;
		animate.loop = true;
		this.cont.addChild(animate);
		animate.gotoAndPlay(1);
	}

}

class TableButton extends PIXI.Sprite{
	cont:PIXI.Sprite;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		const json0 = PIXI.Loader.shared.resources["/images/frenzy/anim/table.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate = new PIXI.AnimatedSprite(array0);
		animate.animationSpeed = 0.3;
		animate.loop = true;
		this.cont.addChild(animate);
		animate.gotoAndPlay(1);
		//
		this.cont.interactive = true;
		this.cont.buttonMode = true;
		this.cont.on('click', ()=>{			
			if(SELECTED_PART != 4)
				updateSelectButton(4);
		});
		this.cont.on('tap', ()=>{	
			if(SELECTED_PART != 4)		
				updateSelectButton(4);
		});
	}

}

class CoinButton extends PIXI.Sprite{
	cont:PIXI.Sprite;
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		const json0 = PIXI.Loader.shared.resources["/images/frenzy/anim/coin.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate = new PIXI.AnimatedSprite(array0);
		animate.animationSpeed = 0.3;
		animate.loop = true;
		this.cont.addChild(animate);
		animate.gotoAndPlay(1);
		//
		this.cont.interactive = true;
		this.cont.buttonMode = true;
		this.cont.on('click', ()=>{
			if(SELECTED_PART != 5)
				updateSelectButton(5);
		});
		this.cont.on('tap', ()=>{
			if(SELECTED_PART != 5)
				updateSelectButton(5);
		});
	}

}

class WheelButton extends PIXI.Sprite{
	cont:PIXI.Sprite;
	tim:any = 0;
	constructor() {
		super();
		//
		//
		this.cont = this.addChild(new PIXI.Sprite());
		//
		const json0 = PIXI.Loader.shared.resources["/images/frenzy/anim/bonus.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate = new PIXI.AnimatedSprite(array0);
		animate.animationSpeed = 0.3;
		animate.loop = true;
		this.cont.addChild(animate);
		animate.gotoAndPlay(1);
		//
		/*const time = this.cont.addChild(new PIXI.Text("--:--:--", styletext));
		time.x = 128 - (time.width/2);
		time.y = 137;
		//
		let sec = 39245; //TODO: this is start seconds. Need to be change
		this.tim = setInterval(()=>{
			sec--;
			if(sec<0) {
				clearInterval(this.tim);
				return;
			}
			const timtext = convertTimeToStr(sec);
			time.text =`${timtext[0]}:${timtext[1]}:${timtext[2]}`;
		}, 1000);*/
		//

	}

	componentWillUnmount() {
		clearInterval(this.tim);
	}

}