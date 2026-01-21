import React from "react";
import {EE} from "../App";
import "../css/newwebsite.css";
import {PAGE_SIZE_DEFAULT} from "../common/Config";

export class NewWebsiteWin extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.int);
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-newwebsite__scale-cont"
        )[0];
        const sc = Math.min(
            data.h / PAGE_SIZE_DEFAULT.height,
            data.w / PAGE_SIZE_DEFAULT.width
        );
        if (cont) {
            cont.style.transform = `scale(${sc})`;
        }
    }

    onClose() {
        this.props.onClose();        
    }

    render() {
        return (
            <div className="modal-window-newwebsite">
                <div className="modal-window-newwebsite__scale-cont">
                    <img
                        className="modal-window-newwebsite__img"
                        src="/images/frenzy/maintenance.png"
                        alt=""
                    />
                    <a
                        href="https://www.slotgame.app"
                        className="modal-window-newwebsite__text"
                    >
                        www.slotgame.app
                    </a>
                    <img
                        className="modal-window-newwebsite__close_btn"
                        onClick={this.onClose}
                        src="/images/frenzy/bonus_close_2.png"
                        alt=""
                    />
                </div>
            </div>
        );
    }
}
