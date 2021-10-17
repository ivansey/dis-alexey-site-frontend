import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Scroll from "react-scroll";
import moment from "moment";

import "materialize-css/dist/js/materialize.min";

import chehov from "../pictures/citys/chehov.png";
import domoded from "../pictures/citys/domoded.gif";
import moscow from "../pictures/citys/moscow.jpg";
import podolsk from "../pictures/citys/podolsk.jpg";
import serpuchov from "../pictures/citys/serpuchov.gif";
import shcherbinov from "../pictures/citys/shcherbinov.png"
import vidnoe from "../pictures/citys/vidnoe.gif";

function Calc(props) {
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
    const [dateOrder, setDateOrder] = useState("");

    const [dates, setDates] = useState(getDate());
    const [times, setTimes] = useState([]);
    const [disTimes, setDisTimes] = useState([])
    const [isLoading, setIsLoading] = useState(true);

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
                value={moment(new Date()).add(i, "d").format("x")}>{moment(new Date()).locale("ru").add(i, "d").format("DD MMMM")}</option>);
        }

        return dates;
    }

    function getTimes() {
        let times = [];
        let timestamp, time, nightTime;
        let disabled;
        let date = moment(dateOrder, "x").format("DD/MM");
        console.log(date);

        for (let i = 0; i < 15; i++) {
            timestamp = moment(`${date} 10:00:00`, "DD/MM HH:mm:ss").add(i, "h").format("x");
            time = moment(`${date} 10:00:00`, "DD/MM HH:mm:ss").add(i, "h").format("HH:mm");
            console.log(time, timestamp, `${date} 10:00:00`);
            nightTime = moment(`${date} 10:00:00`, "DD/MM HH:mm:ss").add(i, "h") >= moment(`${date} 17:00:00`, "DD/MM HH:mm:ss") ? "(+30% к цене)" : null;
            times.push(<option disabled={disabled} value={timestamp}>{time} {nightTime}</option>);
            console.log(times);
        }

        setTimes(times);
        setIsLoading(false);
    }

    function handleDate(e) {
        setDateOrder(e);
        setIsLoading(true);
    }

    function checkTime(time) {
        return axios.post("/api/orders/times/checkOne", {time: time}).then(d => {
            return d.data.find;
        })
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
                if (moment(timeOrder, "x") >= moment("17:00:00", "HH:mm:ss")) {
                    c = c + ((c / 100) * 30);
                }
                setCost(c);
                return;
            case "homestead":
                square.map((e, i) => c = c + calcOneHomestead(e, trees[i]));
                if (city === "Серпухов") {
                    c = c + 500;
                }
                if (moment(timeOrder, "x") >= moment("17:00:00", "HH:mm:ss")) {
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
        if (isLoading) {
            getTimes();
        }
    })

    return <div>
        <br/>
        <div className="container">
            <h2>Заказ</h2>
            <div className="col s12">
                <h5>Выбирите район:</h5>
                <select onChange={event => setCity(event.target.value)}>
                    <option value="Подольск" selected data-icon={podolsk}>Подольск</option>
                    <option value="Чехов" data-icon={chehov}>Чехов</option>
                    <option value="Домодедово" data-icon={domoded}>Домодедово</option>
                    <option value="Видное" data-icon={vidnoe}>Видное</option>
                    <option value="Серпухов" data-icon={serpuchov}>Серпухов (+ 500 ₽)</option>
                    <option value="Щербинов" data-icon={shcherbinov}>Щербинов</option>
                    <option value="Климовск">Климовск</option>
                </select>
            </div>
            <h6>Выезд специалиста бесплатно, кроме района Серпухова (500 ₽)</h6>
            <h5>Тип объекта:</h5>
            <div className="row">
                <button className={`btn ${typeObject === "apartment" ? "orange" : "red"}`}
                        onClick={() => setTypeObject("apartment")}>Квартира
                </button>
                <button className={`btn ${typeObject === "homestead" ? "orange" : "green"}`}
                        onClick={() => setTypeObject("homestead")}>Участок
                </button>
                <button className={`btn ${typeObject === "corp" ? "orange" : "blue"}`}
                        onClick={() => setTypeObject("corp")}>Корпоративный клиент
                </button>
            </div>
            {
                typeObject === "apartment"
                    ? <div>
                        <div className="row">
                            <button className={`btn ${typeTreatment === "coldFog" ? "orange" : "red"}`}
                                    onClick={() => setTypeTreatment("coldFog")}>Холодный туман
                            </button>
                            <button className={`btn ${typeTreatment === "hotFog" ? "orange" : "blue"}`}
                                    onClick={() => setTypeTreatment("hotFog")}>Горячий туман
                            </button>
                            <button className={`btn ${typeTreatment === "duoFog" ? "orange" : "green"}`}
                                    onClick={() => setTypeTreatment("duoFog")}>Комплексная обработка
                            </button>
                        </div>
                        <br/>
                        <button className="btn green" onClick={addApartment}>Добавить квартиру</button>
                        <button className="btn red" onClick={delApartment}>Удалить квартиру</button>
                        {
                            countApartment >= 2
                                ? <h5>Вам предостовляется скидка 10% при обработке 2-ух и более квартир</h5>
                                : null
                        }
                        {
                            rooms.map((e, i) => {
                                return <p className="range-field" key={i}>
                                    <h6>#{i + 1} Количество комнат ({e}), стоимость: {calcOneApartment(e)} ₽</h6>
                                    <input className="red" type="range" min="1" max="5" defaultValue="1"
                                           onChange={event => handleRooms(event.target.value, i)}/>
                                </p>
                            })
                        }
                    </div>
                    : null
            }
            {
                typeObject === "homestead"
                    ? <div>
                        <div className="row">
                            <button className={`btn ${typeTreatmentHomestead === "benz" ? "orange" : "red"}`}
                                    onClick={() => setTypeTreatmentHomestead("benz")}>Бензиновый опрыскиватель
                            </button>
                            <button className={`btn ${typeTreatmentHomestead === "electro" ? "orange" : "blue"}`}
                                    onClick={() => setTypeTreatmentHomestead("electro")}>Электрический опрыскиватель
                            </button>
                        </div>
                        <br/>
                        <button className="btn green" onClick={addHomestead}>Добавить участок</button>
                        <button className="btn red" onClick={delHomestead}>Удалить участок</button>
                        {
                            square.map((e, i) => {
                                return <p className="input-field" key={i}>
                                    <p>#{i + 1} Площадь участка (сот.), стоимость: {calcOneHomestead(e, trees[i])} ₽</p>
                                    <input type="number" min="1" defaultValue="1"
                                           onChange={event => handleHomestead(event.target.value, i)}/>
                                    <p>Количество деревьев (шт.)</p>
                                    <input type="number" min="0" defaultValue="0"
                                           onChange={event => handleHomesteadTrees(event.target.value, i)}/>
                                </p>
                            })
                        }
                        <h5>Общая площадь: {calcSumSquare().square} сот.</h5>
                        <h5>Общее количество деревьев: {calcSumSquare().trees} шт.</h5>
                    </div>
                    : null
            }
            {
                typeObject === "corp"
                    ? <div>
                        <h5>Стоимость обговаривается индивидуально</h5>
                    </div>
                    : null
            }
            <Scroll.Element name="down"/>
            <h5>Каких вы заметили паразитов?</h5>
            <div className="input-field col s12">
                <textarea className="materialize-textarea" defaultValue={pests}
                          onChange={event => setPests(event.target.value)}></textarea>
            </div>
            <br/>
            <div className="col s12">
                <label forHTML="dates">Выбирите дату заказа</label>
                <select name="dates" onChange={event => handleDate(event.target.value)}>
                    {dates.map(d => {
                        return d
                    })}
                </select>
            </div>
            <br/>
            <div className="col s12">
                <label forHTML="times">Выбирите время заказа</label>
                <select name="times" onChange={event => setTimeOrder(event.target.value)}>
                    {times.map(d => {
                        return d
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
                        moment(new Date(Number(timeOrder))) >= moment("17:00:00", "HH:mm:ss")
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
        </div>
    </div>
}

export default withRouter(Calc);