import { AES, enc } from 'crypto-js';
const secretKey = 'AXDRNHDYIOPXMN';

export const encryptData = (param = null) => {
    const cipherText = AES.encrypt(param, secretKey);
    return cipherText.toString();
 };

export const decryptData = (param = null) => {
    return AES.decrypt(param, secretKey).toString(enc.Utf8);
};