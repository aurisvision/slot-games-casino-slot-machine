import React from "react";
import {EE} from "../App";
import "../css/news.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import {PAGE_SIZE_DEFAULT} from "../common/Config";

export class NewsWin extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.state = {};
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);

        (async () => {
            const allImages = document.querySelectorAll(".carousel__image img");

            console.log("before load");
            await Promise.all(
                [...allImages].map((img) => {
                    return new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                })
            );
            console.log("after load");

            const cont = document.getElementsByClassName(
                "modal-window-news__scale-cont"
            )[0];
            if (cont) {
                setTimeout(() => {
                    cont.style.transform = `scale(1)`;
                    EE.emit("FORCE_RESIZE");
                }, 100);
            }
        })();
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-news__scale-cont"
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
        const cont = document.getElementsByClassName(
            "modal-window-news__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0)`;
        }

        setTimeout(() => {
            this.props.onClose();
        }, 300);
    }

	redirectToFacebook() {
		window.location.href = "https://www.facebook.com/profile.php?id=61556991885591";
    }

    render() {
        return (
            <div className="modal-window-news">
                <div className="modal-window-news__scale-cont">
                    <img
                        className="modal-window-news__close"
                        onClick={this.onClose}
                        src="/images/frenzy/bonus_close.png"
                        alt=""
                    />

                    <Slider
                        {...{
                            dots: true,
                            infinite: true,
                            speed: 500,
                            slidesToShow: 1,
                            slidesToScroll: 1,
							arrows: false
                        }}
                    >
                        <div className="carousel__image">
                            <img src="/images/frenzy/news_img_1.png" alt="" className="carousel__item" />
                            <img src="/images/frenzy/reg_btn.png" alt="" className="reg_button" />
                        </div>
                        <div className="carousel__image">
                            <img src="/images/frenzy/news_img_2.png" alt="" className="carousel__item" />
                            <img src="/images/frenzy/fb_button.png" alt="" className="fb_button" onClick={this.redirectToFacebook} />
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}
