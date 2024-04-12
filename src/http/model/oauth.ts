export namespace LoginUrl {
  const baseApi = import.meta.env.VITE_APP_BASE_API
  export const login = `${baseApi}/user/login`
  export const profile = `${baseApi}/user/profile`
  export const getCode = `${baseApi}/Index/getCaptchaCode`
}
