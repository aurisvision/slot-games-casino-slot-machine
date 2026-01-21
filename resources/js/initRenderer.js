import * as PIXI from "pixi.js";
import {PAGE_SIZE_DEFAULT} from "./common/Config";

/**
 *  Creates the Renderer
 *
 *  @returns {PIXIRenderer}
 */
const initRenderer = () => {
		const renderer = new PIXI.Application({
			width: PAGE_SIZE_DEFAULT.width,
			height: PAGE_SIZE_DEFAULT.height,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			sharedTicker: true,
			antialias: true,
			backgroundAlpha: 0,
			resizeTo: window
		});
		renderer.view.className = "renderArea";
		document.getElementsByClassName("renderArea").oncontextmenu = (e) => {
			e.preventDefault();
		}

    const domgame = document.getElementById("AppGame");
    if(domgame) {
			domgame.appendChild(renderer.view);
			//
			let dom_overlay_container = document.createElement("div");
			dom_overlay_container.id = "dom_overlay_container";
			dom_overlay_container.style = `pointer-events:none; overflow:hidden; width:100%; height:100%; position: absolute; left: 0; top: 0; display: block;`;
			domgame.appendChild(dom_overlay_container);
		}

    // Return the reference of the renderer
    return renderer.renderer;
};

export default initRenderer;
