import { ref, computed, toRef } from 'vue'
import { getCode } from '@/api/api.ts'
import { Login } from '@/interface/login.ts'
import { requestMethod,LoginUrl } from '@/http/httpUtils'

export const getCodeImg = (loginForm: Login.loginForm) => {
  const params = { time: new Date() }
  requestMethod('post',LoginUrl.getCode,params)
    .then((data: any) => {
      loginForm.code_key = data.code_key
      loginForm.code = data.code
    })
    .catch(() => {})
}
export const usePassword = () => {
  const passwordType = ref('password')
  const onChangePwdType = () => {
    if (passwordType.value === 'password') {
      passwordType.value = 'text'
    } else {
      passwordType.value = 'password'
    }
  }
  return {
    passwordType: toRef(passwordType),
    onChangePwdType,
  }
}
