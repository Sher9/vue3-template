
/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data);
    var obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};

export const getObjType = obj => {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
};

/**
 * 判断是否为空
 * @param {*} val 
 * @returns 
 */
export function validatenull(val) {
    if (typeof val == 'boolean') {
        return false;
    }
    if (typeof val == 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
        return false;
    }
    return false;
}

/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
    delete obj1.close;
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    if (!o1 || !o2) { /*  判断不是对象  */
        return obj1 === obj2;
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }

    for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object;
        var t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
            return false;
        }
    }
    return true;
}


/**
 * 判断对象某个属性是否为true
 * @param {*} obj 
 * @param {*} key 
 * @returns 
 */
export const vaildData = (obj, key) => {
    //先判断是否存在
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key]
    } else {
        return false
    }
}

/**
 * tree数据s数组转化成一维数组
 * @param {*} tree 
 * @param {*} result 
 * @returns 
 */
export const treeToArray = (treeData) => {
    const result = [];
    const flatten = (node) => {
        result.push(node);
        if (node.children) {
            for (const child of node.children) {
                flatten(child);
            }
        }
    }
    for (const node of treeData) {
        flatten(node);
    }
    return result;
}


/**
 * 数组转化测tree结构
 * @param {*} list 
 * @param {*} pid 
 * @returns 
 */
export const arrayToTree = (list, pid = "") => {
    let obj = {};
    list.forEach((item) => {
        item.children = [];
        obj[item.id] = item;
    });
    return list.filter((item) => {
        if (item.pid !== pid) {
            obj[item.pid].children.push(item);
            return false;
        }
        return true;
    });
}
/**
 * 关键字查询列表
 * @param {*} list 
 * @param {*} keyWord 
 * @returns 
 */
export const getArrayByName = (list, keyWord) => {
    let reg = new RegExp(keyWord);
    let result = [];
    for (let key in list) {
        //根据数据格式更改自己的循环格式
        if (reg.test(list[key].data.name)) {
            result.push(list[key]);
        }
    }
    return result;
}