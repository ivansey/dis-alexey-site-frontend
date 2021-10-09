import React, {Component} from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

class Portfolio extends Component {
	constructor(props) {
		super(props);

        this.state = {
            list: [],
            response: "loading",
            error: "",
        }

        this.getList(); 

        console.log(this.props.location)
	}

    componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({response: "loading"});
			this.getList();
		}
	}

    getList() {
        axios.post("/api/works/get/all/type", {type: this.props.match.params.type}).then(data => {
            const req = data.data;

            this.setState({list: req.data, response: req.response});
        })
    }

    render() {
		return <div>
            <br />
            <div className="container">
                <h2>Мои работы</h2>
                <br />
                <ul className="collection">
                    <Link className={this.props.location.pathname === "/portfolio/home" ? "collection-item active" : "collection-item"} to="/portfolio/home">Квартиры и дома</Link>
                    <Link className={this.props.location.pathname === "/portfolio/street" ? "collection-item active" : "collection-item"} to="/portfolio/street">Участки</Link>
                    <Link className={this.props.location.pathname === "/portfolio/factory" ? "collection-item active" : "collection-item"} to="/portfolio/factory">Корпоративные клиенты</Link>
                    <Link className={this.props.location.pathname === "/portfolio/return" ? "collection-item active" : "collection-item"} to="/portfolio/return">Результаты</Link>
                </ul>
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
                <div className="row">
                    {
                        this.state.response === "ok" && this.state.list.length > 0
                            ? this.state.list.map((e, i) => {
                                return <div className="col s12 m6 l6">
                                    <div className="card" key={i}>
                                        {
                                            !e.urlContent[0]
                                                ? <div className="card-image">
                                                    <img src={"/api" + e.urlContent[0]} alt={e.name} />
                                                </div>
                                                : null
                                        }
                                        <div className="card-content">
                                            <span className="card-title">{e.name}</span>
                                        </div>
                                        <div className="card-action">
                                            <Link to={"/portfolio/get/" + e._id}>Подробнее</Link>
                                        </div>
                                    </div>
                                </div>
                            })
                            : null
                    }
                </div>
            </div>
        </div>;
	}
}

export default withRouter(props => <Portfolio {...props} />);