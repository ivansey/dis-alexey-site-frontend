import React, {Component} from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../../../store";

class AdminPortfolioGet extends Component {
	constructor(props) {
		super(props);

        this.state = {
            data: {},
            response: "loading",
            error: "",
        }

		if (store.getState().loginStatus === false) {
			this.props.history.push("/admin/login");
		}

        console.log("eee");

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
		return <div className="flexPage">
            <h2>Портфолио</h2>
			<br />
			<Link className="button" to="/admin/portfolio/add">Добавить</Link>
            <br />
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
                        <br />
                        <p>{this.printType(this.state.data.typeWork)}</p>
                        <br />
                        <p>{this.state.data.desc}</p>
                        <br />
                        <div className="flexGallery">
                            {
                                this.state.data.urlContent.map(e => {
                                    return <div>
                                        <img src={"/api"+e} alt="" className="portfolioImage" />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    : null
            }
		</div>;
	}
}

export default withRouter(AdminPortfolioGet);