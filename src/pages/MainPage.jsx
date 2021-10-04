import React, {Component} from "react";
import store from "../store";
import axios from "axios";

import "../styles/pages/MainPage.scss";
import disPic from "../pictures/disPic.jpg";

const textShadow = {
    textShadow: "#000 0px 0px 10px",
}

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.checkToken();
    }

    checkToken() {
		axios.post("/api/users/auth/checkToken", {token: localStorage.getItem("token")}).then((data) => {
			const req = data.data;

			if (req.response === "ok") {
				store.dispatch({type: "loginStatus/true"});
			} else {
				store.dispatch({type: "loginStatus/false"});
			}
		})
	}

    render() {
		return <div className="">
            <br />
            <div className="pageHeader" style={{backgroundImage: `url(${disPic})`, width: "100%", backgroundSize: "cover", opacity: 1, padding: "40px"}}>
                <div className="content">
                    <h1 style={textShadow}>Уничтожение клопов, тараканов, блох, муравьев и т.д.</h1>
                    <br/>
                    <h3 style={textShadow}>Работаю в Подольске и его районе, Чехове, Домодедово, Видное, Серпухов, Щербинов и Юг Москвы</h3>
                    <br/>
                    <a className="btn red" href={`tel:${store.getState().telLink}`}>Позвонить</a>
                </div>
            </div>

            <div className="container">
                <h3>Вопрос/Ответ</h3>
                <ul className="collapsible">
                    <li className="active">
                        <div className="collapsible-header">Откуда берутся паразиты?</div>
                        <div className="collapsible-body"><p>Есть несколько вариантов</p>
                            <p>1) Возможно они есть у соседей и попадают через щели, вытяжки, вентеляцию и т.д.</p>
                            <p>2) Вы принесли с собой с гостиницы, работы, то есть, там где большое количество людей</p>
                            <p>3) Есть небольшая вероятность принести с общественного транспорта или общественных мест, к примеру со школы, детского сада, больницы</p>
                        </div>
                    </li>
                    <li>
                        <div className="collapsible-header">После обработки их больше не будет?</div>
                        <div className="collapsible-body"><span>Если они есть у соседей и/или работаете там, где они присутствуют, то они рано или поздно появятся</span></div>
                    </li>
                    <li>
                        <div className="collapsible-header">Если заметили одного, к примеру клопа, то стоит ли бить тревогу?</div>
                        <div className="collapsible-body"><span>Стоит! К примеру, одна самка клопа откладывает до 5 яиц в сутки. Через месяц они становятся взрослыми особями. Так же не факт, что дома только один паразит. Так что рекомендуется вызывать специалиста.</span></div>
                    </li>
                    <li>
                        <div className="collapsible-header">Возможно ли самому избавиться от паразитов?</div>
                        <div className="collapsible-body"><span>Возможно, но это может вам выйти дороже, чем вызов специалиста. Пользуйтесь услугами проверенных специалистов, к примеру мной.</span></div>
                    </li>
                </ul>
                <br/>
                <h5>НИКОГДА не пользуйтесь химией, свойств которой, вы не знаете!</h5>
            </div>
		</div>;
	}
}

export default MainPage;