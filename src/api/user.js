import request from '@/util/request'


export const getList = (params) => {
    return request({
        url: '/dsUser/page',
        method: 'get',
        params: params
    })
}



export const getDeptTree = (params) => {
    return request({
        url: '/dsDept/tree',
        method: 'get',
        params: params
    })
}

export const getMenuTree = (params) => {
    return request({
        url: '/dsMenu/tree',
        method: 'get',
        params: params
    })
}


export const resetPassword = (data) => {
    return request({
        url: '/dsUser/reset-password',
        method: 'post',
        data: data,
    })
}

export const add = (data) => {
    return request({
        url: '/dsUser/add',
        method: 'post',
        data: data,
    })
}


export const update = (data) => {
    return request({
        url: '/dsUser/update',
        method: 'post',
        data: data,
    })
}

export const remove = (data) => {
    return request({
        url: '/dsUser/remove',
        method: 'post',
        data: data,
    })
}


export const getUserMenu = (params) => {
    return request({
        url: '/dsUser/queryUserMenu',
        method: 'get',
        params: params
    })
}


export const saveRight = (data) => {
    return request({
        url: '/dsUser/userMenuSave',
        method: 'post',
        data: data,
    })
}


export const getMenusAndButtons = (params) => {
    return request({
        url: '/dsUser/authMenu',
        method: 'get',
        params: params
    })
}
