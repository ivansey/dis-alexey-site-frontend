import React, {Component} from "react";
import cookies from "react-cookies";
import {withRouter} from "react-router-dom";
import axios from "axios";
import store from "../../store";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            pass: "",
            response: "",
            error: "",
            token: "",
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);

        this.sendForm = this.sendForm.bind(this);
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handlePass(event) {
        this.setState({pass: event.target.value});
    }

    sendForm() {
        axios.post("/api/users/auth/login", {
            email: this.state.email,
            pass: this.state.pass,
        }).then((data) => {
            const req = data.data;

            if (req.response === "ok") {
                localStorage.setItem("token", req.data.token);
                this.props.history.push("/");
            } else {
                this.setState({response: req.response, error: req.error});
            }
        })
    }

    getErrorText(error, status = 200) {
        if (status === 500) {
            return "Ошибка сервера";
        }
        switch(error) {
            case "falseEmailPass":
                return "Неверный EMail/пароль";
            default:
                return "Неизвестная ошибка";
        }
    }
    
    render() {
		return <div className="container">
            <br />
            <h2>Вход в админ-панель</h2>
            <div className="row">
                <div className="col s12">
                    <p htmlFor="email">EMail</p>
                    <input type="email" name="email" id="email" onChange={this.handleEmail}/>
                    <br />
                    <p htmlFor="pass">Пароль</p>
                    <input type="password" name="pass" id="pass" onChange={this.handlePass}/>
                    <br />
                </div>
            </div>
            {
                this.state.response === "err" && this.state.response === "err"
                    ? <div>
                        <p>
                            {this.getErrorText(this.state.error)}
                        </p>
                    </div>
                    : null
            }
            <br />
            <button className="btn red" onClick={this.sendForm}>Вход</button>
		</div>;
	}
}

export default Login;