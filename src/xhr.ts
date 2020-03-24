import {AxiosRequestConfig} from './types'

export default function xhr (config:AxiosRequestConfig) {
    const {data = null, url,method='get'} = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(),url,true) //打开一个网址为url的网站连接，传递方式是GET型
    request.send(data) //发送http请求
}