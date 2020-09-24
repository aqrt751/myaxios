import { isPlainObject } from './util'

export function transformRequest (data: any): any {
    if(isPlainObject(data)) {
        console.log(11111)
        return JSON.stringify(data)
    }
    return data
}
