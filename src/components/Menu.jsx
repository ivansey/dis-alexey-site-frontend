import React from "react";
import {withRouter} from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, useScrollTrigger, Slide, Divider} from "@mui/material";
import {DashboardRounded, CallRounded, AssignmentRounded, ClassRounded, LocalOfferRounded} from '@mui/icons-material';
import store from "../store";

function HideOnScroll(props) {
    const {children, window} = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    })

    return <Slide appear={false} director="down" in={!trigger}>
        {children}
    </Slide>
}

function Menu(props) {
    function hrefTo(href) {
        props.history.push(href);
    }

    // return <React.Fragment>
    //     <HideOnScroll {...props}>
    //         <AppBar position="fixed">
    //             <Toolbar variant="dense">
    //                 <Typography variant="h6" color="inherit" component="div" sx={{flexGrow: 1}}
    //                             onClick={() => hrefTo("/")}>SuperAntiKlop</Typography>
    //                 <Button variant="text" color="inherit"
    //                         href={`tel:${store.getState().telLink}`}><CallRounded/></Button>
    //                 {
    //                     store.getState().loginStatus === true
    //                         ? <Button color="inherit" onClick={() => hrefTo("/admin")}><DashboardRounded/></Button>
    //                         : null
    //                 }
    //             </Toolbar>
    //             <Toolbar>
    //                 <Button color="inherit" onClick={() => hrefTo("/pricelist")}
    //                         startIcon={<LocalOfferRounded/>}>Услуги</Button>
    //                 <Divider/>
    //                 <Button color="inherit" onClick={() => hrefTo("/portfolio/home")}
    //                         startIcon={<ClassRounded/>}>Обработки</Button>
    //                 <Divider/>
    //                 <Button color="inherit" onClick={() => hrefTo("/calc")}
    //                         startIcon={<AssignmentRounded/>}>Заказать</Button>
    //             </Toolbar>
    //         </AppBar>
    //     </HideOnScroll>
    //     <Toolbar/>
    // </React.Fragment>

    return <div className="menu-bottom">
        <button className="button" onClick={() => hrefTo("/pricelist")}><LocalOfferRounded/>Услуги</button>
        <button className="button" onClick={() => hrefTo("/portfolio/home")}><ClassRounded/>Обработки</button>
        <button className="button" onClick={() => hrefTo("/calc")}><AssignmentRounded/>Заказать</button>
    </div>
}

export default withRouter(Menu);