import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import store from "../store";

class Header extends Component {
	render() {
		return <div className="navbar-fixed red">
			<nav className="nav-extended red">
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo">Дезинсекция</Link>
					<ul id="nav-mobile" className="right">
						<li className="hide-on-large"><a href={`tel:${store.getState().telLink}`}><i className="material-icons">call</i></a></li>
						<li className="hide-on-med-and-down"><a href={`tel:${store.getState().telLink}`}>{store.getState().tel}</a></li>
						
						{
							store.getState().loginStatus === true
								? <li><Link to="/admin">AP</Link></li>
								: null
						}
					</ul>
				</div>
				<div className="nav-content">
                    <ul className="tabs tabs-transparent">
                        <li className="tab">
                            <Link to="/pricelist">Услуги</Link>
                        </li>
						<li className="tab">
                            <Link to="/portfolio/home">Мои обработки</Link>
                        </li>
						<li className="tab">
                            <Link to="/calc">Заказать</Link>
                        </li>
                    </ul>
                </div>
			</nav>
		</div>
	}
}

export default withRouter(Header);