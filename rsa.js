// 简化的RSA加密和解密示例

// 假设的公钥和私钥（在实际应用中，这些应该是大整数且通过复杂的数学过程生成）
const publicKey = { e: 3, n: 55 }; // e是公钥指数，n是模数
const privateKey = { d: 27, n: 55 }; // d是私钥指数，n是模数

// 加密函数
function encrypt(message, pubKey) {
    // 将消息转换为数字（在实际应用中，需要使用更复杂的方法）
    let m = message.charCodeAt(0);
    // 计算 m^e mod n
    let c = Math.pow(m, pubKey.e) % pubKey.n;
    return c;
}

// 解密函数
function decrypt(ciphertext, privKey) {
    // 计算 c^d mod n
    let m = Math.pow(ciphertext, privKey.d) % privKey.n;
    // 将数字转换回字符
    let message = String.fromCharCode(m);
    return message;
}

// 示例消息
const message = 'A'; // 注意：这个示例仅适用于单个字符
console.log(`Original message: ${message}`);

// 加密过程
const encrypted = encrypt(message, publicKey);
console.log(`Encrypted message: ${encrypted}`);

// 解密过程
const decrypted = decrypt(encrypted, privateKey);
console.log(`Decrypted message: ${decrypted}`);
