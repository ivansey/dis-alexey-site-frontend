export default (state, action) => {
    switch (action.type) {
        case "loginStatus/true":
            return Object.assign(state, {loginStatus: true});
        case "loginStatus/false":
            return Object.assign(state, {loginStatus: false});
        case "user/info/update":
            return Object.assign(state, {userInfo: action.info});
        case "tel/add":
            return Object.assign(state, {tel: action.tel, telLink: action.telLink});
        default:
            return state;
    }
}