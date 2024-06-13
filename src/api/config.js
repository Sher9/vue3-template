import request from '@/util/request'

export const getList = (page, pageSize, params) => {
    return request({
        url: '/wfjobInfo/getWorkGroupList',
        method: 'get',
        params: {
            ...params,
            page,
            pageSize,
        }
    })
}


export const getDetail = (id) => {
    return request({
        url: '/wfjobInfo/workflowDetails',
        method: 'post',
        params: {
            id
        }
    })
}


export const remove = (ids) => {
    return request({
        url: '/wfjobInfo/deleteWorkGroup',
        method: 'post',
        params: {
            ids,
        }
    })
}

export const add = (params) => {
    return request({
        url: '/wfjobInfo/addWorkGroup',
        method: 'post',
        data: params
    })
}

export const update = (params) => {
    return request({
        url: '/wfjobInfo/updateWorkGroup',
        method: 'post',
        data: params
    })
}
/**
 * 保存配置
 * @param {*} params
 */
export const save = (params) => {
    return request({
        url: '/wfjobInfo/configuration',
        method: 'post',
        data: params
    })
}

/**
 * 获取任务列表
 * @param {*} params
 */
export const getTaskList = (params) => {
    return request({
        url: '/wfjobInfo/listAll',
        method: 'get',
        params: params
    })
}
