import * as PIXI from "pixi.js";
import {SELECTED_PART, UPDATE_BIG_BUTTONS} from "../../Game";
import { Icon } from "../icons/Icon";
//import { Icon2 } from "../icons/Icon2";
import {Games, MAX_COUNT_COLUMN, PAGE_SIZE_DEFAULT, WIDTH_COLUMN} from "../../common/Config";
import {gsap} from "gsap";
import {EE} from "../../App";
//import { getGames } from "../../server/server";
import _ from "lodash";


//let max_left:number = 0;
//let width_mask:number = 1920;

/**
 * game list module
 */
let startSlideX = 0;
let game_icons:PIXI.Sprite[] = [];
let current_page = 0;
let old_page = 1;
export class HubIcons extends PIXI.Sprite{
	cont:PIXI.Sprite;
	headcont:PIXI.Sprite;

	/**
	 * game list module
	 */
	constructor() {
		super();
		//
		this.updateHub = this.updateHub.bind(this);
		this.onResize = this.onResize.bind(this);
		this.moveIcons = this.moveIcons.bind(this);
		this.placeIcons = this.placeIcons.bind(this);
		EE.addListener("RESIZE", this.onResize);
		//
		this.headcont = this.addChild(new PIXI.Sprite());
		this.headcont.scale.set(1.3)
		this.cont = this.headcont.addChild(new PIXI.Sprite());
		this.cont.interactive = true; //need for touch scroll
		this.cont.hitArea = new PIXI.Rectangle(450, 204, 1259, 380);
		//(this.cont as any).dragging = false; //need for touch scroll
		this.cont
			.on('mousedown', this.onDragStart)
			.on('mouseup', this.onDragEnd)
			.on('touchstart', this.onTouchStart)
			.on('touchend', this.onTouchEnd)
			.on('mouseupoutside', this.onDragEnd)
			.on('touchendoutside', this.onDragEnd)
			//.on('mousemove', this.onDragMove)
			//.on('touchmove', this.onTouchMove);

		EE.addListener(UPDATE_BIG_BUTTONS, this.updateHub);
		//
		/*getGames((e:any)=>{
			updateGames(e)
			this.updateHub();
		})*/
		this.updateHub();
		//
		EE.emit('FORCE_RESIZE');
		EE.addListener('SLIDER_ACTION', this.moveIcons)
	}

	/**
	 * arrangement of module elements depending on the screen size
	 * @param data	object {w, h, scale}
	 */
	onResize(data:any) {
		this.cont.x = 0;
		//
		let wdth = (data.w/data.scale);
		let hght = (data.h/data.scale);
		let yy = (hght - PAGE_SIZE_DEFAULT.height)/2;
		if(yy<0) yy = 0;
		this.headcont.y = yy;
		this.headcont.x = (wdth - MAX_COUNT_COLUMN*WIDTH_COLUMN)/2 - 380;
	}

	moveIcons(obj:any) {
		old_page = current_page;
		current_page = obj.page;
		this.placeIcons();
	}

	/**
	 * build game list
	 */
	updateHub() {
		this.cont.removeChildren();
		current_page = 0;
		//
		gsap.to(this.cont, {
			duration: 0.3,
			alpha: 1
		});
		//
		game_icons = [];
		let gamearray = [];
		switch (SELECTED_PART) {
			case 1:
				gamearray = _.concat(Games.firelinks, Games.fishes, Games.slots);
				break;
			case 2:
				gamearray = Games.fishes;
				break;
			case 3:
				gamearray = Games.slots;
				break;
			case 4:
				gamearray = Games.firelinks;
				break;
		}

		let yy = 0;
		//let countsmall = 0;
		let totalcolumn = 0;
		for (const game of gamearray) {
			/*
			http://www.fishglory.mobi/frontend/Default/ico/MagicDragonsNG.png

			id: 5861
			orientation: 0
			size: "small"
			src: "/frontend/Default/ico/WickedCircusYGG.png"
			tag: "hot"
			url: "/game/open/WickedCircusYGG?api_exit=/"
			 */
			//if(game.src.indexOf('http://')===-1) game.src = "http://www.fishglory.mobi"+game.src;
			game.src = "pic.png";
			let item;
			yy = 20;
			item = new Icon(game, gamearray.length);
			totalcolumn++;
			item.y = yy;
			item.column = totalcolumn;
			//
			game_icons.push(item);
		}

		this.placeIcons();

		EE.emit('UPDATE_CONTROL', {totalcolumn: totalcolumn});
	}

	async placeIcons() {
		gsap.killTweensOf(this.cont);
		this.cont.x = 0;
		await new Promise((resolve) => {
			let endX1 = 0;
			let endX2 = 0;
			if(old_page>current_page) {
				endX1 = 200;
				endX2 = -100;
			}
			if(old_page<current_page) {
				endX1 = -200;
				endX2 = 100;
			}
			gsap.to(this.cont, {
				duration: 0.3,
				alpha: 0,
				x: endX1,
				onComplete: ()=>{
					this.cont.x = endX2;
					resolve(null);
				}
			});
		});
		this.cont.removeChildren();
		const pg = current_page + 1;
		for(let i=0;i<game_icons.length;i++) {
			const item:any = game_icons[i];
			if(item.page===pg) {
				this.cont.addChild(item);
			}
		}
		gsap.to(this.cont, {
			duration: 0.3,
			alpha: 1,
			x: 0,
			onComplete: ()=>{

			}
		});
	}

	onDragStart(e:any)
	{
		startSlideX = e.data.originalEvent.pageX;
	}

	onTouchStart(e:any)
	{
		startSlideX = e.data.getLocalPosition(this.parent).x;
	}

	onTouchEnd(e:any) {
		const newX = e.data.getLocalPosition(this.parent).x;
		const delta = startSlideX - newX;
		if(Math.abs(delta)<50) return;
		//
		if(delta<0) {
			EE.emit('SLIDER_L');
		} else {
			EE.emit('SLIDER_R');
		}
	}

	onDragEnd(e:any)
	{
		const newX = e.data.originalEvent.pageX;
		const delta = startSlideX - newX;
		if(Math.abs(delta)<50) return;
		//
		if(delta<0) {
			EE.emit('SLIDER_L');
		} else {
			EE.emit('SLIDER_R');
		}
	}
}