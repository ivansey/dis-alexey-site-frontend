import React, {Component} from "react";
import {withRouter} from "react-router";
import axios from "axios";
import store from "../store";

import IframeVideo from "../components/IframeVideo.jsx";
import {Alert, CircularProgress, Container, ImageList, ImageListItem} from "@mui/material";

const styleImage = {
    margin: "10px",
    display: "block",
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

    render() {
        return <Container>
            <br/>
            {
                this.state.response === "loading"
                    ? <CircularProgress/>
                    : null
            }
            {
                this.state.response === "err"
                    ? <Alert severity="error">Такой работы нет</Alert>
                    : null
            }
            {
                this.state.response === "ok"
                    ? <div>
                        <h4>{this.state.data.name}</h4>
                        <p>{this.state.data.desc}</p>
                    <br/>
                        {
                            this.state.data.isClientContent
                                ? <Alert severity="info">Материалы предоставлены клиентом</Alert>
                                : null
                        }
                        <br/>
                        <IframeVideo source={this.state.data.urlYouTubeVideo}/>
                        <br/>
                        <ImageList cols={3} rowHeight={164}>
                            {
                                this.state.data.urlContent.map(e => {
                                    return <ImageListItem key={i}>
                                        <img className="col s12" src={"/api" + e} alt={this.state.data.name} loading="lazy"/><br/>
                                    </ImageListItem>
                                })
                            }
                        </ImageList>
                    </div>
                    : null
            }
        </Container>;
    }
}

export default withRouter(PortfolioGet);
