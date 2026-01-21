import React from 'react';
import { EE } from '../App';
import '../css/message.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";

export class MessageWin extends React.Component {
	constructor(props) {
		super(props);
		//
		this.state = {
			text: this.props.text
		}
		this.onClose = this.onClose.bind(this);
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-message__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onClose() {
		this.props.onClose();
	}

	render () {
		return (
			<div className="modal-window-message">
				<div className="modal-window-message__scale-cont">
					<div className="modal-window-message__text-unit modal-window-message__text">{this.state.text}</div>
					<div className="modal-window-message__text-unit modal-window-message__text-shadow">{this.state.text}</div>
					<img className="modal-window-message__ok game-button" onClick={this.onClose} src="/images/frenzy/ok_btn.png" alt=""/>
					<img className="modal-window-message__close game-button" onClick={this.onClose} src="/images/frenzy/bonus_close.png" alt=""/>
					<img className="modal-window-message__back" src="/images/frenzy/message.png" alt=""/>
				</div>
			</div>
		)
	}
}