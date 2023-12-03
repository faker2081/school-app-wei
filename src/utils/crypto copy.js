import CryptoJS from 'crypto-js';
const key = 'jkr!#$&*(!FCloud'; //密钥
const iv = 'jkr!#$&*(!FCloud'; //密钥
//加密
export const getAES = (data) => {
  let encrypted = getAesString(data, key, iv); //密文
  return encrypted;
}
//解密
export const getDAes = (data) => {
  let decryptedStr = getDAesString(data, key, iv);
  return decryptedStr;
}

function getAesString(data, aesKey, aesIv) { //加密
  let key = CryptoJS.enc.Utf8.parse(aesKey);
  let iv = CryptoJS.enc.Utf8.parse(aesIv);
  let encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding
  });
  return encrypted.toString(); //返回的是base64格式的密文
}

function getDAesString(encrypted, daesKey, daesIv) { //解密
  let key = CryptoJS.enc.Utf8.parse(daesKey);
  let iv = CryptoJS.enc.Utf8.parse(daesIv);
  let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}


/**
 * 生成指定长度的随机字符串
 * @param {Number} length 随机字符串的长度，默认为 16
 * @return {String} 生成的随机字符串
 */
export function generateNonceStr(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos = chars.length;
  let nonceStr = '';
  for (let i = 0; i < length; i++) {
    nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return nonceStr;
}
