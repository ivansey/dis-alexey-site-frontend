import React from "react";
import {withRouter} from "react-router-dom";
import {Button, ButtonGroup} from "@mui/material";
import store from "../store";

function NewOrderButtons (props) {
    return <ButtonGroup variant={props.variant} color={props.color}>
        <Button href={`tel:${store.getState().telLink}`}>Позвонить</Button>
        <Button onClick={() => props.history.push("/calc")}>Сделать заказ онлайн</Button>
    </ButtonGroup>
}

export default withRouter(NewOrderButtons)