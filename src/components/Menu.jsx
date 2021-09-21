import React, {Component} from "react";
import "../styles/components/Menu.scss";
import {Link} from "react-router-dom";

class Menu extends Component {
    // render() {
    //     return <div>
    //         <nav>
    //             <div className="nav-content">
    //                 <ul className="tabs tabs-transparent">
    //                     <li className="tab">
    //                         <Link to="/pricelist" className={this.props.priceListPage === true ? "active" : ""}>Услуги</Link>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </nav>
    //     </div>
    // }

    render() {
        return <div></div>
    }

    renderTo() {
        return <div className="menu">
            <div className="content">
                {
                    this.props.priceListPage !== false
                        ? <div>
                            <div className="dropdown">
                                <Link className="button big block dropdown-action" to="/pricelist">Услуги</Link>
                                {/* <div className="dropdown-menu">
                                    <Link className="el">Холодный туман</Link>
                                    <Link className="el">Горячий туман</Link>
                                </div> */}
                            </div>
                        </div>
                        : <div>
                            <Link className="button big block" to="/">На главную</Link>
                        </div>
                }
                {
                    this.props.portfolioPage !== false
                        ? <div>
                            <div className="dropdown">
                                <button className="button big dropdown-action">Мои работы</button>
                                <div className="dropdown-menu">
                                    <Link className="el" to="/portfolio/home">Квартиры и дома</Link>
                                    <Link className="el" to="/portfolio/street">Участки</Link>
                                    <Link className="el" to="/portfolio/factory">Корпоративные клиенты</Link>
                                </div>
                            </div>
                        </div>
                        : <div>
                            <Link className="button big block" to="/">На главную</Link>
                        </div>
                }
            </div>
        </div>
    }
}

export default Menu;