import React, {Component} from "react";
import {
    Alert,
    Container,
    Chip,
    Stack,
    Grid,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Button,
    Typography,
    CircularProgress
} from "@mui/material";
import {withRouter} from "react-router-dom";
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
        return <Container>
            <br/>
            <br/>
            <h4>Мои работы</h4>
            <br/>
            <Grid direction="row" container spacing={1} rowSpacing={1}>
                <Chip label="Квартиры" onClick={() => this.props.history.push("/portfolio/home")}
                      variant={this.props.location.pathname === "/portfolio/home" ? "filled" : "outlined"}/>
                <Chip label="Участки" onClick={() => this.props.history.push("/portfolio/street")}
                      variant={this.props.location.pathname === "/portfolio/street" ? "filled" : "outlined"}/>
                <Chip label="Корпоративные клиенты" onClick={() => this.props.history.push("/portfolio/factory")}
                      variant={this.props.location.pathname === "/portfolio/factory" ? "filled" : "outlined"}/>
                <Chip label="Результаты" onClick={() => this.props.history.push("/portfolio/return")}
                      variant={this.props.location.pathname === "/portfolio/return" ? "filled" : "outlined"}/>
            </Grid>
            <br/>
            {
                this.state.response === "loading"
                    ? <CircularProgress/>
                    : null
            }
            {
                this.state.response === "ok" && this.state.list.length === 0
                    ? <Alert severity="info">Работ пока нет</Alert>
                    : null
            }
            <br/>
            <Grid container spacing={2} justifyContent="center">
                {
                    this.state.response === "ok" && this.state.list.length > 0
                        ? this.state.list.map((e, i) => {
                            return <Grid item xs={12} lg={4}>
                                <Card onClick={() => this.props.history.push("/portfolio/get/" + e._id)}>
                                    {
                                        e.urlContent[0]
                                            ? <CardMedia
                                                component="img"
                                                height="150"
                                                image={"/api" + e.urlContent[0]}
                                                alt={e.name}
                                            />
                                            : null
                                    }
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {e.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            onClick={() => this.props.history.push("/portfolio/get/" + e._id)}>Подробнее</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        })
                        : null
                }
            </Grid>
            <br/>
        </Container>;
    }
}

export default withRouter(props => <Portfolio {...props} />);