import React, {Component} from "react";
import store from "../store";
import axios from "axios";

import "../styles/pages/MainPage.scss";
import disPic from "../pictures/disPic.jpg";

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
            <div className="container pageHeader" style={{backgroundImage: `url(${disPic})`, width: "100%", backgroundSize: "cover", opacity: 1, padding: "40px"}}>
                <div className="content">
                    <h1>Уничтожение клопов, тараканов, блох, муравьев и т.д.</h1>
                    <br/>
                    <h3>Работаю в Подольске и его районе, Чехове, Домодедово, Видное, Серпухов, Щербинов и Юг Москвы</h3>
                    <br/>
                    <a className="btn red" href={`tel:${store.getState().telLink}`}>Позвонить</a>
                </div>
                <div className="bgfilter"></div>
            </div>
            
		</div>;
	}
}

export default MainPage;