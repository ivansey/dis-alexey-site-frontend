import React, {Component} from "react";
import {withRouter} from "react-router-dom";
// import cookies from "react-cookies";
import store from "../store";
import axios from "axios";

// import "../styles/index.scss";

// import "materialize-css/extras/noUiSlider/nouislider.css";
// import "materialize-css/extras/noUiSlider/nouislider.js";

import Header from "../components/Header.jsx";
import MainPage from "./MainPage.jsx";
import PriceList from "./PriceList.jsx";
import Portfolio from "./Portfolio.jsx";
import PortfolioGet from "./PortfolioGet.jsx";
import Calc from "./Calc.jsx";

import AdminPanel from "./AdminPanel/Index.jsx";
import Login from "./AdminPanel/Login.jsx";

import AdminPortfolio from "./AdminPanel/Portfolio/Index.jsx";
import AdminPortfolioAdd from "./AdminPanel/Portfolio/Add.jsx";
import AdminPortfolioGet from "./AdminPanel/Portfolio/Get.jsx";

import AdminOrders from "./AdminPanel/Orders/Index.jsx";

import {Route} from "react-router-dom";

class Index extends Component {
	constructor(props) {
		super(props);

		this.checkToken();
	}

	checkToken() {
		axios.post("/api/users/auth/checkToken", {token: store.getState().token}).then((data) => {
			const req = data.data;

			if (req.response === "ok") {
				store.dispatch({type: "loginStatus/true"});
				axios.post("/api/users/auth/get", {token: store.getState().token}).then(data => {
					const req = data.data;

					store.dispatch({
						type: "user/info/update",
						info: req.data,
					})
				})
			} else {
				store.dispatch({type: "loginStatus/false"});
			}
		})
	}

	componentDidMount() {
		this.checkToken();
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.checkToken();
		}

		console.log("login status: ", store.getState().loginStatus);
	}

	render() {
		return <div>
				<Header/>
				<Route path="/" exact component={MainPage}/>
				<Route path="/pricelist" exact component={PriceList}/>
				<Route path="/portfolio/:type" exact component={Portfolio}/>
				<Route path="/portfolio/get/:id" exact component={PortfolioGet}/>
				<Route path="/calc" exact component={Calc}/>

				<Route path="/admin" exact component={AdminPanel}/>
				<Route path="/admin/login" exact component={Login}/>

				<Route path="/admin/portfolio" exact component={AdminPortfolio}/>
				<Route path="/admin/portfolio/add" exact component={AdminPortfolioAdd}/>
				<Route path="/admin/portfolio/get/:id" exact component={AdminPortfolioGet}/>

				<Route path="/admin/orders" exact component={AdminOrders}/>
		</div>;
	}
}

export default withRouter(props => <Index {...props}/>);