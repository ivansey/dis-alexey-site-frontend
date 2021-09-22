import React, {Component} from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../store";

class PortfolioGet extends Component {
	constructor(props) {
		super(props);

        this.state = {
            data: {
                name: "",
            },
            response: "loading",
            error: "",
        }

        this.get();
	}

    get() {
        axios.post("/api/works/get/id", {_id: this.props.match.params.id}).then(data => {
            this.setState({data: data.data.data, response: data.data.response});
        })
    }

    printType(type = "factory") {
        switch(type) {
            case "home":
                return "Квартира";
            case "street":
                return "Участок";
            case "factory":
                return "Производственные, общепит и общежития";
        }
    }

    render() {
		return <div>
            <br />
            <div className="container">
                {
                    this.state.response === "loading"
                        ? <p>Loading...</p>
                        : null
                }
                {
                    this.state.response === "err"
                        ? <p>err</p>
                        : null
                }
                {
                    this.state.response === "ok"
                        ? <div>
                            <h2>{this.state.data.name}</h2>
                            <p>{this.printType(this.state.data.typeWork)}</p>
                            <p>{this.state.data.desc}</p>
                            <div className="row">
                                {
                                    this.state.data.urlContent.map(e => {
                                        return <img className="col s12" src={"/api"+e} alt="" />
                                    })
                                }
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>;
	}
}

export default withRouter(PortfolioGet);