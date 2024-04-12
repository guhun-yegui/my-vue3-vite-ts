import { ElMessage } from 'element-plus'
import store from '@/store'
import Vue from 'vue'
import { useRouter } from 'vue-router'
import EnclosureHttp from './EnclosureHttp'

export { LoginUrl } from './model/oauth'
export { MenuUrl } from './model/menu'
export { CorssUrl } from './model/corss'

// http实例
export const httpRequest = new EnclosureHttp()

// 通用http方法
export const requestMethod = (method: 'post' | 'get', url: string, params: any) => {
  return new Promise((resolve) => {
    httpRequest[method](url, params, (result) => {
      // 校验接口返回状态码

      if (httpCodeProcess(result)) {
        resolve(result.data)
      }
    })
  })
}

/**
 * 接口状态码验证
 * @param result 接口响应数据
 * @returns {boolean}
 */
export const httpCodeProcess = (result) => {
  const router = useRouter()
  if (result) {
    let status = result.status === undefined ? result.code : result.status
    switch (status) {
      case 401:
        store.dispatch('sign_in', {
          userInfo: {},
          token: null,
        })
        router.push('/')
        ElMessage.error(result.msg || '出错啦！')

        return false
      case 0:
        return true
      case 1:
        store.dispatch('sign_in', {
          userInfo: {},
          token: null,
        })
        router.push('/')
        ElMessage.error(result.msg || '出错啦！')
        return false
      case 500:
        ElMessage.error(result.msg || '出错啦！')
        return false
      case 400:
        // store.dispatch('LogOut')
        ElMessage.error(result.msg || '出错啦！')
        return false
      default:
        ElMessage.error(result.msg || '出错啦！')
        return false
    }
  } else {
    ElMessage.error(result.msg || '出错啦！')
    return false
  }
}
