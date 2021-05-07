const user = {
    state:{
        token:localStorage.getItem('token'),
        name:''
    },
    actions:{
        getUserToken({commit},payload){
            console.log(payload)
            commit("SET_TOKEN",payload)
        }
    },
    mutations:{
        // 注册获取token事件 利用dispatch回调
        SET_TOKEN(state,payload){
            state.token =  payload.token
        }
    }
}

export default user;