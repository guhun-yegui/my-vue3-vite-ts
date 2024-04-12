import { ref } from 'vue'

export const validatePassword = () => {
  return (rule:any, value:any, callback:any) => {
    if (value.length < 6) {
      callback(new Error("密码不能少于6位"));
    } else {
      callback();
    }
  };
};

export const validateCode = () => {
  return (rule:any, value:any, callback:any) => {
    if (value.length < 4) {
      callback(new Error("验证码不能少于4位"));
    } else {
      callback();
    }
  };
};

// 验证规则
export const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword(),
    },
  ],
  captcha_code: [
    {
      required: true,
      trigger: 'blur',
      validator: validateCode(),
    },
  ],
})