import React, {Component} from "react";
import { withRouter } from "react-router";
import axios from "axios";
import store from "../store";

const IframeYouTube = ({source}) => {
    if (!source) {
        return null;
    }

    const src = source;
    return <div className="video-container">
        <iframe width="853" height="480" src={src}
                frameBorder="0" allowFullScreen/>
    </div>
}

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
            console.log(data.data.data);
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
                            <br/>
                            <IframeYouTube source={this.state.data.urlYouTubeVideo}/>
                            <br/>
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