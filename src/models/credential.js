const { Sequelize, DataTypes, Model } = require("sequelize");
const crypto = require("crypto");

const ENCRYPTION_KEY = Buffer.from("abcdefghijklmnopqrstuvwxyandres9", "utf8");
const IV_LENGTH = 16;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

class Credential extends Model {
    setPassword(value) {
        this.password = encrypt(value);
    }

    getPassword() {
        return decrypt(this.password);
    }
}

function initCredential(sequelize) {
    Credential.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            rut: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bank: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
        },
        {
            tableName: "credentials",
            sequelize: sequelize,
        }
    );
}

module.exports = {
    Credential,
    initCredential,
};
