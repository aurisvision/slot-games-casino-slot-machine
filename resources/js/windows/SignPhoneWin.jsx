import React from 'react';
import { EE } from '../App';
import '../css/signphone.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";
import {isMobile} from "../common/Utils";
import Keyboard from "react-simple-keyboard";

const defaultText1 = "Phone Number";
const defaultText2 = "Referral Code";

export class SignPhoneWin extends React.Component {
	tim = 0;
	constructor(props) {
		super(props);

		this.onClose = this.onClose.bind(this);
		this.onVerify = this.onVerify.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmitModal = this.onSubmitModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.handleFocusPhone = this.handleFocusPhone.bind(this);
		this.handleFocusCode = this.handleFocusCode.bind(this);
		this.handleFocusCode2 = this.handleFocusCode2.bind(this);
		this.onChangePhone = this.onChangePhone.bind(this);
		this.onChangeCode = this.onChangeCode.bind(this);
		this.onChangeCode2 = this.onChangeCode2.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onChange = this.onChange.bind(this);
		this.refPhone = React.createRef();
		this.refCode = React.createRef();
		this.refCode2 = React.createRef();
		this.state = {
			modal: false,
			codeInvalidate: false,
			keyboardVisible: false,
			inputNode: null,
			layoutName: "default",
			inputPhone: "",
			inputCode: "",
			inputCode2: "",
		}
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-signphone__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onSubmit () {
		this.setState({codeInvalidate: true});
		clearTimeout(this.tim);
			this.tim = setTimeout(()=>{
				const valid = document.getElementsByClassName('modal-window-signphone__validate-cont')[0];
				if(valid) {
					valid.style.opacity= 0;
					this.tim = setTimeout(() => {
						this.setState({codeInvalidate: false});
						valid.style.opacity = 1;
					}, 500);
				}
			},500);
	}

	onVerify () {
		this.setState({modal: true});
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

	onSubmitModal () {
		console.log('Submit click in Get verification')
		this.onCloseModal();
	}

	onCloseModal () {
		this.setState({modal: false});
	}

	onClose () {
		//this.props.onClose();
	}

	handleFocusPhone() {
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

	handleFocusCode() {
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '517px';
		}
		this.setState({
			inputNode: this.refCode,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputCode);
	}

	handleFocusCode2() {
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '402px';
		}
		this.setState({
			inputNode: this.refCode2,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputCode2);
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
				//this.goLogin();
				break;
		}
	}

	onChange(input) {
		switch (this.state.inputNode) {
			case this.refPhone:
				this.setState({ inputPhone:input });
				break;
			case this.refCode:
				this.setState({ inputCode:input });
				break;
			case this.refCode2:
				this.setState({ inputCode2:input });
				break;
		}
	}

	onChangePhone(event) {
		const inputPhone = event.target.value;
		this.setState({ inputPhone });
		if(this.keyboard) this.keyboard.setInput(inputPhone);
	}

	onChangeCode(event) {
		const inputCode = event.target.value;
		this.setState({ inputCode });
		if(this.keyboard) this.keyboard.setInput(inputCode);
	}

	onChangeCode2(event) {
		const inputCode2 = event.target.value;
		this.setState({ inputCode2 });
		if(this.keyboard) this.keyboard.setInput(inputCode2);
	}

	render () {
		return (
			<div className="modal-window-signphone">
					<div className="modal-window-signphone__scale-cont">
						{this.state.modal?
							(<div className="modal-window-signphone__verify-cont">
							<input className="modal-window-signphone__fields modal-window-signphone__code-modal"
										 type="text" maxLength="6"
										 value={this.state.inputCode2}
										 onInput={this.onInput}
										 onFocus={this.handleFocusCode2}
										 onChange={this.onChangeCode2}
										 ref={this.refCode2}
										 placeholder={"------"}
							/>
							<img className="modal-window-signphone__close-modal game-button" onClick={this.onCloseModal} src="/images/frenzy/bonus_close.png" alt=""/>
							<img className="modal-window-signphone__submit-modal game-button" onClick={this.onSubmitModal} src="/images/frenzy/freeplay/ver_submit.png" alt=""/>
							<img className="modal-window-signphone__back-modal" src="/images/frenzy/freeplay/ver_back.png" alt=""/>
						</div>):""}
						{this.state.codeInvalidate?
							<div className="modal-window-signphone__validate-cont">
								<img className="modal-window-signphone__valid" src={`/images/frenzy/freeplay/${(Math.random() > 0.5 ? 'valid' : 'invalid')}.png`} alt=""/>
								<img className="modal-window-signphone__back-modal" src="/images/frenzy/freeplay/err_back.png" alt=""/>
							</div>:""}
					<input className="modal-window-signphone__phone modal-window-signphone__fields"
								 type="text"
								 value={this.state.inputPhone}
								 onInput={this.onInput}
								 onFocus={this.handleFocusPhone}
								 onChange={this.onChangePhone}
								 ref={this.refCom}
								 placeholder={defaultText1}
					/>
					<input className="modal-window-signphone__code modal-window-signphone__fields"
								 type="text"
								 value={this.state.inputCode}
								 onInput={this.onInput}
								 onFocus={this.handleFocusCode}
								 onChange={this.onChangeCode}
								 ref={this.refCode}
								 placeholder={defaultText2}
					/>
					<img className="modal-window-signphone__close game-button" onClick={this.onClose} src="/images/frenzy/bonus_close.png" alt=""/>
					<img className="modal-window-signphone__verify game-button" onClick={this.onVerify} src="/images/frenzy/freeplay/submit_phone.png" alt=""/>
					<img className="modal-window-signphone__ok game-button" onClick={this.onSubmit} src="/images/frenzy/freeplay/submit_ref.png" alt=""/>
					<img className="modal-window-signphone__back" src="/images/frenzy/freeplay/info_back.png" alt=""/>
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