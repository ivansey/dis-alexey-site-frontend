import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Scroll from "react-scroll";
import moment from "moment";

import chehov from "../pictures/citys/chehov.png";
import domoded from "../pictures/citys/domoded.gif";
import moscow from "../pictures/citys/moscow.jpg";
import podolsk from "../pictures/citys/podolsk.jpg";
import serpuchov from "../pictures/citys/serpuchov.gif";
import shcherbinov from "../pictures/citys/shcherbinov.png"
import vidnoe from "../pictures/citys/vidnoe.gif";

import {
    Alert,
    Button,
    ButtonGroup,
    Grid,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Paper,
    Slider,
    TextField,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

function Calc(props) {
    const [page, setPage] = useState(1);

    const [typeObject, setTypeObject] = useState("");
    const [typeTreatment, setTypeTreatment] = useState("coldFog");
    const [typeTreatmentHomestead, setTypeTreatmentHomestead] = useState("benz");
    const [city, setCity] = useState("");

    const [countApartment, setCountApartment] = useState(1);
    const [countHomestead, setCountHomestead] = useState(1);
    const [rooms, setRooms] = useState([1]);
    const [square, setSquare] = useState([1]);
    const [trees, setTrees] = useState([0]);
    const [pests, setPests] = useState("");

    const [cost, setCost] = useState(0);

    const [name, setName] = useState(".");
    const [phone, setPhone] = useState(".");
    const [adress, setAdress] = useState("");
    const [isWhatsApp, setIsWhatsApp] = useState(false);

    const [validName, setValidName] = useState(true);
    const [validPhone, setValidPhone] = useState(true);

    const [timeOrder, setTimeOrder] = useState("");
    const [dateOrder, setDateOrder] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const [times, setTimes] = useState([]);
    const [dates, setDates] = useState(getDate());

    function send() {
        if (!validName) {
            window.M.toast({html: "???? ?????????????? ??????"});
            return;
        } else if (!validPhone) {
            window.M.toast({html: "???? ???????????? ?????????? ????????????????"});
            return;
        }

        axios.post("/api/orders/add", {
            form: {
                typeObject: typeObject,
                typeTreatment: typeTreatment,
                typeTreatmentHomestead: typeTreatmentHomestead,
                city: city,

                countApartment: countApartment,
                countHomestead: countHomestead,
                rooms: rooms,
                square: square,
                trees: trees,
                pests: pests,

                cost: cost,

                timeOrder: timeOrder,
                dateOrder: dateOrder,

                name: name,
                phone: phone,
                adress: adress,
                isWhatsApp: isWhatsApp,
            }
        }).then(data => {
            if (data.data.response === "ok") {
                window.M.toast({html: "?????????? ????????????????????"});
            } else {
                window.M.toast({html: "????????????"});
            }
        })
    }

    function getDate() {
        let dates = [];

        for (let i = 0; i < 13; i++) {
            dates.push(<MenuItem
                value={moment(new Date()).add(i, "days").format("DD/MM")}>{moment(new Date()).locale("ru").add(i, "d").format("DD MMMM")}</MenuItem>);
        }

        return dates;
    }

    function getTimes(date = dateOrder) {
        axios.post("/api/orders/times/get", {dateOrder: date}).then(d => {
            console.log(d.data);
            setTimes(d.data.times);
        })
    }

    function handleDate(e) {
        setDateOrder(e);
        getTimes(e);
    }

    function validateForm() {
        if (name !== "" || name === ".") {
            setValidName(true);
        } else {
            setValidName(false);
        }

        if (phone !== "" || phone === ".") {
            setValidPhone(true);
        } else {
            setValidPhone(false);
        }
    }

    function calcAll() {
        let c = 0;
        switch (typeObject) {
            case "apartment":
                rooms.map(e => c = c + calcOneApartment(e));
                if (city === "????????????????") {
                    c = c + 500;
                }
                if (moment(timeOrder, "x") >= moment(dateOrder + " 17:00:00", "DD/MM HH:mm:ss")) {
                    c = c + ((c / 100) * 30);
                }
                setCost(c);
                return;
            case "homestead":
                square.map((e, i) => c = c + calcOneHomestead(e, trees[i]));
                if (city === "????????????????") {
                    c = c + 500;
                }
                if (moment(timeOrder, "x") >= moment(dateOrder + " 17:00:00", "DD/MM HH:mm:ss")) {
                    c = c + ((c / 100) * 30);
                }
                setCost(c);
                return;
            case "corp":
                c = c + 0;
                setCost(c);
                return;
        }
    }

    function calcAllApartments() {
        let c = 0;
        rooms.map(e => c = c + calcOneApartment(e, false));
        return c;
    }

    function calcAllHomestead() {
        let c = 0;
        square.map((e, i) => c = c + calcOneHomestead(e, trees[i]));
        return c;
    }


    function calcSumSquare() {
        let sq = 0;
        let tr = 0;
        square.map(e => sq = sq + e);
        trees.map(e => tr = tr + e);
        return {
            square: sq,
            trees: tr,
        }
    }

    function calcSaleMoreApartment(value, sale = true) {
        if (countApartment > 1 && sale === true) {
            return (value / 100) * 90;
        } else {
            return value;
        }
    }

    function calcOneApartment(count, sale = true) {
        switch (typeTreatment) {
            case "coldFog":
                if (count == 1) {
                    return calcSaleMoreApartment(3000, sale)
                } else if (count == 2) {
                    return calcSaleMoreApartment(3300, sale)
                } else if (count == 3) {
                    return calcSaleMoreApartment(3500, sale)
                } else if (count == 4) {
                    return calcSaleMoreApartment(3800, sale)
                } else if (count == 5) {
                    return calcSaleMoreApartment(4100, sale)
                }
            case "hotFog":
                return calcSaleMoreApartment(4000 + (500 * count), sale)
            case "duoFog":
                return calcSaleMoreApartment(5500 + (500 * count), sale)
        }
    }

    function calcOneHomestead(square, trees) {
        if (square <= "10") {
            return (600 * square) + (trees * 250);
        } else if (square <= "15") {
            return (550 * square) + (trees * 250);
        } else if (square <= "20") {
            return (500 * square) + (trees * 250);
        } else if (square > "20") {
            return (450 * square) + (trees * 250);
        }
        calcAll();
    }

    function handleRooms(value, i) {
        let arr = rooms.concat();
        arr[i] = Number(value);
        setRooms(arr);
    }

    function handleHomestead(value, i) {
        let arr = square.concat();
        arr[i] = Number(value);
        setSquare(arr);
    }

    function handleHomesteadTrees(value, i) {
        let arr = trees.concat();
        arr[i] = Number(value);
        setTrees(arr);
    }

    function addApartment() {
        setCountApartment(countApartment + 1);
        setRooms(rooms.concat(1));
        Scroll.scroller.scrollTo("down", {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: 50,
        });
    }

    function delApartment() {
        setCountApartment(countApartment - 1);
        setRooms(rooms.filter((e, i) => i !== rooms.length - 1));
    }

    function addHomestead() {
        setCountHomestead(countHomestead + 1);
        setSquare(square.concat(1));
        setTrees(trees.concat(0));
        Scroll.scroller.scrollTo("down", {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: 50,
        });
    }

    function delHomestead() {
        setCountHomestead(countHomestead - 1);
        setSquare(square.filter((e, i) => i !== square.length - 1));
        setTrees(trees.filter((e, i) => i !== trees.length - 1));
    }

    useEffect(() => {
        calcAll();
        validateForm();
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    })

    return <Container>
        <br/>
        <br/>
        <h4>?????????? ????????????</h4>
        {
            page === 1
                ? <div>
                    <h5>?????????? ????????????</h5>
                    <br/>

                    <FormControl fullWidth>
                        <InputLabel id="city">??????????</InputLabel>
                        <Select labelId="city" label="??????????" onChange={event => setCity(event.target.value)}>
                            <MenuItem value="????????????????" selected>????????????????</MenuItem>
                            <MenuItem value="????????????????">????????????????</MenuItem>
                            <MenuItem value="??????????">??????????</MenuItem>
                            <MenuItem value="????????????????????">????????????????????</MenuItem>
                            <MenuItem value="????????????">????????????</MenuItem>
                            <MenuItem value="????????????????">???????????????? (+ 500 ???)</MenuItem>
                            <MenuItem value="????????????????">????????????????</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <Alert severity="warning">?????????? ?????????????????????? ?? ???????????????? +500 ???</Alert>
                    <br/>
                    <Button variant="contained" onClick={() => setPage(page + 1)} disabled={!city}>??????????</Button>
                    <br/>
                </div>
                : null
        }
        {
            page === 2
                ? <div>
                    <h5>?????? ??????????????:</h5>
                    <ButtonGroup fullWidth orientation="vertical" variant="contained">
                        <Button fullWidth variant={`${typeObject === "apartment" ? "contained" : "outlined"}`}
                                onClick={() => setTypeObject("apartment")} xs={12} lg={3}>????????????????
                        </Button>
                        <Button fullWidth variant={`${typeObject === "homestead" ? "contained" : "outlined"}`}
                                onClick={() => setTypeObject("homestead")} xs={12} lg={3}>??????????????
                        </Button>
                        <Button fullWidth variant={`${typeObject === "corp" ? "contained" : "outlined"}`}
                                onClick={() => setTypeObject("corp")} xs={12} lg={3}>?????????????????????????? ????????????
                        </Button>
                    </ButtonGroup>
                    <br/>
                    <br/>

                    <ButtonGroup variant="contained">
                        <Button onClick={() => setPage(page - 1)}>??????????</Button>
                        <Button onClick={() => setPage(page + 1)} disabled={!typeObject}>??????????</Button>
                    </ButtonGroup>
                    <br/>
                </div>
                : null
        }
        {
            page === 3
                ? <div>
                    {
                        typeObject === "apartment"
                            ? <div>
                                <ButtonGroup fullWidth orientation="vertical" variant="contained">
                                    <Button fullWidth variant={`${typeTreatment === "coldFog" ? "contained" : "outlined"}`}
                                            onClick={() => setTypeTreatment("coldFog")} xs={12} lg={3}>???????????????? ??????????
                                    </Button>
                                    <Button fullWidth variant={`${typeTreatment === "hotFog" ? "contained" : "outlined"}`}
                                            onClick={() => setTypeTreatment("hotFog")} xs={12} lg={3}>?????????????? ??????????
                                    </Button>
                                    <Button fullWidth variant={`${typeTreatment === "duoFog" ? "contained" : "outlined"}`}
                                            onClick={() => setTypeTreatment("duoFog")} xs={12} lg={3}>?????????????????????? ??????????????????
                                    </Button>
                                </ButtonGroup>
                                <br/>
                                <br/>
                                <ButtonGroup variant="contained">
                                    <Button onClick={addApartment}>???????????????? ????????????????</Button>
                                    <Button onClick={delApartment}>?????????????? ????????????????</Button>
                                </ButtonGroup>
                                <br/>
                                <br/>
                                {
                                    countApartment >= 2
                                        ? <Alert severity="success">?????? ?????????????????????????????? ???????????? 10% ?????? ?????????????????? 2-???? ?? ??????????
                                            ??????????????</Alert>
                                        : null
                                }
                                <br/>
                                {
                                    rooms.map((e, i) => {
                                        return <div key={i}>
                                            <h6>#{i + 1} ???????????????????? ???????????? ({e}), ??????????????????: {calcOneApartment(e)} ???</h6>

                                            <FormControl fullWidth>
                                                <Slider
                                                    onChange={event => handleRooms(event.target.value, i)}
                                                    defaultValue={1}
                                                    getAriaValueText={val => {
                                                        return val + " ??????."
                                                    }}
                                                    step={1}
                                                    min={1}
                                                    max={5}
                                                    valueLabelDisplay="auto"
                                                    marks={[
                                                        {
                                                            value: 1,
                                                            label: "1 ??????."
                                                        },
                                                        {
                                                            value: 2,
                                                            label: "2 ??????."
                                                        },
                                                        {
                                                            value: 3,
                                                            label: "3 ??????."
                                                        }, {
                                                            value: 4,
                                                            label: "4 ??????."
                                                        },
                                                        {
                                                            value: 5,
                                                            label: "5 ??????."
                                                        },
                                                    ]}
                                                />
                                            </FormControl>
                                        </div>
                                    })
                                }
                                <br/>
                            </div>
                            : null
                    }
                    {
                        typeObject === "homestead"
                            ? <div>
                                <ButtonGroup fullWidth orientation="vertical" variant="contained">
                                    <Button fullWidth
                                            variant={`${typeTreatmentHomestead === "benz" ? "contained" : "outlined"}`}
                                            onClick={() => setTypeTreatmentHomestead("benz")} xs={12} lg={3}>????????????????????
                                        ??????????????????????????
                                    </Button>
                                    <Button fullWidth
                                            variant={`${typeTreatmentHomestead === "benz" ? "contained" : "outlined"}`}
                                            onClick={() => setTypeTreatmentHomestead("benz")} xs={12} lg={3}>??????????????????????????
                                        ??????????????????????????
                                    </Button>
                                </ButtonGroup>
                                <br/>
                                <br/>
                                <ButtonGroup variant="contained">
                                    <Button onClick={addHomestead}>???????????????? ??????????????</Button>
                                    <Button onClick={delHomestead}>?????????????? ??????????????</Button>
                                </ButtonGroup>
                                <br/>
                                <br/>
                                {
                                    square.map((e, i) => {
                                        return <div key={i}>
                                            <p>#{i + 1} ?????????????????? ???? ??????????????: {calcOneHomestead(e, trees[i])} ???</p>
                                            <FormControl fullWidth>
                                                <TextField label="?????????????? ?? ????????????" variant="outlined"
                                                           onChange={event => handleHomestead(event.target.value, i)} min={1}
                                                           defaultValue={1}/>
                                                <br/>
                                                <TextField label="???????????????? ?? ????????????" variant="outlined"
                                                           onChange={event => handleHomesteadTrees(event.target.value, i)}
                                                           min={0} defaultValue={0}/>
                                            </FormControl>
                                        </div>
                                    })
                                }
                                <br/>
                                <h6>?????????? ??????????????: {calcSumSquare().square} ??????.</h6>
                                <h6>?????????? ???????????????????? ????????????????: {calcSumSquare().trees} ????.</h6>
                            </div>
                            : null
                    }
                    {
                        typeObject === "corp"
                            ? <div>
                                <Alert severity="info">?????????????????? ???????????????????????????? ??????????????????????????</Alert>
                            </div>
                            : null
                    }
                    <Scroll.Element name="down"/>
                    <br/>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => setPage(page - 1)}>??????????</Button>
                        <Button onClick={() => setPage(page + 1)}>??????????</Button>
                    </ButtonGroup>
                    <br/>
                </div>
                : null
        }
        {
            page === 4
                ? <div>
                    <FormControl fullWidth>
                        <TextField label="?????????? ???? ???????????????? ???????????????????" variant="outlined" multiline
                                   onChange={event => setPests(event.target.value)}/>
                    </FormControl>
                    <br/>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => setPage(page - 1)}>??????????</Button>
                        <Button onClick={() => setPage(page + 1)}>??????????</Button>
                    </ButtonGroup>
                </div>
                : null
        }
        {
            page === 5
                ? <div>
                    <h5>?????????? ?????????????? ????????????</h5>
                    <FormControl fullWidth>
                        <InputLabel id="dates">???????? ????????????</InputLabel>
                        <Select labelId="dates" label="???????? ????????????" onChange={event => handleDate(event.target.value)}>
                            {dates.map(d => {
                                return d
                            })}
                        </Select>
                    </FormControl>
                    <br/>
                    {
                        dateOrder
                            ? <FormControl fullWidth>
                                <InputLabel id="times">?????????? ????????????</InputLabel>
                                <Select labelId="times" label="?????????? ????????????"
                                        onChange={event => setTimeOrder(event.target.value)}>
                                    {times.map((d, i) => {
                                        return <MenuItem disabled={d.disabled}
                                                         value={d.timestamp}>{d.time} {d.nightTime ? "(+30%)" : null} {d.disabled ? "????????????" : null}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            : null
                    }
                    <br/>
                    <Alert severity="warning">?????????? 17:00 - ?? ?????????????????? ???????????? +30%</Alert>
                    <br/>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => setPage(page - 1)}>??????????</Button>
                        <Button onClick={() => setPage(page + 1)} disabled={!timeOrder}>??????????</Button>
                    </ButtonGroup>
                </div>
                : null
        }
        {
            page === 6
                ? <div>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableRow>
                                    <TableCell>
                                        ?????????? ??????????????????????
                                    </TableCell>
                                    <TableCell align="right">
                                        {city === "????????????????" ? "500" : "0"} ???
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        ?????????????????? ??????????????????:
                                    </TableCell>
                                    <TableCell align="right">
                                        {typeObject === "apartment" ? calcAllApartments() : null}
                                        {typeObject === "homestead" ? calcAllHomestead() : null}
                                        ???
                                    </TableCell>
                                </TableRow>
                                {
                                    typeObject === "apartment" && countApartment > 1
                                        ? <TableRow>
                                            <TableCell>???????????? ???? 2 ?? ?????????? ?????????????? (-10%)</TableCell>
                                            <TableCell align="right">- {(calcAllApartments() / 100) * 10} ???</TableCell>
                                        </TableRow>
                                        : null
                                }
                                {
                                    moment(timeOrder, "x") >= moment(dateOrder + " 17:00:00", "DD/MM HH:mm:ss")
                                        ? <TableRow>
                                            <TableCell>?????????????? ?????????? ?????????????????????? (+30%)</TableCell>
                                            <TableCell align="right">+
                                                {
                                                    typeObject === "apartment"
                                                        ? (calcAllApartments() / 100) * 30 + "???"
                                                        : null
                                                }
                                                {
                                                    typeObject === "homestead"
                                                        ? (calcAllHomestead() / 100) * 30 + "???"
                                                        : null
                                                }
                                                {
                                                    typeObject === "factory"
                                                        ? "+30%"
                                                        : null
                                                }
                                            </TableCell>
                                        </TableRow>
                                        : null
                                }
                            </Table>
                        </TableContainer>
                    </Paper>
                    <br/>
                    <h4>????????: {cost} ???</h4>
                    <br/>
                    <Alert severity="info">???????? ???????????????? ??????????????????????????????</Alert>
                <br/>
                    <Paper>
                        <Container>
                            <h5>???????????????????? ????????????</h5>
                            <br/>
                            <FormControl fullWidth>
                                <TextField label="??????" variant="outlined" noValidate={!validName}
                                           onChange={event => setName(event.target.value)}/>
                                <TextField label="??????????????" variant="outlined" noValidate={!validPhone}
                                           onChange={event => setPhone(event.target.value)}/>
                                <TextField label="??????????" variant="outlined"
                                           onChange={event => setAdress(event.target.value)}/>
                                <FormControlLabel control={<Checkbox />} onChange={() => setIsWhatsApp(!isWhatsApp)} label="???????? ???? WhatsApp ???? ???????? ?????????????" />
                            </FormControl>
                        </Container>
                        <Alert severity="info">?????? ?????????????? ???? ???????????? "??????????????????", ???? ???????????????????????? ?? <a href="/pol.html" target="_blank">?????????????????? ??
                            ?????????????????? ???????????????????????? ????????????</a></Alert>
                    </Paper>
                    <br/>
                <br/>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => setPage(page - 1)}>??????????</Button>
                        <Button onClick={send}>??????????????????</Button>
                    </ButtonGroup>
                </div>
                : null
        }
    </Container>
}

export default withRouter(Calc);