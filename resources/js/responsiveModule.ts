import { RENDERER, stage} from "./Game";
import {EE} from "./App";
import { PAGE_SIZE_DEFAULT } from "./common/Config";
import {isSafari} from "./common/Utils";
export let BROWSER_WIDTH:number = 0;
export let BROWSER_HEIGHT:number = 0;
export let BROWSER_SCALE:number = 1;

const responsiveModule = () => {
	/*const isResp:boolean=true;
	const respDim:string='height';
	const isScale:boolean=true;
	const scaleType:number=1;
	const mainDiv = document.getElementById("AppGame");*/
	const anim_container = document.getElementById("AppGame");
	//const canvasdom = document.getElementsByClassName('renderArea');
	const dom_overlay_container = document.getElementById("dom_overlay_container");
	//const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	//(true,'both',true,1,[canvas,anim_container,dom_overlay_container]);
	const makeResponsive = () => {
		const domContainers = [anim_container,dom_overlay_container];
		//
		window.addEventListener('resize', resizeCanvas, false);
		window.addEventListener("orientationchange", resizeCanvas, false);
		EE.addListener("FORCE_RESIZE", resizeCanvas);
		resizeCanvas();
		function resizeCanvas() {
			const w = PAGE_SIZE_DEFAULT.width;
			const h = PAGE_SIZE_DEFAULT.height;
			//let iw = document.documentElement.clientWidth;
			//let ih = document.documentElement.clientHeight;
			let iw = Math.max(window.innerWidth, document.documentElement.clientWidth);
			let ih = Math.max(window.innerHeight, document.documentElement.clientHeight);
			// console.log('---------------- ', iw, ih)
			let vw = iw * 0.01;
			let vh = ih * 0.01;
			document.documentElement.style.setProperty('--vw', `${vw}px`);
			document.documentElement.style.setProperty('--vh', `${vh}px`);

			if(isSafari) {
				if(document.documentElement.clientHeight) {
					ih = Math.max(document.documentElement.clientHeight, Math.min(window.screen.width, window.screen.height));
					ih = Math.min(document.documentElement.clientHeight, ih);
				}
				if(window.innerHeight) {
					ih = window.innerHeight;
				}
			}
			const pRatio = 1;//window.devicePixelRatio || 1;
			const xRatio = iw/w;
			const yRatio = ih/h;
			let sRatio = Math.min(xRatio, yRatio);

			/*if(canvasdom) {
				canvasdom.width = w * pRatio * sRatio;
				canvasdom.height = h * pRatio * sRatio;
			}*/
			domContainers.forEach((container) => {
				const item:any = container;
				if(item) {
					item.style.width = w * sRatio + 'px';
					item.style.height = h * sRatio + 'px';
				}
			});
			if(stage) stage.scale.set(pRatio * sRatio);
			BROWSER_WIDTH = iw;
			BROWSER_HEIGHT = ih;
			BROWSER_SCALE = (pRatio * sRatio);
			//
			// console.log("resize w: " + iw + " h: " + ih + " ratio: " + sRatio );
			setTimeout(() => {
				if(RENDERER)
				RENDERER.resize(iw, ih);
			}, 300);
			
			EE.emit("RESIZE", {w:iw, h:ih, scale: sRatio });
		}
	}
	makeResponsive();
};

export default responsiveModule;