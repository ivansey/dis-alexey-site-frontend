import React, {Component} from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
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
	}

    getList() {
        axios.post("/api/works/get/all", {token: store.getState().token}).then(data => {
            const req = data.data;

            this.setState({list: req.data, response: req.response});
        })
    }

    sendForm() {
        axios.post("/api/works/add", {
            name: this.state.name,
            desc: this.state.desc,
            typeWork: this.state.typeWork,
            typeContent: "",
            files: this.state.files,
            token: store.getState().token,
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

    handleDesc(event) {
        this.setState({desc: event.target.value});
    }

    handleTypeWork(event) {
        this.setState({typeWork: event.target.value});
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

        // console.log(fl);
        

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
		return <div className="flexPage">
            <h2>Добавление кейса</h2>
			<br />
            <label htmlFor="name">name</label>
            <input type="text" name="name" id="name" onChange={this.handleName}/>
            <br />
            <label htmlFor="desc">desc</label>
            <textarea type="text" name="desc" id="desc" value={this.state.desc} onChange={this.handleDesc}/>
            <br />
            <label htmlFor="typeWork">typeWork</label>
            <select name="typeWork" id="typeWork" value={this.state.typeWork} onChange={this.handleTypeWork}>
                <option value="home">Квартиры</option>
                <option value="street">Участки</option>
                <option value="factory">Производственные, общепит и общежития</option>
            </select>
            <br />
            <label htmlFor="files">files</label>
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
            <br />
            <button className="button" onClick={this.sendForm}>Send</button>
		</div>;
	}
}

export default withRouter(AdminPortfolioAdd);