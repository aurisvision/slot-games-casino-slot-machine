import * as PIXI from "pixi.js";
import { createGameFrame, Games, SetGames, SOUND } from "../../Game";
import { fav } from "../../server/server";
import {MAX_COUNT_COLUMN, WIDTH_COLUMN} from "../../common/Config";
import {HotTag} from "./HotTag";
import {NewTag} from "./NewTag";
const mask:{x:number,y:number }[] = [{x:17, y:23},		{x:34, y:9},		{x:264, y:9},	{x:277, y:23},		{x:278, y:483},		{x:265, y:498},		{x:35, y:498},		{x:18, y:483},		{x:17, y:23}	];

export class Icon2 extends PIXI.Sprite{
	cont:PIXI.Sprite;
	piccont:PIXI.Sprite;
	contfav:PIXI.Sprite;
	_page:number = 0;
	_data:any = {};
	_column:number = 0;
	id:number = 0;
	url:string;
	SRC:string = "";
	/**
	 * Big game icon
	 * @param data	game data object
	 */
	constructor(data:any) {
		super();
		this.id = data.id!;
		this.SRC = data.src;
		this.url = data.url;
		this.cont = this.addChild(new PIXI.Sprite());
		this.contfav = this.addChild(new PIXI.Sprite());
		//
		this.piccont = this.cont.addChild(new PIXI.Sprite());
		const back = this.cont.addChildAt(new PIXI.Graphics(), 0).beginFill(0x006600, 1).moveTo(mask[0].x,mask[0].y)
		for(let i=1;i<mask.length;i++) {
			back.lineTo(mask[i].x,mask[i].y);
		}
		back.lineTo(mask[0].x,mask[0].y);
		back.endFill();
		//
		this.piccont.mask =	back;
		const img = this.piccont.addChild(PIXI.Sprite.from(this.SRC));
		img.x = 17;
		img.y = 9;
		//
		/*const frame = this.cont.addChild(PIXI.Sprite.from("/images/frenzy/icon1.png"));
		frame.x = 0;
		frame.y = 0;*/
		const json0 = PIXI.Loader.shared.resources["/images/frenzy/anim/icon.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate = new PIXI.AnimatedSprite(array0);
		animate.animationSpeed = 0.3;
		animate.loop = true;
		animate.x = -75;
		animate.y = -57;
		this.cont.addChild(animate);
		animate.gotoAndPlay(1);
		var instance = this;
		//
		const fav1 = this.contfav.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/fav1.png")));
		fav1.x = 270;
		fav1.y = 10;
		const fav2 = this.contfav.addChild(new PIXI.Sprite(PIXI.Texture.from("/images/frenzy/fav2.png")));
		fav2.interactive = true;
		fav2.buttonMode = true;
		fav2.x = 270;
		fav2.y = 10;
		fav2.alpha = 0;

		if(Games.fav.indexOf(this.id+'') != -1)
			fav2.alpha = 1;
		function clickFav() {
			fav2.alpha = (fav2.alpha === 0 ? 1 : 0);
			fav({game_id: instance.id, fav_status: fav2.alpha}, ()=>{
				var games = Games;
				if(fav2.alpha == 1)
				{
					games.fav.push(instance.id+'')
				}
				else
				{
					for(var i = 0; i < games.fav.length; i++)
					{
						if(games.fav[i] == instance.id+'')
							games.fav.splice(i, 1);
					}
				}
				SetGames(games);
			});
		}
		fav2.on('click', clickFav);
		fav2.on('tap', clickFav);
		
		if(data.tag==="hot") {
			const hot = this.cont.addChild(new HotTag());
			hot.x = -10;
			hot.y = -10;
		}
		//check new tag
		if(data.tag==="new") {
			const newicon = this.cont.addChild(new NewTag());
			newicon.x = -10;
			newicon.y = -10;
		}
		//
		let stX = 0;
		const mc = this;
		function tapDown(e:any) {
			stX = mc.position.x - e.data.originalEvent.pageX;
			if(e.data.originalEvent.pageX == undefined)
			{
				stX = mc.position.x - e.data.originalEvent.changedTouches[0].globalX;
			}
		}
		function tapUp(e:any) {
			var endX = mc.position.x - e.data.originalEvent.pageX;
			if(e.data.originalEvent.pageX == undefined)
			{
				endX = mc.position.x  - e.data.originalEvent.changedTouches[0].globalX;
			}
			if(endX > (stX - 10) && endX < (stX + 10)) {
				console.log(data.id);
				var tempMute = SOUND.MUTE;
				SOUND.muteSounds();
				SOUND.MUTE = tempMute;	
				createGameFrame(instance.url);
			}
		}
		this.cont.on('touchstart', tapDown);
		this.cont.on('pointerdown', tapDown);
		this.cont.on('pointerup', tapUp);
		this.cont.on('touchend', tapUp);
		//
		this.cont.interactive = true;
		this.cont.buttonMode = true;
		this.cont.scale.set(1.2, 1.2);
	}

	set column(val:number) {
		this._column = val;
		this.page = Math.ceil(val/MAX_COUNT_COLUMN);
		let real_col = val%MAX_COUNT_COLUMN;
		if(real_col===0) real_col = MAX_COUNT_COLUMN;
		this.x = (real_col-1)*WIDTH_COLUMN+30;
	}

	get column() {
		return this._column;
	}

	set page(val:number) {
		this._page = val;
	}

	get page() {
		return this._page;
	}

}