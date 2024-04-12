import { httpCodeProcess } from '@/http/httpUtils'
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import qs from 'qs'
import { RSA } from '../utils/Rsa'
import { AES } from '../utils/Aes'
import { errorCodeMap, httpCodeMap } from './model/errorCode'
import store from '@/store'

// 请求返回借口基本类型，可根据实际情况更改
interface result {
  code?: string | number
  data?: any
  message?: string
}

// 回调函数基本类型
interface callback {
  (result: result): void
}

const isDev = import.meta.env.NODE_ENV === 'development',
  httpTimeOut = isDev ? 15000 : 15000

/**
 * Http公共类
 */
export default class EnclosureHttp {
  /***
   * 构造函数
   * 定义拦截请求方法
   * 定义拦截请求响应
   */
  constructor() {
    // this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  /**
   * @description 拦截请求
   * @returns void 0
   */
  // private httpInterceptorsRequest(res): void {}

  /**
   * @description 拦截响应
   * @returns void 0
   */
  private httpInterceptorsResponse(): void {
    axios.interceptors.response.use(
      response => {

        // if (httpCodeProcess(response.data)) {
          return response
        // }
      },
      err => {
        if (err?.response) {
          const response = err.response
          const errCode = response.error_description
          const httpCode = response.status
          if (errCode) {
            const errorMsg = errorCodeMap.find(item => item.code === errCode)
            ElMessage.warning(errorMsg?.msg || '系统异常，请稍后再试')
          } else {
            const httpMsg = httpCodeMap.find(item => item.code === httpCode)
            ElMessage.warning(httpMsg?.msg || '网络异常，请稍后再试')
          }
        } else {
          return Promise.reject(err)
        }
      }
    )
  }

  /**
   * 处理 AxiosRequestConfig
   * @param method
   * @param url
   * @param headers
   * @param params
   * @param body
   * @param encrypt
   * @param responseType
   * @returns
   */
  public axiosConfig(method: any, url: string, headers: any, params: any, body: any, encrypt: boolean, auth?: any, responseType?: any): AxiosRequestConfig {
    let config: AxiosRequestConfig = {
      url: url,
      method: method,
      headers: headers,
      timeout: httpTimeOut
    }
    if (auth) {
      config.auth = auth
    }
    if (params) {
      const paramsObj = encrypt ? RSA.encryptData(qs.stringify(params)) : params
      config.params = paramsObj
    }
    if (body) {
      const bodyObj = encrypt ? RSA.encryptData(qs.stringify(body)) : body
      config.data = bodyObj
    }
    if (responseType) {
      config.responseType = responseType
    }
    return config
  }
  /**
   * axios request
   * @param axiosCofig
   * @param encrypt
   * @param successCallback
   * @param errorCallback
   */
  public request(axiosConfig: AxiosRequestConfig, encrypt: boolean, successCallback: callback, errorCallback?: callback | undefined): any {
    store.dispatch('menus/setLoading', true)
    axios(axiosConfig)
      .then((response: any) => {
        if (encrypt) {
          // AES 解密返回 数据
          // let messVal = response.data.replace(/[\r\n]/g, '')
          let data = AES.decrypt(response.data)
          let jsonDate = JSON.parse(data)
          successCallback(jsonDate)
        } else {
          successCallback(response.data)
        }
        store.dispatch('menus/setLoading', false)
      })
      .catch((error: any) => {
        errorCallback === undefined ? console.error(error) : errorCallback(error)
        store.dispatch('menus/setLoading', false)
      })
  }

  /**
   * HttpGet 请求接口
   * @param url
   * @param param
   * @param successCallback
   */
  public get(url: string, params: any, successCallback: callback, errorCallback?: callback | undefined): any {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: store.getters['userInfo/token'],
      token: store.getters['userInfo/token'],
    }
    const config = this.axiosConfig('get', url, headers, params, null, false)
    this.request(config, false, successCallback, errorCallback)
  }
  /**
   * HttpPost 请求接口
   * @param url
   * @param body
   * @param successCallback
   */
  public post(url: string, body: any, successCallback: callback, errorCallback?: callback | undefined): any {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: store.getters['userInfo/token'],
      token: store.getters['userInfo/token']
    }
    const config = this.axiosConfig('post', url, headers, null, body, false)
    this.request(config, false, successCallback, errorCallback)
  }
  /**
   * HttpGet 加密请求接口
   * @param url
   * @param param
   * @param successCallback
   */
  public encryptGet(url: string, params: any, successCallback: callback, errorCallback?: callback | undefined): any {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: store.getters['userInfo/token']
    }
    const config = this.axiosConfig('get', url, headers, params, null, true)
    this.request(config, true, successCallback, errorCallback)
  }

  /**
   * HttpPost 加密请求接口
   * @param url
   * @param body
   * @param successCallback
   */
  public encryptPost(url: string, body: any, successCallback: callback, errorCallback?: callback | undefined): any {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: store.getters['userInfo/token']
    }
    const config = this.axiosConfig('post', url, headers, null, body, true)
    this.request(config, true, successCallback, errorCallback)
  }

  /**
   * HttpGet restful 风格请求接口
   * @param url
   * @param id
   * @param successCallback
   */
  public restfulGet(url: string, id: string, successCallback: callback, errorCallback?: callback | undefined): any {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: store.getters['userInfo/token']
    }
    const config = this.axiosConfig('get', `${url}/${id}`, headers, null, null, false)
    this.request(config, false, successCallback, errorCallback)
  }

  /**
   * HttpPost restful 风格请求接口
   * @param url
   * @param body
   * @param successCallback
   */
  public restfulPost(url: string, id: string, successCallback: callback, errorCallback?: callback | undefined): any {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: store.getters['userInfo/token']
    }
    const config = this.axiosConfig('post', `${url}/${id}`, headers, null, null, false)
    this.request(config, false, successCallback, errorCallback)
  }

  /**
   * 文件下载
   * @param method
   * @param url
   * @param body
   * @param successCallback
   */
  public downloadFile(method: any, url: string, body: any, successCallback: callback, errorCallback?: callback | undefined): any {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: store.getters['userInfo/token']
    }
    const config = this.axiosConfig(method, url, headers, null, body, false, null, 'blob')
    this.request(config, false, successCallback, errorCallback)
  }

  /**
   * 登录的请求头需要特殊处理
   * @param url
   * @param body
   * @param successCallback
   */
  public authPost(url: string, body: any, successCallback: callback, errorCallback?: callback | undefined): void {
    const { password, safeCode, username, verCode } = body
    const headers = {
      'X-IMAGE-CODE-TOKEN': safeCode,
      'IMAGE-CODE': verCode,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const auth = {
      username: '9rNuixjxKo1YIChl',
      password: 'X0wZ7BTpcDKH42je'
    }
    const params = qs.stringify({
      password,
      email: username,
      grant_type: 'crm_email',
      tenant: '1'
    })
    const config = this.axiosConfig('post', url, headers, null, RSA.encryptData(params), false, auth)
    this.request(config, false, successCallback, errorCallback)
  }
}
