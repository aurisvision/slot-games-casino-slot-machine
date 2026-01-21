import * as PIXI from "pixi.js";
import { Games } from "./Config";
import { isMobile as isMobilePixi } from '@pixi/utils';
import $ from 'jquery';

export let gamesLoader:PIXI.Loader;
export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const isMobile = (isMobilePixi.tablet || isMobilePixi.phone);
/**
 * Load config.json file
 */
export async function loadJsonData(): Promise<[]> {
	return new Promise((resolve) => {
		let jsonPath = 'config.json';
		const jsonLoader = new PIXI.Loader();
		jsonLoader.add('items', jsonPath);
		jsonLoader.onError.add((err: any, _loader: PIXI.Loader, resource: any) => {
			resolve([]);
			console.error('Error loading config.json: ' + err.message + '\nURL : ' + resource.url);
		});
		//add image upload
		jsonLoader.load(async (_loader, resources) => {
			gamesLoader = PIXI.Loader.shared;

			const data = (resources as any).items.data.games;
			if (data) {
				//three sections of the game
				const part1 = data.part1;
				const part2 = data.part2;
				const part3 = data.part3;
				let i=0;
				for (const item of part1) {
					Games.push({ part: "1", img: 'game1'+i, id: item.id, size: item.size, tag: item.tag });
					gamesLoader.add('game1'+i, item.src);
					i++;
				}
				i=0;
				for (const item of part2) {
					Games.push({ part: "2", img: 'game2'+i, id: item.id, size: item.size, tag: item.tag });
					gamesLoader.add('game2'+i, item.src);
					i++;
				}
				i=0;
				for (const item of part3) {
					Games.push({ part: "3", img: 'game3'+i, id: item.id, size: item.size, tag: item.tag });
					gamesLoader.add('game3'+i, item.src);
					i++;
				}
			}

			gamesLoader.onComplete.add(() => {
				PIXI.utils.clearTextureCache();
				resolve([]);
			});
			gamesLoader.load();
		});
	});
}

/**
 * Enable/disable watermark
 * @param visible true/false
 */
export function setWatermark(visible:boolean) {
	$('.watermark-game')[0].style.visibility = (visible?'visible':'hidden');
}

export function convertTimeToStr(secs:number):(string|number)[]
{
	const days = Math.floor(secs / 86400);
	secs -= days * 86400;

	const hours = Math.floor(secs / 3600);
	secs -= hours * 3600;

	const minutes = Math.floor(secs / 60);
	secs -= minutes * 60;

	let hh:string|number = Math.floor(hours);
	hh = hh<10?`0${hh}`:hh;
	let mm:string|number = Math.floor(minutes);
	mm = mm<10?`0${mm}`:mm;
	let ss:string|number = Math.floor(secs);
	ss = ss<10?`0${ss}`:ss;

	return [hh, mm, ss];
}

export function disableButton(element:Element|any)
{
	if(element && element.classList) {
		element.classList.add("grey-color");
	}
}

export function enableButton(element:Element|any)
{
	if(element && element.classList) {
		element.classList.remove("grey-color");
	}
}

export function validateEmail(email: string){
	const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regEx.test(email);
};