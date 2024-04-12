import { JSEncrypt } from 'encryptlong'

/**
 * Rsa 加密算法
 */
export default class Rsa {
  public encryptData(_string: string): any {
    const encrypt = new JSEncrypt()
    const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClplZ+60Y+ZylAn+IpTDvauq3OAJlnQWd+JN6H676+JyjCSnlmqHBqEekXZ2eoC4zVQUXZ83a0MasBLNY9Yrok3fpbDxEJgS6SmYuU5g/NenJQwJqK6rsnxq4k6YKBUBoSE5XGrtFJ9jcnAAHvoYqh+LJRFYtr2C82L0mSXPjrnQIDAQAB'
    encrypt.setPublicKey(publicKey)
    return encrypt.encryptLong(encodeURIComponent(_string))
  }
}
export const RSA = new Rsa()
