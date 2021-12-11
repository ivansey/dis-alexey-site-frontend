import React from "react";
import {withRouter} from "react-router-dom";
import {Button, ButtonGroup} from "@mui/material";
import store from "../store";
import {CallRounded, AssignmentRounded} from "@mui/icons-material";

function NewOrderButtons (props) {
    return <div className="buttonGroup">
        <button className="button" href={`tel:${store.getState().telLink}`}><CallRounded/> Позвонить</button>
        <button className="button" onClick={() => props.history.push("/calc")}><AssignmentRounded/> Сделать заказ онлайн</button>
    </div>
}

export default withRouter(NewOrderButtons)