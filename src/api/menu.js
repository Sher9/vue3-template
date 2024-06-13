import request from '@/util/request'

export const getTreeData = (params) => {
    return request({
        url: '/dsMenu/tree',
        method: 'get',
        params: params
    })
}

export const add = (data) => {
    return request({
        url: '/dsMenu/add',
        method: 'post',
        data: data,
    })
}


export const update = (data) => {
    return request({
        url: '/dsMenu/update',
        method: 'post',
        data: data,
    })
}

export const remove = (data) => {
    return request({
        url: '/dsMenu/remove',
        method: 'post',
        data: data,
    })
}
