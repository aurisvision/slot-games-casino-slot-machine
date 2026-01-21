import * as PIXI from "pixi.js";
import {Games, SELECTED_PART, SetGames, UPDATE_BIG_BUTTONS} from "../../Game";
import { Icon2 } from "../icons/Icon2";
import {MAX_COUNT_COLUMN, PAGE_SIZE_DEFAULT, WIDTH_COLUMN} from "../../common/Config";
import {gsap} from "gsap";
import {EE, showPopup} from "../../App";
import { getGames } from "../../server/server";
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
let move = false;

export class HubIcons3 extends PIXI.Sprite{
	cont:PIXI.Sprite;
	headcont:PIXI.Sprite;
	total_pages:number = 0;
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
		this.placeIcons = this.placeIcons.bind(this);
		EE.addListener("RESIZE", this.onResize);
		//
		this.headcont = this.addChild(new PIXI.Sprite());
		//this.headcont.x = 400;
		this.cont = this.headcont.addChild(new PIXI.Sprite());
		this.cont.interactive = true; //need for touch scroll
		this.cont.hitArea = new PIXI.Rectangle(0, -50, MAX_COUNT_COLUMN*WIDTH_COLUMN, 770);
		//(this.cont as any).dragging = false; //need for touch scroll
		this.cont
			.on('mousedown', this.onDragStart, this)
			.on('mouseup', this.onDragEnd, this)
			.on('touchstart', this.onTouchStart, this)
			.on('touchend', this.onTouchEnd, this)
			.on('mouseupoutside', this.onDragEnd, this)
			.on('touchendoutside', this.onDragEnd, this)

		EE.addListener(UPDATE_BIG_BUTTONS, this.updateHub);
		//
		//
		EE.emit('FORCE_RESIZE');
		getGames((e:any)=>{
			var games = JSON.parse(e);
			games.fav = games.fav.split(',');
			SetGames(games);			
			this.updateHub();
		})
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
		this.headcont.x = (wdth - MAX_COUNT_COLUMN*WIDTH_COLUMN)/2;
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
		this.Games = Games;
		var fishes = _.concat(this.Games.fishes);
		var casinos = _.concat(this.Games.casinos);
		var slots = _.concat(this.Games.slots);
		if(SELECTED_PART == 5 && slots.length == 0)
		{
			showPopup("Please contact administrator to enable slots");
		}
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

		let totalcolumn = 0;
		this.buildGames(gamearray, 0);
		
		if(game_icons.length) {
			totalcolumn = (game_icons[game_icons.length - 1] as any).column;
		}

		this.placeIcons();

		EE.emit('UPDATE_CONTROL', {totalcolumn: totalcolumn});
	}

	buildGames(gamearray:any, totalcolumn:number) {
		let item;
		let yy = 0;
		game_icons = [];
		for (const game of gamearray) {
			yy=20;
			item = new Icon2(game);
			item.y = yy;
			totalcolumn++;
			item.column = totalcolumn;
			this.cont.addChildAt(item,0);
			//
			game_icons.push(item);
		}
		this.total_pages = Math.round(game_icons.length/MAX_COUNT_COLUMN);

	}

	async placeIcons() {
		move = true;
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
				duration: 0.2,
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
				move = false;
			}
		});
	}

	onDragStart(e:any)
	{
		startSlideX = e.data.originalEvent.pageX;
	}

	onTouchStart(e:any)
	{
		startSlideX = e.data.getLocalPosition(this.cont).x;
	}

	onTouchEnd(e:any) {
		const newX = e.data.getLocalPosition(this.cont).x;
		const delta = startSlideX - newX;
		if(Math.abs(delta)<50 || move) return;
		//
		old_page = current_page;
		if(delta<0) {
			current_page--;
			if(current_page<0) {
				current_page=0;
				return;
			}
			this.placeIcons();
		} else {
			current_page++;
			if(current_page >= this.total_pages) {
				current_page = this.total_pages - 1;
				return;
			}
			this.placeIcons();
		}
	}

	onDragEnd(e:any)
	{
		console.log(move, current_page)
		const newX = e.data.originalEvent.pageX;
		const delta = startSlideX - newX;
		if(Math.abs(delta)<50 || move) return;
		//
		console.log('++', delta)
		old_page = current_page;
		if(delta<0) {
			current_page--;
			if(current_page<0) {
				current_page=0;
				return;
			}
			this.placeIcons();
		} else {
			current_page++;
			if(current_page >= this.total_pages) {
				current_page = this.total_pages - 1;
				return;
			}
			this.placeIcons();
		}
	}
}