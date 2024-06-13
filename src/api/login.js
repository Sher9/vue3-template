import request from '@/util/request'


export const loginByUsername = (data) => {
    return request({
        url: '/login',
        method: 'post',
        data: data,
    })
}



export const getDicData = () => {
    return request({
        url: '/dictData/list',
        method: 'get'
    })
}