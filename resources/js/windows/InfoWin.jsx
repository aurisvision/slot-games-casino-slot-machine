import React from 'react';
import { EE } from '../App';
import '../css/info.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";
import { deleteUser } from '../server/server';

export class InfoWin extends React.Component {
	AVATAR_SOURCE = "";
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.closeDelAccount = this.closeDelAccount.bind(this);
		this.onSelectNewAvatar = this.onSelectNewAvatar.bind(this);
		this.onAvatarComplete = this.onAvatarComplete.bind(this);
		this.state = {
			delete_sure: false
		};
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-info__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onDelete () {
		this.setState({delete_sure: true});
	}

	goDelAccount () {
		deleteUser((data) => {
			data = JSON.parse(data);
			if(data.result == 'success')
			{
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
			}
		});
	}

	closeDelAccount () {
		this.setState({delete_sure: false});
	}

	onSelectNewAvatar (e) {
		// var input = document.createElement('input');
		// input.type = 'file';
		// input.accept=".jpg,.png";
		// input.onchange = (e)=>{
		// 	var file = e.target.files[0];
		// 	console.log(file)
		// 	var reader = new FileReader();
		// 	reader.onload = ((re) => {
		// 		const img = document.querySelector('.modal-window-info__avatar');
		// 		img.src = re.target.result;
		// 		this.AVATAR_SOURCE = img.src;
		// 		console.log(re.target.result);
		// 	});
		// 	reader.readAsDataURL(file);
		// }
		// input.click();
	}

	onAvatarComplete () {
		console.log('Avatar send. Source: ', this.AVATAR_SOURCE);
	}

	onClose () {
		this.props.onClose();
	}

	render () {
		return (
			<div className="modal-window-info">
				<div className="modal-window-info__scale-cont">
					{this.state.delete_sure?
						<div className="modal-window-info__popup-cont">
							<img className="modal-window-info_text" src="/images/frenzy/del_back.png" alt=""/>
							<img className="modal-window-info__yes modal-window-info-popup__btn game-button" onClick={this.goDelAccount} src="/images/frenzy/yes_btn.png" alt=""/>
							<img className="modal-window-info__no modal-window-info-popup__btn game-button" onClick={this.closeDelAccount} src="/images/frenzy/no_btn.png" alt=""/>							
						</div>:""}
					{/* <img className="modal-window-info__avatar" onClick={this.onSelectNewAvatar} src="" alt=""/> */}
					<span className="modal-window-info__user modal-window-info__text">{document.getElementById('root').getAttribute('username')}</span>
					<span className="modal-window-info__pass modal-window-info__text">{"****************"}</span>
					{/*<span className="modal-window-info__phone modal-window-info__text">{"###########"}</span>*/}
					<img className="modal-window-info__close game-button" onClick={this.onClose} src="/images/frenzy/bonus_close.png" alt=""/>					
					{/* <img className="modal-window-info__avatar_ok game-button" onClick={this.props.onAvatarComplete} src="/images/frenzy/change_btn.png" alt=""/> */}
					{/*<img className="modal-window-info__del modal-window-info__btn game-button" onClick={this.onDelete} src="/images/frenzy/delete_btn.png" alt=""/>*/}
					<img className="modal-window-info__done modal-window-info__btn game-button" onClick={this.props.goChangePass} src="/images/frenzy/change_btn.png" alt=""/>
					<img className="modal-window-info__del game-button" onClick={this.onDelete} src="/images/frenzy/del_btn.png" alt=""/>
					{/*<img className="modal-window-info__change modal-window-info__btn game-button" onClick={this.props.goAddPhone} src="/images/frenzy/add_btn.png" alt=""/>*/}
					<img className="modal-window-info__back" src="/images/frenzy/info_back3.png" alt=""/>
				</div>
			</div>
		)
	}
}