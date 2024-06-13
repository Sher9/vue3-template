

import { sm2 } from "sm-crypto"

const cipherMode = 0 // 选择加密策略，1 - C1C3C2，0 - C1C2C3，默认为1
const privateKey = '' // 私钥

/**
 * SM2加密string数据
 * @param {string} data 原始数据
 * @returns {string} 加密后数据
 */
export function getSm2DataHexByString(data) {
    if (data && (typeof data === 'string') && data.constructor === String) {
        return '04' + sm2.doEncrypt(data, PUBLICKEY, cipherMode)
    }
    return null
}

/**
 * SM2加密object数据
 * @param {Object} data 原始数据
 * @returns {string} 加密后数据
 */
export function getSm2DataHexByObject(data) {
    if (data) {
        return '04' + sm2.doEncrypt(JSON.stringify(data), PUBLICKEY, cipherMode)
    }
    return null
}

/**
 * SM2解密数据
 * @param {string} dataHex 原始加密数据
 * @returns {string} 解密后数据
 */
export function getSm2DataByString(dataHex) {
    if (dataHex && (typeof dataHex === 'string') && dataHex.constructor === String) {
        dataHex = dataHex.substring(2).toLocaleLowerCase()
        return sm2.doDecrypt(dataHex, privateKey, cipherMode)
    }
}