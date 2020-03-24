import {isDate, isPlainObject} from './util'
// 对于一些字符，我们是允许出现在url中的，不希望被encode
function encode (val: string): string {
    return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL (url:string, param?: any) {
    if(!param) {
        return url
    }
    const parts: string[] = []
    // Object.keys()方法会返回一个由一个给定对象的自身可枚举属性组成的数组
    //param为属性名，param[key] 为属性值
    Object.keys(param).forEach((key)=>{
        let val = param[key]
        if(val === null || typeof val === 'undefined'){
            return
        }
        let values: string[]
        //数组将在key后面添加[]
        if(Array.isArray(val)) {
            values = val
            key+=[]
        }else {
            values = [val]
        }
        values.forEach((val) => {
            if (isDate(val)) {
                val = val.toISOString()
            }else if (isPlainObject(val)) {
                //把对象变成字符
                val = JSON.stringify(val)
            }
            parts.push(`${encode(key)}=${encode(val)}`)
        })
    })
    let serializedParams = parts.join('&')
    if (serializedParams) {
        const markIndex = url.indexOf('#')
        if(markIndex !== -1) {
            url = url.slice(0,markIndex)
        }
        url += (url.indexOf('?') === -1 ?'?':'&') + serializedParams
    }
    return url
}