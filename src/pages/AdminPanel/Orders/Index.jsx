import React, {useEffect, useState} from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../../../store";

function AdminOrders(props) {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("null");

    useEffect(() => {
        if (store.getState().loginStatus === false) {
			props.history.push("/admin/login");
		}

        getOrders();
    })

    function getOrders() {
        axios.post("/api/orders/get", {token: store.getState().token}).then(data => {
            const req = data.data;

            setOrders(req.data);
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

    return <div className="container">
        <br />
        <h2>Заказы</h2>
        <br />
        {
            isLoading === true  
                ? <p>Loading...</p>
                : null
        }
        {
            orders.map((e,i) => {
                return <div className="col s12 m6 l6">
                    <div className="card" key={i}>
                        <div className="card-content">
                            <span className="card-title">{e.name}</span>
                            <p>
                                {getTitleTypeObject(e.typeObject)}
                                {getTitleTypeTreatment(e.typeObject, e.typeTreatment, e.typeTreatmentHomestead)}
                                {e.city}
                            </p>
                        </div>
                        <div className="card-action">
                            <a href={"tel:" + e.phone}>Позвонить</a>
                            <Link to={"/admin/orders/get/" + e._id}>Подробнее</Link>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}

export default withRouter(AdminOrders);