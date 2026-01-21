import * as PIXI from "pixi.js";
import {SELECTED_PART, updateSelectButton, UPDATE_BIG_BUTTONS} from "../../../Game";
import {EE} from "../../../App";

/**
 * game list filter button
 */
export class GameButton extends PIXI.Sprite{
	cont:PIXI.Sprite;
	pic:PIXI.Sprite;

	/**
	 * id type button. 1-fav 2-all, 3-fish
	 */
	ID:number;

	/**
	 * game list filter button
	 * @param idd	1-fav 2-all, 3-fish
	 */
	constructor(idd:number) {
		super();
		//
		this.ID = idd;
		this.updateState = this.updateState.bind(this);
		this.tapDown = this.tapDown.bind(this);
		this.tapUp = this.tapUp.bind(this);
		this.clickThis = this.clickThis.bind(this);


		//button animation
		this.cont = this.addChild(new PIXI.Sprite());
		this.pic = this.cont.addChild(new PIXI.Sprite());
		let name_file = 'fav.json';
		if(idd===2) name_file = 'all.json';
		if(idd===3) name_file = 'fish.json';
		//
		const json01 = PIXI.Loader.shared.resources[`/images/frenzy/anim/${name_file}`].spritesheet;
		const array01:any = [];
		if(json01) {
			Object.keys(json01.textures).sort().forEach((key) => {
				array01.push(json01.textures[key]);
			});
		}

		const animate5 = new PIXI.AnimatedSprite(array01);
		animate5.animationSpeed = 0.3;
		animate5.loop = true;
		animate5.y = 0;
		animate5.x = 0;
		this.pic.addChild(animate5);
		animate5.gotoAndPlay(1);
		//
		this.on('pointerdown', this.tapDown);
		this.on('pointerup', this.tapUp);
		this.on('pointerupoutside', this.tapUp);
		this.on('pointercancel', this.tapUp);

		this.on('click', this.clickThis);
		this.on('tap', this.clickThis);
		//
		EE.addListener(UPDATE_BIG_BUTTONS, this.updateState);
		this.updateState();
		//
		this.interactive = true;
		this.buttonMode = true;

	}

	/**
	 * mouse down
	 */
	tapDown() {
		if(this.ID===SELECTED_PART) return;
		this.pic.x = 8;
		this.pic.y = 8;
		this.pic.scale.set(0.9);
	}

	/**
	 * mouse up
	 */
	tapUp() {
		if(this.ID===SELECTED_PART) return;
		this.pic.x = 0;
		this.pic.y = 0;
		this.pic.scale.set(1);
	}

	/**
	 * click button
	 */
	clickThis() {
		if(this.ID===SELECTED_PART) return;
		this.tapUp();
		updateSelectButton(this.ID);
		this.updateState();
	}

	/**
	 * updates the state of the button (select/unselect)
	 */
	updateState() {

	}



}