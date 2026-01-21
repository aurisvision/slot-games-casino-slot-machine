import * as PIXI from "pixi.js";
import {ButtonItem} from "../gui/ButtonItem";
import { EE, showPopup } from "../../App";
import { BonusStatus } from "../../Game";
import { collectBonus } from "../../server/server";

export class BonusWheel extends PIXI.Sprite{
	close: PIXI.Sprite = new PIXI.Sprite();
	black: PIXI.Graphics = new PIXI.Graphics();
	cont: PIXI.Sprite = new PIXI.Sprite();
	conttitle: PIXI.Sprite = new PIXI.Sprite();
	line:any = new PIXI.Sprite();
	button: PIXI.Sprite = new PIXI.Sprite();
	back: PIXI.Sprite = new PIXI.Sprite();
	data: any = new PIXI.Sprite();
	text2: PIXI.Sprite = new PIXI.Sprite();
	trunc: PIXI.Sprite = new PIXI.Sprite();

	HIDE_BONUS:any = null;

	constructor(hideBonus:any) {
		super();
		//
		this.HIDE_BONUS = hideBonus;
		this.onResize = this.onResize.bind(this);
		this.removed = this.removed.bind(this);
		this.build = this.build.bind(this);
		this.build();
	}

	async build() {
		//
		this.addChild(this.black);
		this.cont = this.addChild(new PIXI.Sprite());
		this.conttitle = this.addChild(new PIXI.Sprite());

		this.line = this.conttitle.addChild(new BonusLine());
		this.line.x = -500;

		this.back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/bonus_fon.png")));
		this.back.x = -550;

		this.button = this.conttitle.addChild(new ButtonItem("/images/frenzy/bonus_btn.png", ()=>{
			collectBonus(BonusStatus.id, (res: any) => {
				res = JSON.parse(res);
				if(res.status == 'success')
				{
					this.line.setStep(BonusStatus.available_step);
					if(res.bonus_win > 0)
					{
						showPopup('You have won ' + res.bonus_win + ' credits');
						this.line.setStep(0);
						this.data.setDay(0);
					}
					if(res.result != '')
					{
						showPopup(res.result);
					}
				}
			});
		}));
		this.button.x = -155;

		this.trunc = this.conttitle.addChild(new Trunc());
		this.trunc.x = -430;
		this.data = this.conttitle.addChild(new BonusData());
		this.data.x = -160;

		this.text2 = this.conttitle.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/bonus_text.png")));
		this.text2.x = -307;

		this.close = this.conttitle.addChild(new ButtonItem("/images/frenzy/bonus_close.png", ()=>{
			if(this.HIDE_BONUS) this.HIDE_BONUS();
		}));
		this.close.x = 380;

		//TODO:
		// const curday = 3;
		this.line.setStep(BonusStatus.current_step);		
		this.data.setDay(BonusStatus.available_step);

		EE.addListener("RESIZE", this.onResize);
		this.on('removed ', this.removed);
		//
		EE.emit('FORCE_RESIZE');
	}

	removed() {
		EE.removeListener("RESIZE", this.onResize);
		this.cont.removeChildren();
	}

	onResize(data:any) {
		this.black.clear();
		this.black.beginFill(0x000000, 0.8).drawRect(0,0,(data.w/data.scale),(data.h/data.scale)).endFill();
		this.conttitle.x = (data.w/data.scale)/2;
		this.conttitle.y = 50;
		this.cont.x = (data.w/data.scale)/2;
		this.cont.y = (data.h/data.scale) - 550;
		this.back.y = -(data.h/data.scale)/2 + 100;
		this.close.y = (data.h/data.scale)/2 - 350;
		this.trunc.y = (data.h/data.scale)/2 - 360;
		this.line.y = (data.h/data.scale)/2 - 80;
		this.data.y = (data.h/data.scale)/2 + 75;
		this.button.y = (data.h/data.scale)/2 + 130;
		this.text2.y = (data.h/data.scale)/2 + 260;
	}

}

class Trunc extends PIXI.Sprite{
	cont:PIXI.Sprite;

	/**
	 * New tag icon
	 */
	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		const json0 = PIXI.Loader.shared.resources["/images/frenzy/anim/trunc.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate0 = new PIXI.AnimatedSprite(array0);
		animate0.animationSpeed = 0.2;
		animate0.loop = true;
		//animate0.y = -3;
		this.cont.addChild(animate0);
		animate0.play();

	}

}

class BonusLine extends PIXI.Sprite{
	cont:PIXI.Sprite;
	addItems:any = {};
	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.setStep = this.setStep.bind(this);
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/bonus_back.png")));

		let xx = 90;
		for(let i=0;i<7;i++) {
			const itm = this.cont.addChild(new BonusItem());
			itm.y = 15;
			itm.x = xx;
			xx+=115;
			this.addItems[i+1] = itm;
		}

		this.on('removed ', this.removed);
	}

	setStep(num:number) {
		for(let i = 1; i <= 7; i++)
			this.addItems[i].inactive();
		for(let i=1;i<=num;i++) {
			this.addItems[i].active();
		}
	}

	removed() {
		this.cont.removeChildren();
	}

}

class BonusItem extends PIXI.Sprite{
	cont:PIXI.Sprite;
	state1:PIXI.Sprite;
	state2:PIXI.Sprite;

	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.active = this.active.bind(this);
		this.inactive = this.inactive.bind(this);
		//

		this.cont = this.addChild(new PIXI.Sprite());

		this.state1 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/bonus1.png")));
		this.state2 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/bonus2.png")));
		this.state2.visible = false;

		this.on('removed ', this.removed);
	}

	active() {
		this.state1.visible = false;
		this.state2.visible = true;
	}

	inactive() {
		this.state1.visible = true;
		this.state2.visible = false;
	}

	removed() {
		this.cont.removeChildren();
	}

}

class BonusData extends PIXI.Sprite{
	cont:PIXI.Sprite;
	task:PIXI.Text;

	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.setDay = this.setDay.bind(this);

		const style = new PIXI.TextStyle({
			fontFamily: "Bronzier",
			fontSize: "33px",
			fill: [
				"#FFDDFD",
				"#FF64F6",
			],
			dropShadow: true,
			dropShadowBlur: 1,
			dropShadowColor: "#000000",
			dropShadowDistance: 3,
			align: "center",
		});
		//

		this.cont = this.addChild(new PIXI.Sprite());

		const back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/bonus_back_info.png")));
		back.x = 0;
		back.y = 0;

		this.task = this.cont.addChild(new PIXI.Text("", style));
		this.task.y = 10;

		this.setDay(0);

		this.on('removed ', this.removed);
	}

	setDay(num:number) {
		this.task.text = `Login For 7 Days (${num}/7)`;
		this.task.x = 165 - (this.task.width/2);
	}

	removed() {
		//EE.removeListener("TICKER", this.onSelectWheelAnimate);
		this.cont.removeChildren();
	}

}