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
} from "@mui/material";

function Calc(props) {
    const [page, setPage] = useState(1);

    const [typeObject, setTypeObject] = useState("apartment");
    const [typeTreatment, setTypeTreatment] = useState("coldFog");
    const [typeTreatmentHomestead, setTypeTreatmentHomestead] = useState("benz");
    const [city, setCity] = useState("Подольск");

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
    const [dateOrder, setDateOrder] = useState(moment(new Date()).format("x"));

    const [isLoading, setIsLoading] = useState(true);

    const [times, setTimes] = useState([]);
    const [dates, setDates] = useState(getDate());

    function send() {
        if (!validName) {
            window.M.toast({html: "Не введено имя"});
            return;
        } else if (!validPhone) {
            window.M.toast({html: "Не введен номер телефона"});
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
                window.M.toast({html: "Форма отправлена"});
            } else {
                window.M.toast({html: "Ошибка"});
            }
        })
    }

    function getDate() {
        let dates = [];

        for (let i = 0; i < 13; i++) {
            dates.push(<option
                value={moment(new Date()).add(i, "days").format("DD/MM")}>{moment(new Date()).locale("ru").add(i, "d").format("DD MMMM")}</option>);
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
                if (city === "Серпухов") {
                    c = c + 500;
                }
                if (moment(timeOrder, "x") >= moment(dateOrder + " 17:00:00", "DD/MM HH:mm:ss")) {
                    c = c + ((c / 100) * 30);
                }
                setCost(c);
                return;
            case "homestead":
                square.map((e, i) => c = c + calcOneHomestead(e, trees[i]));
                if (city === "Серпухов") {
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
        <h4>Заказ онлайн</h4>
        {
            page === 1
                ? <div>
                    <h5>Выбор города</h5>
                    <br/>

                    <FormControl fullWidth>
                        <InputLabel id="city">Город</InputLabel>
                        <Select labelId="city" label="Город" onChange={event => setCity(event.target.value)}>
                            <MenuItem value="Подольск" selected>Подольск</MenuItem>
                            <MenuItem value="Климовск">Климовск</MenuItem>
                            <MenuItem value="Чехов">Чехов</MenuItem>
                            <MenuItem value="Домодедово">Домодедово</MenuItem>
                            <MenuItem value="Видное">Видное</MenuItem>
                            <MenuItem value="Серпухов">Серпухов (+ 500 ₽)</MenuItem>
                            <MenuItem value="Щербинов">Щербинов</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <Alert severity="warning">Выезд специалиста в Серпухов +500 ₽</Alert>
                    <br/>
                    <Button variant="contained" onClick={() => setPage(page + 1)}>Далее</Button>
                    <br/>
                </div>
                : null
        }
        {
            page === 2
                ? <div>
                    <h5>Тип объекта:</h5>
                    <ButtonGroup fullWidth orientation="vertical" variant="contained">
                        <Button fullWidth variant={`${typeObject === "apartment" ? "contained" : "outlined"}`}
                                onClick={() => setTypeObject("apartment")} xs={12} lg={3}>Квартира
                        </Button>
                        <Button fullWidth variant={`${typeObject === "homestead" ? "contained" : "outlined"}`}
                                onClick={() => setTypeObject("homestead")} xs={12} lg={3}>Участок
                        </Button>
                        <Button fullWidth variant={`${typeObject === "corp" ? "contained" : "outlined"}`}
                                onClick={() => setTypeObject("corp")} xs={12} lg={3}>Корпоративный клиент
                        </Button>
                    </ButtonGroup>
                    <br/>
                    <br/>

                    <ButtonGroup variant="contained">
                        <Button onClick={() => setPage(page - 1)}>Назад</Button>
                        <Button onClick={() => setPage(page + 1)}>Далее</Button>
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
                                            onClick={() => setTypeTreatment("coldFog")} xs={12} lg={3}>Холодный туман
                                    </Button>
                                    <Button fullWidth variant={`${typeTreatment === "hotFog" ? "contained" : "outlined"}`}
                                            onClick={() => setTypeTreatment("hotFog")} xs={12} lg={3}>Горячий туман
                                    </Button>
                                    <Button fullWidth variant={`${typeTreatment === "duoFog" ? "contained" : "outlined"}`}
                                            onClick={() => setTypeTreatment("duoFog")} xs={12} lg={3}>Комплексная обработка
                                    </Button>
                                </ButtonGroup>
                                <br/>
                                <br/>
                                <ButtonGroup variant="contained">
                                    <Button onClick={addApartment}>Добавить квартиру</Button>
                                    <Button onClick={delApartment}>Удалить квартиру</Button>
                                </ButtonGroup>
                                <br/>
                                <br/>
                                {
                                    countApartment >= 2
                                        ? <Alert severity="success">Вам предостовляется скидка 10% при обработке 2-ух и более
                                            квартир</Alert>
                                        : null
                                }
                                <br/>
                                {
                                    rooms.map((e, i) => {
                                        return <div key={i}>
                                            <h6>#{i + 1} Количество комнат ({e}), стоимость: {calcOneApartment(e)} ₽</h6>

                                            <FormControl fullWidth>
                                                <Slider
                                                    onChange={event => handleRooms(event.target.value, i)}
                                                    defaultValue={1}
                                                    getAriaValueText={val => {
                                                        return val + " ком."
                                                    }}
                                                    step={1}
                                                    min={1}
                                                    max={5}
                                                    valueLabelDisplay="auto"
                                                    marks={[
                                                        {
                                                            value: 1,
                                                            label: "1 ком."
                                                        },
                                                        {
                                                            value: 2,
                                                            label: "2 ком."
                                                        },
                                                        {
                                                            value: 3,
                                                            label: "3 ком."
                                                        }, {
                                                            value: 4,
                                                            label: "4 ком."
                                                        },
                                                        {
                                                            value: 5,
                                                            label: "5 ком."
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
                                            onClick={() => setTypeTreatmentHomestead("benz")} xs={12} lg={3}>Бензиновый
                                        опрыскиватель
                                    </Button>
                                    <Button fullWidth
                                            variant={`${typeTreatmentHomestead === "benz" ? "contained" : "outlined"}`}
                                            onClick={() => setTypeTreatmentHomestead("benz")} xs={12} lg={3}>Электрический
                                        опрыскиватель
                                    </Button>
                                </ButtonGroup>
                                <br/>
                                <br/>
                                <ButtonGroup variant="contained">
                                    <Button onClick={addHomestead}>Добавить участок</Button>
                                    <Button onClick={delHomestead}>Удалить участок</Button>
                                </ButtonGroup>
                                <br/>
                                <br/>
                                {
                                    square.map((e, i) => {
                                        return <div key={i}>
                                            <p>#{i + 1} Стоимость за участок: {calcOneHomestead(e, trees[i])} ₽</p>
                                            <input type="number" min="1" defaultValue="1"
                                            />
                                            <FormControl fullWidth>
                                                <TextField label="Площадь в сотках" variant="outlined"
                                                           onChange={event => handleHomestead(event.target.value, i)} min={1}
                                                           defaultValue={1}/>
                                                <br/>
                                                <TextField label="Деревьев в штуках" variant="outlined"
                                                           onChange={event => handleHomesteadTrees(event.target.value, i)}
                                                           min={0} defaultValue={0}/>
                                            </FormControl>
                                            <p>Количество деревьев (шт.)</p>
                                            <input type="number" min="0" defaultValue="0"
                                                   onChange={event => handleHomesteadTrees(event.target.value, i)}/>
                                        </div>
                                    })
                                }
                                <br/>
                                <h6>Общая площадь: {calcSumSquare().square} сот.</h6>
                                <h6>Общее количество деревьев: {calcSumSquare().trees} шт.</h6>
                            </div>
                            : null
                    }
                    {
                        typeObject === "corp"
                            ? <div>
                                <Alert severity="info">Стоимость обговаривается индивидуально</Alert>
                            </div>
                            : null
                    }
                    <Scroll.Element name="down"/>
                    <br/>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => setPage(page - 1)}>Назад</Button>
                        <Button onClick={() => setPage(page + 1)}>Далее</Button>
                    </ButtonGroup>
                    <br/>
                </div>
                : null
        }
        {
            page === 4
                ? <div>
                    <FormControl fullWidth>
                        <TextField label="Каких вы заметили паразитов?" variant="outlined" multiline
                                   onChange={event => setPests(event.target.value)}/>
                    </FormControl>
                    <br/>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => setPage(page - 1)}>Назад</Button>
                        <Button onClick={() => setPage(page + 1)}>Далее</Button>
                    </ButtonGroup>
                </div>
                : null
        }

        <br/>
        <div className="col s12">
            <label forHTML="dates">Выбирите дату заказа</label>
            <select name="dates" onChange={event => handleDate(event.target.value)}>
                <option value="" selected>---</option>
                {dates.map(d => {
                    return d
                })}
            </select>
        </div>
        <br/>
        <div className="col s12">
            <label forHTML="times">Выбирите время заказа</label>
            <select name="times" onChange={event => setTimeOrder(event.target.value)}>
                {times.map((d, i) => {
                    return <option disabled={d.disabled}
                                   value={d.timestamp}>{d.time} {d.nightTime ? "(+30%)" : null} {d.disabled ? "занято" : null}</option>
                })}
            </select>
        </div>
        <p>После 17:00 - к стоимости заказа +30%</p>
        <br/>
        <div className="col s12">
            <table>
                <tr>
                    <th>Выезд специалиста</th>
                    <th>{city === "Серпухов" ? "500" : "0"} ₽</th>
                </tr>
                <tr>
                    <th>Стоимость обработки:</th>
                    <th>
                        {typeObject === "apartment" ? calcAllApartments() : null}
                        {typeObject === "homestead" ? calcAllHomestead() : null}
                        ₽
                    </th>
                </tr>
                {
                    typeObject === "apartment" && countApartment > 1
                        ? <tr>
                            <th>Скидка за 2 и более квартир (-10%)</th>
                            <th>- {(calcAllApartments() / 100) * 10} ₽</th>
                        </tr>
                        : null
                }
                {
                    moment(timeOrder, "x") >= moment(dateOrder + " 17:00:00", "DD/MM HH:mm:ss")
                        ? <tr>
                            <th>Поздний выезд специалиста (+30%)</th>
                            <th>+
                                {
                                    typeObject === "apartment"
                                        ? (calcAllApartments() / 100) * 30 + "₽"
                                        : null
                                }
                                {
                                    typeObject === "homestead"
                                        ? (calcAllHomestead() / 100) * 30 + "₽"
                                        : null
                                }
                                {
                                    typeObject === "homestead"
                                        ? "+30%"
                                        : null
                                }
                            </th>
                        </tr>
                        : null
                }
            </table>
        </div>
        <h4>Итог: {cost} ₽</h4>
        <br/>
        <h5>Контактные данные</h5>
        <div className="row">
            <div className="input-field col s12 m6 l3">
                <p>Имя</p>
                <input type="text" className={validName ? "validate" : "invalid"}
                       onChange={event => setName(event.target.value)}/>
            </div>
            <div className="input-field col s12 m6 l3">
                <p>Телефон</p>
                <input type="text" className={validPhone ? "validate" : "invalid"}
                       onChange={event => setPhone(event.target.value)}/>
            </div>
            <div className="input-field col s12 m6 l3">
                <p>Адрес (по желанию)</p>
                <input type="text" onChange={event => setAdress(event.target.value)}/>
            </div>
            <div className="col s12 m6 l3">
                <label><input type="checkbox" onChange={() => setIsWhatsApp(!isWhatsApp)}/><span>Есть ли WhatsApp на этом номере?</span></label>
            </div>
            <br/>
        </div>
        <p>При нажатии на кнопку "Отправить", вы соглашаетесь с <a href="/pol.html" target="_blank">Политикой в
            отношении персональных данных</a></p>
        <button className="btn" onClick={send}>Отправить</button>
        <br/>
    </Container>
}

export default withRouter(Calc);