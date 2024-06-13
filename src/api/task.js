import request from '@/util/request'

export const getList = (current, size, params) => {
    return request({
        url: '/schedulejobinfo/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const add = (row) => {
    return request({
        url: '/schedulejobinfo/save',
        method: 'post',
        data: row
    })
}

export const update = (row) => {
    return request({
        url: '/schedulejobinfo/update',
        method: 'post',
        data: row
    })
}


export const remove = (selections) => {
    return request({
        url: '/schedulejobinfo/removeJobs',
        method: 'post',
        data: selections
    })
}


export const stopTask = (selections) => {
    return request({
        url: '/schedulejobinfo/pauseJobs',
        method: 'post',
        data: selections
    })
}

export const resumeTask = (selections) => {
    return request({
        url: '/schedulejobinfo/resumeJobs',
        method: 'post',
        data: selections
    })
}



export const getNextTriggerTime = (params) => {
    return request({
        url: '/schedulejobinfo/nextTriggerTime',
        method: 'get',
        params: params
    })
}