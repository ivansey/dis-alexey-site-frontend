import React, {Component} from "react";
import store from "../store";
import axios from "axios";

import {Alert, Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

import NewOrderButtons from "../components/NewOrderButtons.jsx";
import Reviews from "../components/Reviews.jsx";
import MainText from "../texts/main.jsx";
import Tarakans from "../texts/tarakans.jsx";
import Klops from "../texts/klops.jsx";
import Collapsible from "react-collapsible";

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.checkToken();
    }

    checkToken() {
        axios.post("/api/users/auth/checkToken", {token: localStorage.getItem("token")}).then((data) => {
            const req = data.data;

            if (req.response === "ok") {
                store.dispatch({type: "loginStatus/true"});
            } else {
                store.dispatch({type: "loginStatus/false"});
            }
        })
    }

    render() {
        return <div className="">
            <div className="mainPageBlock">
                <Container>
                    <br/>
                    <br/>
                    <Typography color="#fff" variant="h2" element="h1">Уничтожение клопов, тараканов, блох, муравьев и
                        т.д.</Typography>
                    <br/>
                    <Typography color="#fff" variant="h4" element="h2">Работаю в Подольске и его районе, Климовске,
                        Чехове, Домодедово, Видном, Серпухове</Typography>
                    <br/>
                    <NewOrderButtons variant="text" color="inherit"/>
                    <br/>
                    <br/>
                </Container>
            </div>

            <MainText/>

            <div className="blockContent">
                <Typography variant="h4" element="h4">Вопрос/Ответ</Typography>
                <div className="Collapsible__more">
                    <Collapsible trigger={`@ Откуда берутся паразиты?`}>
                        <p>Есть несколько вариантов</p>
                        <p>1) Возможно они есть у соседей и попадают через щели, вытяжки, вентеляцию и т.д.</p>
                        <p>2) Вы принесли с собой с гостиницы, работы, то есть, там где большое количество людей</p>
                        <p>3) Есть небольшая вероятность принести с общественного транспорта или общественных мест,
                            к примеру со школы, детского сада, больницы</p>
                        <NewOrderButtons variant="contained"/>
                    </Collapsible>
                    <Collapsible trigger={`@ После обработки их больше не
                            будет?`}>
                        <p>Если они есть у соседей и/или работаете там, где они присутствуют, то они рано или поздно
                            появятся.</p>
                    </Collapsible>
                    <Collapsible trigger={`@ Если заметили одного, к примеру клопа, то стоит ли
                            бить
                            тревогу?`}>
                        <p>Стоит! К примеру, одна самка клопа откладывает до 5 яиц в сутки. Через месяц они
                            становятся взрослыми особями. Так же не факт, что дома только один паразит. Так что
                            рекомендуется вызывать специалиста.</p>
                        <NewOrderButtons variant="contained"/>
                    </Collapsible>
                    <Collapsible trigger={`@ Возможно ли самому избавиться от
                            паразитов?`}>
                        <p>Возможно, но это может вам выйти дороже, чем вызов специалиста. Пользуйтесь услугами
                            проверенных специалистов.</p>
                        <NewOrderButtons variant="contained"/>
                    </Collapsible>
                </div>
                <br/>
                <div className="info warning">НИКОГДА не пользуйтесь химией, свойств которой, вы не знаете!</div>
                <br/>
                <Tarakans/>
                <br/>
                <Klops/>
                <br/>
            </div>
            <div className="blockContent">
                <h3>Отзывы</h3>
                <Reviews/>
                <br/>
            </div>
        </div>;
    }
}

export default MainPage;