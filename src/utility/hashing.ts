import * as CryptoJS from "crypto-js";

// Define types for function parameters
type EncryptedString = string;
type MKey = string;
type MSalt = string;
type UUID = string;
type FnName = string;

const RSAPUBLICKEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSFG4JoAJkyQeDhGgNx+MlFMAAt/jA/c+xzSnfvnk7OHev9GKKkfXUHRnsXdw1aA4L88gnZbVSF/x8Xt2q8FUeK8zpJeLb4pKBZ8YcDRSJckNPd/PcIGGuyD7Qv0PYj18Amg21rTFR6Ox+7uTDUWIkMF48QIcujXSEuF5ZqrAJfwIDAQAB
-----END PUBLIC KEY-----`;

// Function to get the decrypted string value
const getDecryptedString = (encryptedString: EncryptedString): string => {
    const iv = CryptoJS.enc.Utf8.parse("fedcba9876543210");
    const key = CryptoJS.enc.Utf8.parse("0123456789abcdef");
    const encData = encryptedString;
    const cipher = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encData));

    const decrypt = CryptoJS.AES.decrypt(cipher, key, {
        iv,
        padding: CryptoJS.pad.ZeroPadding,
        mode: CryptoJS.mode.CBC,
    });

    const decryptedData = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

// Function to get the current date in the desired format (DDMMYYYY)
const getCurrentDate = (): string => {
    const date = new Date().getDate() <= 9 ? `0${new Date().getDate()}` : new Date().getDate();
    const month = new Date().getMonth() <= 8 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return `${date}${month}${year}`;
}

// Function to get the hash string
const getHashString = (mkey: MKey, msalt: MSalt, uuid: UUID, fnName: FnName): string => {
    const decryptedKey = getDecryptedString(mkey);
    const date = getCurrentDate();
    const decryptedSalt = getDecryptedString(msalt);
    const formula = `${decryptedKey}|${date}|${uuid}|${fnName}|${decryptedSalt}`;

    const hash = CryptoJS.MD5(formula).toString();
    return hash;
}

export { getHashString, RSAPUBLICKEY };
