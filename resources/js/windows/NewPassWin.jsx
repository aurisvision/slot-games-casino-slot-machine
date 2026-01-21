import React from 'react';
import { EE } from '../App';
import '../css/newpass.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";
import { newPassword } from '../server/server';

const defaultText1 = "Enter new password";
const defaultText2 = "Retype new password";
const errorPassLength = "Input password must be 6-16 chars";
const errorPassMatch = "Password & repeat password must match";

export class NewPassWin extends React.Component {
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-npass__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onChange () {
		const err = document.getElementsByClassName("modal-window-npass__error")[0];
		const errtext = document.getElementsByClassName("modal-window-npass__error-text")[0];
		const pass1 = document.getElementsByClassName("modal-window-npass__pass1")[0];
		const pass2 = document.getElementsByClassName("modal-window-npass__pass2")[0];
		errtext.textContent = "";
		if(pass1.value.length<5) {
			errtext.textContent = errorPassLength;
		}
		if(pass1.value !== pass2.value) {
			errtext.textContent = errorPassMatch;
		}
		if(errtext.textContent !== "") {
			err.style.opacity = 1;
			setTimeout(() => {
				err.style.opacity = 0;
			}, 2000);
			return;
		}
		//
		this.onClose();
		newPassword(pass1.value, this.onClose);
	}

	onBlur1 (e) {
		if(e.target.value==="") e.target.value = defaultText1;
	}
	onBlur2 (e) {
		if(e.target.value==="")	e.target.value = defaultText2;
	}

	onFocus (e) {
		e.target.value = '';
	}

	onInput (e) {
		if (e.target.value.length > 16) {
			e.target.value = e.target.value.slice(0,16);
		}
	}

	onClose () {
		this.props.onClose();
	}

	render () {
		return (
			<div className="modal-window-npass">
				<div className="modal-window-npass__scale-cont">
					<span className="modal-window-npass__info-text">{"A strong password should contain 6-16 characters."}</span>
					<input className="modal-window-npass__pass1 modal-window-npass__fields" type="text" /*onFocus={this.onFocus}*/ onInput={this.onInput} placeholder={defaultText1} />
					<input className="modal-window-npass__pass2 modal-window-npass__fields" type="text" /*onFocus={this.onFocus}*/ onInput={this.onInput} placeholder={defaultText2} />
					<div className="modal-window-npass__error">
						<span className="modal-window-npass__error-text">{""}</span>
						<img  src="/images/frenzy/pass_err.png" alt=""/>
					</div>
					<img className="modal-window-npass__close game-button" onClick={this.onClose} src="/images/frenzy/bonus_close.png" alt=""/>
					<img className="modal-window-npass__ok game-button" onClick={this.onChange} src="/images/frenzy/change_p_btn.png" alt=""/>
					<img className="modal-window-npass__back" src="/images/frenzy/pass_back.png" alt=""/>
				</div>
			</div>
		)
	}
}