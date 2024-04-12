import CryptoJS from 'crypto-js'
//AES　密钥
const AesKey: string = 'aSKqwWTrnlOfQsv0'
/**
 * AES 加解密算法
 */
export default class Aes {
  public encrypt (arg): any {
    debugger
    let key = CryptoJS.enc.Utf8.parse(AesKey)
    let word = CryptoJS.enc.Utf8.parse(arg)
    let encrypt = CryptoJS.AES.encrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypt.toString()
  }

  /**
   * Author shaoyang
   * Create-time 2020-05-27
   * AES 解密 ：字符串 key iv  返回base64
   */
  public decrypt (arg): any {
    let key = CryptoJS.enc.Utf8.parse(AesKey)
    let decrypt = CryptoJS.AES.decrypt(arg, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt)
  }
}
export const AES = new Aes()
