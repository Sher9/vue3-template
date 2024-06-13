/**
 * 字典翻译
 */
export function getDictValue(val, dictArr) {
    if (val != "") {
        const dictObj = dictArr.find((item) => item.name == val || item.value == val || item.dictKey == val)
        if (dictObj) {
            return dictObj.label || dictObj.dictValue
        }
        return "";
    }
}