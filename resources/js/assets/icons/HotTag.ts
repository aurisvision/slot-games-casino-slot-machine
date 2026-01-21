import * as PIXI from "pixi.js";

/**
 * "Hot" label on the game
 */
export class HotTag extends PIXI.Sprite{
	cont:PIXI.Sprite;

	constructor() {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		const json0 = PIXI.Loader.shared.resources["/images/frenzy/anim/hot.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate0 = new PIXI.AnimatedSprite(array0);
		animate0.animationSpeed = 0.5;
		animate0.loop = true;
		//animate0.y = -3;
		this.cont.addChild(animate0);
		animate0.play();

	}

}
