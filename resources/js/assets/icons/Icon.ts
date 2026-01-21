import * as PIXI from "pixi.js";
//import {HotTag} from "./HotTag";
//import {NewTag} from "./NewTag";
//import {gsap} from "gsap";
//
import {MAX_COUNT_COLUMN, WIDTH_COLUMN} from "../../common/Config";

const  masks:any = {
	1: [{x:42, y:75},		{x:45, y:57},		{x:61, y:43},		{x:191, y:28},		{x:210, y:39},		{x:215, y:57},		{x:215, y:339},		{x:210, y:356},		{x:197, y:369},		{x:61, y:355},		{x:46, y:342},		{x:42, y:325}	],
	2: [{x:52, y:81},		{x:59, y:61},		{x:77, y:46},		{x:265, y:35},		{x:284, y:46},		{x:296, y:68},		{x:296, y:380},		{x:284, y:401},		{x:265, y:413},		{x:77, y:402},		{x:57, y:387},		{x:52, y:368}	],
	3: [{x:74, y:93},		{x:89, y:67},		{x:114, y:51},	{x:362, y:51},		{x:387, y:67},		{x:397, y:92},		{x:397, y:442},		{x:387, y:465},		{x:361, y:483},		{x:115, y:488},		{x:90, y:471},		{x:74, y:446}	],
	4: [{x:62, y:68},		{x:75, y:46},		{x:94, y:34},		{x:282, y:46},		{x:301, y:60},		{x:313, y:81},		{x:313, y:367},		{x:301, y:388},		{x:282, y:402},		{x:94, y:413},		{x:76, y:400}, 	  {x:62, y:380}	],
	5: [{x:39, y:56},		{x:44, y:37},		{x:59, y:27},		{x:195, y:43},		{x:209, y:56},		{x:213, y:73},		{x:213, y:323},		{x:209, y:341},		{x:194, y:353},		{x:58, y:366},		{x:44, y:356},		{x:39, y:337}	]
};
/**
 * Big game icon
 */
export class Icon extends PIXI.Sprite{
	cont:PIXI.Sprite;
	piccont:PIXI.Sprite;
	_page:number = 0;
	_column:number = 0;
	total_icons:number = 0;
	id:number = 0;
	SRC:string = "";
	/**
	 * Big game icon
	 * @param data	game data object
	 */
	constructor(data:any, total_icons:number) {
		super();
		//
		this.total_icons = total_icons;
		this.cont = this.addChild(new PIXI.Sprite());
		this.piccont = this.cont.addChild(new PIXI.Sprite());
		this.createView = this.createView.bind(this);

		//
		this.id = data.id;
		this.SRC = data.src;
		//
		this.on('click', this.onClick, this);
		this.on('tap', this.onClick, this);
		//
		this.interactive = true;
		this.buttonMode = true;
		//
		//gsap.set(this, {pixi: {skewY: 5}});


	}

	createView(real_col:number) {
		//
		let coords = masks[real_col];
		const back = this.cont.addChildAt(new PIXI.Graphics(), 0).beginFill(0x006600, 1).moveTo(coords[0].x,coords[0].y)
		for(let i=1;i<coords.length;i++) {
			back.lineTo(coords[i].x,coords[i].y);
		}
		back.lineTo(coords[0].x,coords[0].y);
		back.endFill();
		//
		this.piccont.mask =	back;
		const img = PIXI.Sprite.from(this.SRC);
		this.piccont.addChild(img);
		if(real_col===1) {
				img.x = 0;
				img.y = 25;
				img.scale.set(0.75, 0.72);
				this.x = 520;
				this.y = 98;
		}
		if(real_col===2) {
				img.x = 25;
				img.y = 28;
				img.scale.set(0.75, 0.85);
				this.x = 720;
				this.y = 72;
		}
		if(real_col===3) {
			img.x = 68;
			img.y = 48;
			//img.scale.set(0.9, 0.95);
			this.x = (real_col-1)*WIDTH_COLUMN;
			this.y = 32;
		}
		if(real_col===4) {
				img.x = 20;
				img.y = 26;
				img.scale.set(0.8, 0.85);
				this.x = 1365;
				this.y = 72;
		}
		if(real_col===5) {
			img.x = -3;
			img.y = 24;
			img.scale.set(0.62, 0.70);
			this.x = 1675;
			this.y = 98;
		}


	}

	onClick() {
		console.log(this.id, this.page);
	}

	set column(val:number) {
		this._column = val;
		this.page = Math.ceil(val/MAX_COUNT_COLUMN);
		//
		const totalpages = Math.ceil(this.total_icons/MAX_COUNT_COLUMN);
		const count_on_last_page = this.total_icons - (MAX_COUNT_COLUMN*(totalpages-1));
		//
		let real_col = val%MAX_COUNT_COLUMN;
		if(real_col===0) real_col = MAX_COUNT_COLUMN;

		if(this.page===totalpages && count_on_last_page===3) {
			if(real_col===3) real_col = 4;
			if(real_col===2) real_col = 3;
			if(real_col===1) real_col = 2;
		}
		if(this.page===totalpages && count_on_last_page===2) {
			if(real_col===2) real_col = 4;
			if(real_col===1) real_col = 3;
		}
		if(this.page===totalpages && count_on_last_page===1) {
			real_col = 3;
		}
		//
		let type_icon =real_col;
		const json0 = PIXI.Loader.shared.resources[`/images/fish/anim/icon${type_icon}.json`].spritesheet;
		const array0: any = [];
		if (json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate = new PIXI.AnimatedSprite(array0);
		animate.animationSpeed = 0.3;
		animate.loop = true;
		animate.scale.set(0.95);
		this.cont.addChild(animate);
		animate.gotoAndPlay(1);
		if(type_icon===1) {
			animate.y = -13;
		}
		if(type_icon===4) {
			animate.y = -5;
		}
		if(type_icon===5) {
			animate.y = -17;
		}
		//this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from(`/images/fish/icon${real_col}.png`)));
		this.createView(real_col);
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