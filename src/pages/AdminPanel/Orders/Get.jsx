import React, {useEffect, useState} from "react";
import moment from "moment";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../../../store";

function AdminOrderGet(props) {
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("null");

    useEffect(() => {
        if (isLoading === true) {
            if (store.getState().loginStatus === false) {
                props.history.push("/admin/login");
            }
    
            getOrder();
        }
    })

    function getOrder() {
        axios.post("/api/orders/get/id", {token: store.getState().token, _id: props.match.params.id}).then(data => {
            console.log(data.data);
            setOrder(data.data.data);
            setIsLoading(false)
        })
    }

    function getTitleTypeObject(type) {
        switch(type) {
            case "apartment":
                return "Квартира ";
            case "homestead":
                return "Участок ";
            case "corp":
                return "Корпоративный клиент ";
        }
    }

    function getTitleTypeTreatment(typeObject, typeTreatment, typeTreatmentHomestead) {
        switch(typeObject) {
            case "apartment":
                switch(typeTreatment) {
                    case "coldFog":
                        return "Холодный туман ";
                    case "hotFog":
                        return "Горячий туман ";
                    case "duoFog":
                        return "Комплексная обработка ";
                }
            case "homestead":
                switch(typeTreatmentHomestead) {
                    case "benz":
                        return "Бензиновый ";
                    case "electro":
                        return "Электрический ";
                }
            case "corp":
                return "";
        }
    }

    function getApartments(rooms = []) {
        return 
    }

    return <div className="container">
        <br />
        <h2>Заказы</h2>
        <br />
        {
            isLoading === false  
                ? <div>
                    <h4>{order.name}</h4>
                    <h4>Предположительная цена: {order.cost} ₽</h4>
                    <p>{moment(order.time).locale("ru").fromNow()}</p>
                    <a href={"tel:" + order.phone} className="btn red">Позвонить</a>
                    {
                        order.email !== "." && order.email !== ""
                            ? <a href={"mailto:" + order.email} className="btn red">Отправить EMail</a>
                            : null
                    }
                    <br />
                    <p>
                        {getTitleTypeObject(order.typeObject)}
                        {getTitleTypeTreatment(order.typeObject, order.typeTreatment, order.typeTreatmentHomestead)}
                        {order.city}
                    </p>
                    <p>{order.pests}</p>
                    <p>
                        {
                            order.typeObject === "apartment"
                                ? order.rooms.map((e, i) => {
                                    return <p>#{i + 1} {e}-х комнатная квартира</p>
                                })
                                : null
                        }
                        {
                            
                            order.typeObject === "homestead"
                                ? order.square.map((e, i) => {
                                    return <p>#{i + 1} {e} сот. участок и {order.trees[i]} деревьев</p>
                                })
                                : null
                        }
                        {
                            
                            order.typeObject === "corp"
                                ? <p>Договариваться индивидуально</p>
                                : null
                        }
                    </p>
                </div>
                : <p>Loading...</p>
        }
    </div>
}

export default withRouter(AdminOrderGet);