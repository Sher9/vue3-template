import request from '@/util/request'

export const getIndexData = (current, size, params) => {
    return request({
        url: '/moduleConfig/getIndexmoduleData',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}