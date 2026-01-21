import * as PIXI from "pixi.js";
import {Games, SELECTED_PART, SetGames, UPDATE_BIG_BUTTONS} from "../../Game";
import {gsap} from "gsap";
import {EE} from "../../App";
import { Icon2 } from "../icons/Icon2";
import _ from "lodash";
import {ButtonItem} from "../gui/ButtonItem";
import {BROWSER_SCALE, BROWSER_WIDTH} from "../../responsiveModule";
import { getGames } from "../../server/server";

let max_left:number = 0;
const scale_this:number = 1.35;
let width_mask:number = 1480;
const height_mask:number = 530;

/**
 * game list module
 */
export class HubIcons2 extends PIXI.Sprite{
	cont:PIXI.Sprite;
	total_width_cont:number = 0;
	headcont:PIXI.Sprite;
	ll:PIXI.Sprite;
	rr:PIXI.Sprite;
	msk:PIXI.Graphics = new PIXI.Graphics();
	Games: any;
	/**
	 * game list module
	 */
	constructor() {
		super();
		//
		this.updateHub = this.updateHub.bind(this);
		this.onResize = this.onResize.bind(this);
		this.moveIcons = this.moveIcons.bind(this);
		this.moveIconsLeft = this.moveIconsLeft.bind(this);
		this.moveIconsRight = this.moveIconsRight.bind(this);
		EE.addListener("RESIZE", this.onResize);
		//
		this.headcont = this.addChild(new PIXI.Sprite());
		this.headcont.scale.set(scale_this)

		this.ll = this.addChild(new ButtonItem("/images/frenzy/arrow1.png", this.moveIconsLeft));
		this.ll.x = -60;
		this.ll.y = height_mask/2;

		this.rr = this.addChild(new ButtonItem("/images/frenzy/arrow2.png", this.moveIconsRight));
		this.rr.x = width_mask*scale_this + 10;
		this.rr.y = height_mask/2;

		this.cont = this.headcont.addChild(new PIXI.Sprite());
		this.cont.interactive = true; //need for touch scroll
		(this.cont as any).dragging = false; //need for touch scroll
		this.cont
			.on('mousedown', this.onDragStart)
			.on('touchstart', this.onTouchStart)
			// events for drag end
			.on('mouseup', this.onDragEnd)
			.on('mouseupoutside', this.onDragEnd)
			.on('touchend', this.onDragEnd)
			.on('touchendoutside', this.onDragEnd)
			// events for drag move
			.on('mousemove', this.onDragMove)
			.on('touchmove', this.onTouchMove);

		//this.cont.mask = this.headcont.addChild(new PIXI.Graphics()).beginFill(0x0000ff, 1).drawRect(0,-10,1520,720).endFill();

		EE.addListener(UPDATE_BIG_BUTTONS, this.updateHub);

		EE.addListener('SLIDER_TO_RIGHT', this.moveIconsRight)
		EE.addListener('SLIDER_TO_LEFT', this.moveIconsLeft)
		EE.emit('FORCE_RESIZE');

		getGames((e:any)=>{
			var games = JSON.parse(e);
			games.fav = games.fav.split(',');
			SetGames(games);			
			this.updateHub();
		})
	}

	moveIconsRight() {
		console.log('right')
		this.moveIcons(this.cont.position.x - 320);
	}

	moveIconsLeft() {
		console.log('left')
		this.moveIcons(this.cont.position.x + 320);
	}

	moveIcons(new_pos:number)
	{
		gsap.killTweensOf(this.cont.position);
		const curx = new_pos;
		let endx = curx - curx % 320;
		if(curx>0) endx = 0;
		if(endx<max_left) endx = max_left - max_left % 320;
		gsap.to(this.cont.position, {
			duration: 0.5,
			x: endx
		});
	}

	/**
	 * arrangement of module elements depending on the screen size
	 * @param data	object {w, h, scale}
	 */
	onResize(data:any) {
		this.cont.x = 0;
		width_mask = (BROWSER_WIDTH/BROWSER_SCALE)/scale_this-110;
		this.headcont.removeChild(this.msk);
		this.msk = this.headcont.addChild(new PIXI.Graphics()).beginFill(0x0000ff, 1).drawRect(0,-10,width_mask,height_mask).endFill();
		this.cont.mask = this.msk;
		this.rr.x = width_mask*scale_this + 10;
		//
		let hght = (data.h/data.scale);
		let yy = (hght - 1080)/2;
		if(yy<0) yy = 0;
		this.headcont.y = yy;
		this.ll.y = this.rr.y =  yy + 270;
	}

	/**
	 * start drag game container
	 * @param e
	 */
	onDragStart(e:any)
	{
		(this as any).data = e.data;
		(this as any).dragging = true;
		(this as any).offset = { x: this.position.x - e.data.originalEvent.pageX, y: this.y - e.data.originalEvent.pageY };
	}

	/**
	 * start touch drag game container
	 * @param e
	 */
	onTouchStart(e:any)
	{
		(this as any).data = e.data;
		(this as any).dragging = true;
		const startcoord = (this as any).data.getLocalPosition(this.parent);
		(this as any).offset = { x: this.position.x - startcoord.x, y: 0 };
	}

	/**
	 * finish drag
	 */
	onDragEnd()
	{
		(this as any).dragging = false;
		(this as any).data = null;
		//
		const curx = this.position.x;
		let endx = curx - curx % 160;
		if(curx>0) endx = 0;
		if(endx<max_left) endx = max_left - max_left % 160;
		gsap.to(this.position, {
			duration: 0.5,
			x: endx
		});
	}

	/**
	 * drag move
	 * @param e
	 */
	onDragMove(e:any)
	{
		if ((this as any).dragging)
		{
			this.position.x = e.data.originalEvent.pageX + (this as any).offset.x;
			this.position.y = 0;
		}
	}

	/**
	 * touch move
	 */
	onTouchMove()
	{
		if ((this as any).dragging)
		{
			const newPosition = (this as any).data.getLocalPosition(this.parent);
			this.position.x = newPosition.x + (this as any).offset.x;
			this.position.y = 0;
		}
	}

	/**
	 * build game list
	 */
	async updateHub() {
		gsap.killTweensOf(this.cont);
		await new Promise((resolve) => {
			gsap.to(this.cont, {
				duration: 0.5,
				alpha: 0,
				onComplete: ()=>{
					resolve(null);
				}
			});
		});
		this.cont.removeChildren();
		this.cont.x = 0;
		//
		gsap.to(this.cont, {
			duration: 0.3,
			alpha: 1
		});
		//
		this.Games = Games;
		var fishes = _.concat(this.Games.fishes);
		var casinos = _.concat(this.Games.casinos);
		var slots = _.concat(this.Games.slots);
		let gamearray = [];
		switch (SELECTED_PART) {
			case 2: //all
				while(fishes.length != 0 || casinos.length != 0 || slots.length != 0)
				{
					if(fishes.length > 0)
					{
						gamearray.push(fishes[0]);
						fishes.shift();
					}
					if(casinos.length > 0)
					{
						gamearray.push(casinos[0]);						
						casinos.shift();
					}
					for(var i = 0; i < 6; i++)
					{
						if(slots.length > 0)
						{
							gamearray.push(slots[0]);						
							slots.shift();
						}	
					}
				}
				break;			
			case 3:
				gamearray = fishes;
				break;
			case 4:
				gamearray = casinos;
				break;
			case 5:
				gamearray = slots;
				break;
			case 1: //fav
				var fav = this.Games.fav;
				fishes = [];
				casinos = [];
				slots = [];
				if(fav.length > 0)
				{
					for(var i = 0; i < this.Games.fishes.length; i++)
					{
						if(fav.indexOf(this.Games.fishes[i].id+'') != -1)
							fishes.push(this.Games.fishes[i]);
					}
					for(var i = 0; i < this.Games.casinos.length; i++)
					{
						if(fav.indexOf(this.Games.casinos[i].id+'') != -1)
							casinos.push(this.Games.casinos[i]);
					}
					for(var i = 0; i < this.Games.slots.length; i++)
					{
						if(fav.indexOf(this.Games.slots[i].id+'') != -1)
							slots.push(this.Games.slots[i]);
					}
					while(fishes.length != 0 || casinos.length != 0 || slots.length != 0)
					{
						if(fishes.length > 0)
						{
							gamearray.push(fishes[0]);
							fishes.shift();
						}
						if(casinos.length > 0)
						{
							gamearray.push(casinos[0]);						
							casinos.shift();
						}
						for(var i = 0; i < 6; i++)
						{
							if(slots.length > 0)
							{
								gamearray.push(slots[0]);						
								slots.shift();
							}	
						}
					}
				}
				break;
		}
		//
		const xx_plus = 320;
		let xx = 0;
		let yy = 0;
		for (const game of gamearray) {
			let item;
			yy = 0;
			item = new Icon2(game);
			item.x = xx;
			item.y = yy;
			xx+=xx_plus;
			this.cont.addChildAt(item,0);
		}
		this.cont.hitArea = new PIXI.Rectangle(0, 0, xx, 530);
		this.total_width_cont = xx;
		if(xx > width_mask) {
			max_left = (xx - width_mask + 390)*-1;
		}

		//EE.emit('UPDATE_CONTROL', {totalcolumn: gamearray.length});
	}


}