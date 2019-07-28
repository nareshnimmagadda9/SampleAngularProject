import { Injectable } from '@angular/core';
declare var CryptoJS : any;
declare var $ : any;

export class PasswordService{

    constructor(){
    }

    toDecrypt(planetext) {
        try {
            //Creating the Vector Key
            var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
            //Encoding the Password in from UTF8 to byte array
            var Pass = CryptoJS.enc.Utf8.parse('ps@123');
            //Encoding the Salt in from UTF8 to byte array
            var Salt = CryptoJS.enc.Utf8.parse("insight123resultxyz");
            //Creating the key in PBKDF2 format to be used during the decryption
            var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
            //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(planetext)
            });
    
            //Decrypting the string contained in cipherParams using the PBKDF2 key
            var decrypted = CryptoJS.AES.decrypt(cipherParams, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
        //Malformed UTF Data due to incorrect password
        catch (err) {
            return "";
        }
    }

}