import React from "react";
import { Link, withRouter } from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, useScrollTrigger, Slide} from "@mui/material";
import store from "../store";

// class Header2 extends Component {
// 	render2() {
// 		return <div className="navbar-fixed red">
// 			<nav className="nav-extended red">
// 				<div className="nav-wrapper">
// 					<Link to="/" className="brand-logo">Дезинсекция</Link>
// 					<ul id="nav-mobile" className="right">
// 						<li className="hide-on-large"><a href={`tel:${store.getState().telLink}`}><i className="material-icons">call</i></a></li>
// 						<li className="hide-on-med-and-down"><a href={`tel:${store.getState().telLink}`}>{store.getState().tel}</a></li>
						
// 						{
// 							store.getState().loginStatus === true
// 								? <li><Link to="/admin">AP</Link></li>
// 								: null
// 						}
// 					</ul>
// 				</div>
// 				<div className="nav-content">
//                     <ul className="tabs tabs-transparent">
//                         <li className="tab">
//                             <Link to="/pricelist">Услуги</Link>
//                         </li>
// 						<li className="tab">
//                             <Link to="/portfolio/home">Мои обработки</Link>
//                         </li>
// 						<li className="tab">
//                             <Link to="/calc">Заказать</Link>
//                         </li>
//                     </ul>
//                 </div>
// 			</nav>
// 		</div>
// 	}
// }

function HideOnScroll (props) {
	const {children, window} = props;

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	})

	return <Slide appear={false} director="down" in={!trigger}>
		{children}
	</Slide>
}

function Header (props) {
	function hrefTo (href) {
		props.history.push(href);
	}

	return <React.Fragment>
		<HideOnScroll {...props}> 
			<AppBar position="fixed">
				<Toolbar variant="dense">
					<Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}} onClick={() => hrefTo("/")}>SuperAntiKlop</Typography>
					<Button variant="text" color="inherit" href={`tel:${store.getState().telLink}`}>CALL</Button>
					{
						store.getState().loginStatus === true
							? <Button color="inherit" onClick={() => hrefTo("/admin")}>AP</Button>
							: null
					}
				</Toolbar>
				<Toolbar>
						<Button color="inherit" onClick={() => hrefTo("/pricelist")}>Услуги</Button>
						<Button color="inherit" onClick={() => hrefTo("/portfolio/home")}>Обработки</Button>
						<Button color="inherit" onClick={() => hrefTo("/calc")}>Заказать</Button>
				</Toolbar>
			</AppBar>
		</HideOnScroll>
		<Toolbar/>
	</React.Fragment>
}

export default withRouter(Header);