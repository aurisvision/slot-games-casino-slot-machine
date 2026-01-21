import React from 'react';
import $ from 'jquery';
import { EE } from '../App';
import '../css/reg.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";
import {isMobile} from "../common/Utils";
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';
import { give_info } from '../server/server';

export class RegWin extends React.Component {
	curElement = 0;
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
		this.onRegistration = this.onRegistration.bind(this);
		this.handleFocusName = this.handleFocusName.bind(this);
		this.handleFocusPhone = this.handleFocusPhone.bind(this);
		this.handleFocusEmail = this.handleFocusEmail.bind(this);
		this.handleFocusCom = this.handleFocusCom.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangePhone = this.onChangePhone.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangeCom = this.onChangeCom.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onChange = this.onChange.bind(this);
		this.refName = React.createRef();
		this.refEmail = React.createRef();
		this.refCom = React.createRef();
		this.refPhone = React.createRef();
		this.state = {
			keyboardVisible: false,
			inputNode: null,
			layoutName: "default",
			inputName: "",
			inputEmail: "",
			inputCom: "",
			inputPhone: "",
		}
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-reg__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onRegistration () {
		this.setState({keyboardVisible: false});
		const name = document.getElementsByClassName('modal-window-reg__name')[0];
		const phone = document.getElementsByClassName('modal-window-reg__phone')[0];
		const email = document.getElementsByClassName('modal-window-reg__email')[0];
		const comm = document.getElementsByClassName('modal-window-reg__comment')[0];
		if(name.value == '')
		{
			alert('Please input name');
			return;
		}
		if(phone.value == '')
		{
			alert('Please input phone number');
			return;
		}
			
		if(email.value == '')
		{
			alert('Please input email address');
			return;
		}
		
		give_info({name: name.value, phone: phone.value, email: email.value, comment: comm.value}, (response)=>{
			var data = JSON.parse(response);
			if(data.result == 'success')
			{
				alert('Your info saved successfully');
			}
			else
			{
				alert(data.message);
			}
		})
		console.log(name.value, phone.value, email.value, comm.value);
	}

	onClose () {
		this.setState({keyboardVisible: false});
		this.props.onClose();
	}

	onInput(e) {
		if (e.target.value.length > 30) {
			e.target.value = e.target.value.slice(0,30);
		}
	}

	handleFocusName() {
		this.curElement = 1;
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '219px';
		}
		this.setState({
			inputNode: this.refName,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputName);
	}

	handleFocusPhone() {
		this.curElement = 2;
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '309px';
		}
		this.setState({
			inputNode: this.refPhone,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputPhone);
	}

	handleFocusEmail() {
		this.curElement = 3;
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '399px';
		}
		this.setState({
			inputNode: this.refEmail,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputEmail);
	}

	handleFocusCom() {
		this.curElement = 4;
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '529px';
		}
		this.setState({
			inputNode: this.refCom,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputCom);
	}

	handleShift() {
		const layoutName = this.state.layoutName;

		this.setState({
			layoutName: layoutName === "default" ? "shift" : "default"
		});
	}

	onKeyPress(button) {
		switch (button) {
			case '{shift}':
			case '{lock}':
				this.handleShift();
				break;
			case '{enter}':		
				let el = $('.modal-window-reg__name');
				if(this.curElement===1) {
					el = $('.modal-window-reg__phone');
				}
				if(this.curElement===2) {
					el = $('.modal-window-reg__email');
				}
				if(this.curElement===3) {
					el = $('.modal-window-reg__comment');
				}
				if(this.curElement===4) {
					this.onRegistration();
					return;
				}
				setTimeout(() => {
					el.focus();
				}, 10);			
				break;
		}
	}

	onChange(input) {
		switch (this.state.inputNode) {
			case this.refName:
				this.setState({ inputName:input });
				break;
			case this.refPhone:
				this.setState({ inputPhone:input });
				break;
			case this.refEmail:
				this.setState({ inputEmail:input });
				break;
			case this.refCom:
				this.setState({ inputCom:input });
				break;
		}
	}

	onChangeName(event) {
		const inputName = event.target.value;
		this.setState({ inputName });
		if(this.keyboard) this.keyboard.setInput(inputName);
	}

	onChangePhone(event) {
		const inputPhone = event.target.value;
		this.setState({ inputPhone });
		if(this.keyboard) this.keyboard.setInput(inputPhone);
	}

	onChangeEmail(event) {
		const inputEmail = event.target.value;
		this.setState({ inputEmail });
		if(this.keyboard) this.keyboard.setInput(inputEmail);
	}

	onChangeCom(event) {
		const inputCom = event.target.value;
		this.setState({ inputCom });
		if(this.keyboard) this.keyboard.setInput(inputCom);
	}

	render () {
		return (
			<div className="modal-window-reg">
				<div className="modal-window-reg__scale-cont">
					<input className="modal-window-reg__name modal-window-reg__fields"
								 type="text"
								 value={this.state.inputName}
								 onInput={this.onInput}
								 onFocus={this.handleFocusName}
								 onChange={this.onChangeName}
								 ref={this.refName}
								 placeholder={"Name"}
					/>
					<input className="modal-window-reg__phone modal-window-reg__fields"
								 type="text"
								 value={this.state.inputPhone}
								 onInput={this.onInput}
								 onFocus={this.handleFocusPhone}
								 onChange={this.onChangePhone}
								 ref={this.refPhone}
								 placeholder={"Phone"}
					/>
					<input className="modal-window-reg__email modal-window-reg__fields"
								 type="text"
								 value={this.state.inputEmail}
								 onInput={this.onInput}
								 onFocus={this.handleFocusEmail}
								 onChange={this.onChangeEmail}
								 ref={this.refEmail}
								 placeholder={"Email"}
					/>
					<textarea className="modal-window-reg__comment modal-window-reg__fields"
										type="text"
										value={this.state.inputCom}
										onInput={this.onInput}
										onFocus={this.handleFocusCom}
										onChange={this.onChangeCom}
										ref={this.refCom}
										placeholder={"Comment"}
					/>
					<img className="modal-window-reg__close game-button" onClick={this.onClose} src="/images/frenzy/bonus_close.png" alt=""/>
					<img className="modal-window-reg__get game-button" onClick={this.onRegistration} src="/images/frenzy/register/get.png" alt=""/>
					<img className="modal-window-reg__back" src="/images/frenzy/register/back2.png" alt=""/>
					<div className={`game-keyboard ${(this.state.keyboardVisible?'game-keyboard-on':'game-keyboard-off')}`}>
						{isMobile?'':
							<Keyboard
								keyboardRef={r => (this.keyboard = r)}
								layoutName={this.state.layoutName}
								onChange={this.onChange}
								onKeyPress={this.onKeyPress}
							/>}
					</div>
				</div>
				<div className="modal-window-fill-backevent"
						 onClick={(e)=>this.setState({keyboardVisible: false})}
				/>
			</div>
		)
	}
}