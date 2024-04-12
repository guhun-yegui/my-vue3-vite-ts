export namespace Login{
  export interface loginForm{
    // 用户名
    username: string,
    // 密码
    password: string,
    // 输入的验证码
    captcha_code: string,
    // 返回的验证码
    code_key: string,
    // 验证码字符串
    code: string,
  }
}