import React, {Component} from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {Checkbox, FormControlLabel} from "@mui/material";
import axios from "axios";
import store from "../../../store";

class AdminPortfolioAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            desc: "",
            typeWork: "home",
            files: [],
            urlYouTubeVideo: "",
            isClientContent: false,
            response: "ready",
            mediaResponse: "ready",
            error: "",
        }

        if (store.getState().loginStatus === false) {
            this.props.history.push("/admin/login");
        }

        this.sendForm = this.sendForm.bind(this);

        this.handleName = this.handleName.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleTypeWork = this.handleTypeWork.bind(this);
        this.handleUploadMedia = this.handleUploadMedia.bind(this);
        this.handleUrlYouTubeVideo = this.handleUrlYouTubeVideo.bind(this);
        this.handleIsClientContent = this.handleIsClientContent.bind(this);
    }

    sendForm() {
        axios.post("/api/works/add", {
            name: this.state.name,
            desc: this.state.desc,
            typeWork: this.state.typeWork,
            typeContent: "",
            files: this.state.files,
            urlYouTubeVideo: this.state.urlYouTubeVideo,
            isClientContent: this.state.isClientContent,
            token: localStorage.getItem("token"),
        }).then((data) => {
            const req = data.data;

            if (req.response === "ok") {
                this.props.history.push("/admin/portfolio");
            } else {
                this.setState({response: req.response, error: req.error});
            }
        })
    }

    handleName(event) {
        this.setState({name: event.target.value});
    }

    handleUrlYouTubeVideo(event) {
        this.setState({urlYouTubeVideo: event.target.value});
    }

    handleDesc(event) {
        this.setState({desc: event.target.value});
    }

    handleTypeWork(event) {
        this.setState({typeWork: event.target.value});
    }

    handleIsClientContent(event) {
        console.log(event.target.checked);
        this.setState({isClientContent: event.target.checked});
        console.log(this.state.isClientContent);
    }

    handleFiles(event) {
        this.setState({files: event.target.value});
    }

    media = {};

    handleUploadMedia(event) {
        event.preventDefault();

        this.setState({mediaResponse: "loading"});

        let data = new FormData();
        let fl = this.state.files;
        data.append("file", this.media.files[0]);
        data.append("filename", "media_" + Date.now() + ".png");

        axios.post("/api/storage/media/upload", data).then(data => {
            fl[fl.length] = data.data.url;
            this.setState({files: fl, mediaResponse: "ok"});
            console.log(this.state);
        })
    }

    staticImage(url) {
        return <div>
            <img className="portfolioImage" src={`/api${url}`}/>
        </div>
    }

    render() {
        return <div className="container">
            <h2>???????????????????? ??????????</h2>
            <br/>
            <p htmlFor="name">??????</p>
            <input type="text" name="name" id="name" onChange={this.handleName}/>
            <br/>
            <p htmlFor="desc">????????????????</p>
            <textarea name="desc" id="desc" value={this.state.desc} onChange={this.handleDesc}/>
            <br/>
            <p htmlFor="urlYouTubeVideo">?????????? ?? YouTube</p>
            <input type="text" name="urlYouTubeVideo" id="urlYouTubeVideo" onChange={this.handleUrlYouTubeVideo}/>
            <br/>
            <p htmlFor="typeWork">?????? ????????????</p>
            <select name="typeWork" id="typeWork" value={this.state.typeWork} onChange={this.handleTypeWork}>
                <option value="home">????????????????</option>
                <option value="street">??????????????</option>
                <option value="factory">?????????????????????????? ??????????????</option>
                <option value="return">????????????????????</option>
            </select>
            <br/>
            <FormControlLabel control={<Checkbox/>} label="?????????????? ???????????????" onChange={this.handleIsClientContent}/>
            <Checkbox onChange={this.handleIsClientContent}/>
            <br/>
            <p htmlFor="files">????????</p>
            <input type="file" id="icon" onChange={this.handleUploadMedia} ref={(ref) => {
                this.media = ref;
            }}/>
            <div className="flexGallery">
                {
                    this.state.files.length > 0
                        ? this.state.files.map((e, i) => {
                            return this.staticImage(e);
                        })
                        : null
                }
            </div>
            <br/>
            <button className="button" onClick={this.sendForm}>Send</button>
        </div>;
    }
}

export default withRouter(AdminPortfolioAdd);