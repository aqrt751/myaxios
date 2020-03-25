import {AxiosRequestConfig, AxiosResponse, AxiosPromise} from './types'

export default function xhr (config:AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve) =>{
    const {data = null, url,method='get',headers,responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
        request.responseType = responseType
    }
    request.open(method.toUpperCase(),url,true) //打开一个网址为url的网站连接，传递方式是GET型
    // 每当 readyState 属性改变时，就会调用该函数
    //request.readyState=4表示请求已完成，且响应已就绪
    request.onreadystatechange = function handleLoad() {
        if(request.readyState !== 4) {
            return
        }

        const responseHeaders = request.getAllResponseHeaders() //返回所有响应头
        const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        resolve(response)
    }

    Object.keys(headers).forEach((name) => {
        if (data ===null && name.toUpperCase() === 'content-type') {
            delete headers[name]
        }else {
            request.setRequestHeader(name,headers[name])
        }
    })
    request.send(data) //发送http请求
    })
}