import React, {Component} from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../../../store";

class AdminPortfolio extends Component {
	constructor(props) {
		super(props);

        this.state = {
            list: [],
            response: "loading",
            error: "",
        }

		if (store.getState().loginStatus === false) {
			this.props.history.push("/admin/login");
		}

        this.getList();
	}

    getList() {
        axios.post("/api/works/get/all", {token: store.getState().token}).then(data => {
            const req = data.data;

            this.setState({list: req.data, response: req.response});
        })
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
                this.state.response === "ok" && this.state.list.length === 0
                    ? <p>Нет элементов</p>
                    : null
            }
            {
                this.state.response === "ok" && this.state.list.length > 0
                    ? this.state.list.map((e, i) => {
                        return <div>
                            <Link to={`/admin/portfolio/get/${e._id}`}>{i}. {e.name}</Link>
                        </div>
                    })
                    : null
            }
		</div>;
	}
}

export default withRouter(AdminPortfolio);