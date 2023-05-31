import { Sequelize, DataTypes, Model } from "sequelize";
import crypto from "crypto";

const ENCRYPTION_KEY = Buffer.from("abcdefghijklmnopqrstuvwxyandres9", "utf8"); // Deberías guardar esta clave en un lugar seguro y privado
const IV_LENGTH = 16; // Para AES, esto siempre es 16

function encrypt(text: string): string {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text: string): string {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift()!, "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

export class Credential extends Model {
    public id!: number;
    public rut!: string;
    public password!: string;
    public bank!: string;

    public setPassword(value: string): void {
        this.password = encrypt(value);
    }

    public getPassword(): string {
        return decrypt(this.password);
    }
}

export function initCredential(sequelize: Sequelize) {
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
