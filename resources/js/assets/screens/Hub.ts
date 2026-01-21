import * as PIXI from "pixi.js";
import { HubDown } from "./elements/HubDown";
import {HubTop} from "./elements/HubTop";
import { SetADSetting, SetBonusStep, pageStatus, updatePageStatus } from "../../Game";
import { EE, showPopup } from "../../App";
export class Hub extends PIXI.Sprite{
	cont:PIXI.Sprite = new PIXI.Sprite();
	down:PIXI.Sprite = new PIXI.Sprite();
	hubTop: HubTop;
	isFirstOpen: Boolean;
	constructor() {
		super();
		//
		updatePageStatus(0);
		this.isFirstOpen = true;
		this.cont = this.addChild(new PIXI.Sprite());
		this.hubTop = this.cont.addChild(new HubTop());
		this.down = this.cont.addChild(new HubDown());
		//set watermark
		//setWatermark(true);
		this.readUserInfo();
		setInterval(() => { this.readUserInfo(); }, 5000);
	}

	readUserInfo() {
		var hubInstance = this;
		var t = (new Date()).getTime();
		
		if (pageStatus == 0) 
		{			
			window.localStorage.setItem('game_orientation', 'landscape');

			fetch('/jpstv.json?page=hub&r=' + t, { method: 'GET' })
				.then(response => response.json())
				.then(response => {
					if (response.status == "logout") {
						var isMobile;
						if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
							// true for mobile device                
							isMobile = true;
						}
						else {
							// false for not mobile device
							isMobile = false;
						}

						if (!isMobile)
							window.location.href = '/logout';
						else {
							var data = JSON.stringify({ event: 'Logout', value: "logout" });
							window.postMessage(data, "*");
							window.location.href = '/logout';
						}
						return;
					}
					if(hubInstance.isFirstOpen)
					{
						hubInstance.isFirstOpen = false;						
					}
					hubInstance.hubTop.back.user.moneyuser.text = response['balance'];
					var content = response.content;				
					this.hubTop.back.jackpot.text = content[3]['jackpot'];  
					this.hubTop.back.jackpot.x = 315 - (this.hubTop.back.jackpot.width/2);
					this.hubTop.back.jackpot.y = 53;
					
					SetBonusStep(response.bonusStatus);

					//read game bonus
					if (response.won_bonuses) {
						for (var i = 0; i < response.won_bonuses.length; i++) {
							var won_bonus = response.won_bonuses[i];
							var description = won_bonus.description;
							var id = won_bonus.id;
							var last_bonus = window.localStorage.getItem('bonus' + id);
							if (last_bonus != won_bonus.date) {
								window.localStorage.setItem('bonus' + id, won_bonus.date);
								showPopup("You have won " + description + " " + won_bonus.amount + " credits");
								break;
							}
						}
					}

					if(response.settings)
					{
						if(response.settings['maintenance'] == 1)
						{
							EE.emit('SHOW_MAINTEN');
						}
						else
						{
							if(response.settings['ad'] == 1)
							{
								SetADSetting(1);
								var giveAway = window.localStorage.getItem('giveaway') == undefined ? 0 : parseInt(window.localStorage.getItem('giveaway')!);
								var curTime = new Date().getTime();
								if(curTime - giveAway > 24 * 3600 * 1000)
								{
									EE.emit('SHOW_ADV');									
									window.localStorage.setItem('giveaway', curTime+'');
								}
							}							
						}
					}
				});
		}

	}
}