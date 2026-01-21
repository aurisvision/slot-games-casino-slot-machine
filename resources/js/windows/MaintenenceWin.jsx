import React from 'react';
import { EE } from '../App';
import '../css/maintenence.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";

export class MaintenenceWin extends React.Component {

	componentWillUnmount() {
		clearInterval(this.int);
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-maintenence__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	render () {
		return (
			<div className="modal-window-maintenence">
				<div className="modal-window-maintenence__scale-cont">
					<div className="modal-window-maintenence__down">
						<img className="modal-window-maintenence__text" src="/images/frenzy/maintenence.png" alt=""/>
					</div>
				</div>
			</div>
		)
	}
}