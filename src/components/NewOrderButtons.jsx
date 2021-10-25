import React from "react";
import {withRouter} from "react-router-dom";
import {Button, ButtonGroup} from "@mui/material";
import store from "../store";
import {CallRounded, AssignmentRounded} from "@mui/icons-material";

function NewOrderButtons (props) {
    return <ButtonGroup variant={props.variant} color={props.color}>
        <Button href={`tel:${store.getState().telLink}`} startIcon={<CallRounded/>}>Позвонить</Button>
        <Button onClick={() => props.history.push("/calc")} startIcon={<AssignmentRounded/>}>Сделать заказ онлайн</Button>
    </ButtonGroup>
}

export default withRouter(NewOrderButtons)