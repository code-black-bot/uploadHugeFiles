import service from './http';

export default function upload(data){
    return service({
        url:'/upload',
        params:data
    })
} 