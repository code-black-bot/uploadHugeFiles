import service from './http';

export default function login(data){
    return service({
        url:'/login',
        params:data
    })
}