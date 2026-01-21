import * as PIXI from "pixi.js";

/**
 * button model module
 */
export class ButtonItem extends PIXI.Sprite{
	cont:PIXI.Sprite;
	pic:PIXI.Sprite;
	dur:any;
	scl:any = 0.9; //scale for the pressed state
	onClick:any;

	/**
	 * button model module
	 * @param src	source image for button
	 * @param onClick	click function
	 */
	constructor(src:string, onClick?:any) {
		super();
		//
		this.onClick = onClick;
		this.cont = this.addChild(new PIXI.Sprite());
		this.pic = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from(src)));
		this.tapDown = this.tapDown.bind(this);
		this.tapUp = this.tapUp.bind(this);
		this.clickThis = this.clickThis.bind(this);

		this.on('pointerdown', this.tapDown);
		this.on('pointerup', this.tapUp);
		this.on('pointerupoutside', this.tapUp);
		this.on('pointercancel', this.tapUp);

		this.on('click', this.clickThis);
		this.on('tap', this.clickThis);

		this.interactive = true;
		this.buttonMode = true;

	}

	/**
	 * pressed button
	 */
	tapDown() {
		this.pic.x = (this.pic.width - (this.pic.width*this.scl))/2;
		this.pic.y = (this.pic.height - (this.pic.height*this.scl))/2;
		this.pic.scale.set(this.scl);
	}

	/**
	 * release button
	 */
	tapUp() {
		this.pic.x = 0;
		this.pic.y = 0;
		this.pic.scale.set(1);
	}

	/**
	 * click button
	 */
	clickThis() {
		if(this.onClick) this.onClick();
	}

}