import cookies from "react-cookies";

const state = {
    tel: "+7 925 848-79-89",
    telLink: "+79258487989",
    token: cookies.load("token"),
    loginStatus: false,
    userInfo: {},
}

export default state;