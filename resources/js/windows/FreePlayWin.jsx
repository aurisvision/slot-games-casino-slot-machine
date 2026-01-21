import React from 'react';
import { EE, showPopup } from '../App';
import '../css/freeplay.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";
import {isMobile} from "../common/Utils";
import Keyboard from "react-simple-keyboard";
import 'react-simple-keyboard/build/css/index.css';
import { signUp } from '../server/server';
import { validateEmail } from '../common/Utils';

export class FreePlayWin extends React.Component {
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
		this.handleFocusName = this.handleFocusName.bind(this);
		this.handleFocusPhone = this.handleFocusPhone.bind(this);
		this.handleFocusEmail = this.handleFocusEmail.bind(this);
		this.handleFocusPass = this.handleFocusPass.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangePhone = this.onChangePhone.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePass = this.onChangePass.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onChange = this.onChange.bind(this);
		this.refName = React.createRef();
		this.refEmail = React.createRef();
		this.refPass = React.createRef();
		this.refPhone = React.createRef();
		this.state = {
			keyboardVisible: false,
			inputNode: null,
			layoutName: "default",
			inputName: "",
			inputEmail: "",
			inputPass: "",
			inputPhone: "",
		}
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-fp__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onSubmit () {
		var token = document.getElementById('root').getAttribute('token');
		var username = $('.modal-window-fp__name')[0].value;
		var password = $('.modal-window-fp__pass')[0].value;
		var phone = $('.modal-window-fp__phone')[0].value;
		var email = $('.modal-window-fp__email')[0].value;  
		if(username == '')
		{
			showPopup("Please input username");
			return;
		}
		if(password == '')
		{
			showPopup("Please input password")
			return;
		}	
		if(!validateEmail(email))
		{
			showPopup("Please input valid email address");
			return;
		}
		var data = {
			username: username,
			password: password,
			phone: phone,
			email: email,
			_token: token
		}		
		signUp(data, (e) => {
			var result = JSON.parse(e);
			showPopup(result.message);
		});
	}

	onClose () {
		this.props.onClose();
		EE.emit('SHOW_LOGIN');
	}

	onInput(e) {
		if (e.target.value.length > 30) {
			e.target.value = e.target.value.slice(0,30);
		}
	}

	handleFocusName() {
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '241px';
		}
		this.setState({
			inputNode: this.refName,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputName);
	}

	handleFocusPhone() {
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '462px';
		}
		this.setState({
			inputNode: this.refPhone,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputPhone);
	}

	handleFocusEmail() {
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '571px';
		}
		this.setState({
			inputNode: this.refEmail,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputEmail);
	}

	handleFocusPass() {
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '351px';
		}
		this.setState({
			inputNode: this.refPass,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputPass);
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
				this.goLogin();
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
			case this.refPass:
				this.setState({ inputPass:input });
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

	onChangePass(event) {
		const inputPass = event.target.value;
		this.setState({ inputPass });
		if(this.keyboard) this.keyboard.setInput(inputPass);
	}

	render () {
		return (
			<div className="modal-window-fp">				
				<div className="modal-window-fp__scale-cont">
					<input className="modal-window-fp__name modal-window-fp__fields"
								 type="text"
								 value={this.state.inputName}
								 onInput={this.onInput}
								 onFocus={this.handleFocusName}
								 onChange={this.onChangeName}
								 ref={this.refName}
					/>
					<input className="modal-window-fp__phone modal-window-fp__fields"
								 type="text"
								 value={this.state.inputPhone}
								 onInput={this.onInput}
								 onFocus={this.handleFocusPhone}
								 onChange={this.onChangePhone}
								 ref={this.refPhone}
					/>
					<input className="modal-window-fp__email modal-window-fp__fields"
								 type="text"
								 value={this.state.inputEmail}
								 onInput={this.onInput}
								 onFocus={this.handleFocusEmail}
								 onChange={this.onChangeEmail}
								 ref={this.refEmail}
					/>
					<input className="modal-window-fp__pass modal-window-fp__fields"
								 type="password"
								 onInput={this.onInput}
								 value={this.state.inputPass}
								 onFocus={this.handleFocusPass}
								 onChange={this.onChangePass}
								 ref={this.refPass}
					/>
					<img className="modal-window-fp__close game-button" onClick={this.onClose} src="/images/frenzy/bonus_close.png" alt=""/>
					<img className="modal-window-fp__submit game-button" onClick={this.onSubmit} src="/images/frenzy/register/submit.png" alt=""/>
					<img className="modal-window-fp__back" src="/images/frenzy/register/back.png" alt=""/>
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