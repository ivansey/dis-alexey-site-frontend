import React, {Component} from "react";
import cookies from "react-cookies";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {Container, FormControl, TextField, Button} from "@mui/material";
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
		return <Container>
            <br />
            <h4>Вход в админ-панель</h4>
            <br/>
            <FormControl fullWidth>
                <TextField label="Логин" type="email" variant="outlined"
                           onChange={this.handleEmail}/>
                <br/>
                <TextField label="Пароль" type="password" variant="outlined"
                           onChange={this.handlePass}/>
                <br/>
                <Button onClick={this.sendForm}>Вход</Button>
                <br/>
            </FormControl>
            {
                this.state.response === "err" && this.state.response === "err"
                    ? <div>
                        <Alert severity="error">
                            {this.getErrorText(this.state.error)}
                        </Alert>
                    </div>
                    : null
            }
        </Container>;
	}
}

export default Login;