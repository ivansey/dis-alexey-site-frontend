import React, {Component} from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import store from "../../store";

class AdminPanel extends Component {
	constructor(props) {
		super(props);

		if (store.getState().loginStatus === false) {
			this.props.history.push("/admin/login");
		}
	}

    render() {
		return <div className="flexPage">
            <h2>Здравствуйте, {store.getState().userInfo.name}</h2>
			<br />
			<Link className="btn red" to="/admin/portfolio">Управление списком работ</Link>
			<br />
			<Link className="btn red" to="/admin/orders">Заказы</Link>
		</div>;
	}
}

export default withRouter(AdminPanel);