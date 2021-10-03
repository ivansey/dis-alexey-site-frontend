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
                        <div className="collapsible-header">Первый вопрос</div>
                        <div className="collapsible-body"><span>Ответ</span></div>
                    </li>
                    <li>
                        <div className="collapsible-header">Второй вопрос</div>
                        <div className="collapsible-body"><span>Ответ</span></div>
                    </li>
                </ul>
            </div>
		</div>;
	}
}

export default MainPage;