import React from 'react';
import { EE } from '../App';
import '../css/adv.css';
import {gsap} from "gsap";
import {PAGE_SIZE_DEFAULT} from "../common/Config";

const logoimages = [
	"/images/frenzy/login/logo/logo0001.png",
	"/images/frenzy/login/logo/logo0002.png",
	"/images/frenzy/login/logo/logo0003.png",
	"/images/frenzy/login/logo/logo0004.png",
	"/images/frenzy/login/logo/logo0005.png",
	"/images/frenzy/login/logo/logo0006.png",
	"/images/frenzy/login/logo/logo0007.png",
	"/images/frenzy/login/logo/logo0008.png",
	"/images/frenzy/login/logo/logo0009.png",
	"/images/frenzy/login/logo/logo0010.png",
	"/images/frenzy/login/logo/logo0011.png",
	"/images/frenzy/login/logo/logo0012.png",
	"/images/frenzy/login/logo/logo0013.png",
	"/images/frenzy/login/logo/logo0014.png",
	"/images/frenzy/login/logo/logo0015.png",
	"/images/frenzy/login/logo/logo0016.png",
	"/images/frenzy/login/logo/logo0017.png",
	"/images/frenzy/login/logo/logo0018.png",
	"/images/frenzy/login/logo/logo0019.png",
	"/images/frenzy/login/logo/logo0020.png",
	"/images/frenzy/login/logo/logo0021.png",
	"/images/frenzy/login/logo/logo0022.png",
	"/images/frenzy/login/logo/logo0023.png",
	"/images/frenzy/login/logo/logo0024.png",
	"/images/frenzy/login/logo/logo0025.png",
	"/images/frenzy/login/logo/logo0026.png",
	"/images/frenzy/login/logo/logo0027.png",
	"/images/frenzy/login/logo/logo0028.png",
	"/images/frenzy/login/logo/logo0029.png",
	"/images/frenzy/login/logo/logo0030.png",
	"/images/frenzy/login/logo/logo0031.png",
	"/images/frenzy/login/logo/logo0032.png",

];

export class AdvWin extends React.Component {
	i=0;
	int = 0;
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
		this.animateLogo = this.animateLogo.bind(this);
	}

	componentWillUnmount() {
		clearInterval(this.int);
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
		this.int = setInterval(this.animateLogo, 50);
		const btn = document.getElementById("btn-adv");
		if(btn) {
			gsap.to(btn, {duration:0.3, scale: 0.9, yoyo: true, repeat: -1})
		}
	}

	animateLogo() {
		const img = document.getElementById("logo-adv");
		if(img) {
			img.src = logoimages[this.i];
			this.i++;
			if (logoimages.length === this.i) {
				this.i = 0;
			}
		}
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-adv__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onClose () {
		this.props.onClose();
	}

	goRegister() {
		EE.emit('SHOW_REG');
	}

	render () {
		return (
			<div className="modal-window-adv">
				<div className="modal-window-adv__scale-cont">
					<div className="modal-window-adv__logo">
						<img className="modal-window-adv__logo1" src="" id={"logo-adv"} alt=""/>
					</div>
					<div className="modal-window-adv__down">
						<img className="modal-window-adv__close game-button" onClick={this.onClose}
							 src="/images/frenzy/bonus_close.png" alt=""/>
						<img className="modal-window-adv__btn game-button" onClick={this.goRegister}  id={"btn-adv"}
							 src="/images/frenzy/reg_btn.png" alt=""/>
						<img className="modal-window-adv__back" src="/images/frenzy/adv.png" id={"back-adv"} alt=""/>
					</div>
				</div>
				<div className="modal-window-fill-backevent"
					 onClick={(e) => this.setState({keyboardVisible: false})}
				/>
			</div>
		)
	}
}