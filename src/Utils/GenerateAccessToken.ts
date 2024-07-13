import jwt from 'jsonwebtoken'

interface ISignatureData {
    password?: string,
    email: string
}
export const GenerateAccessToken = async(sign_data: ISignatureData) => {
    return new Promise((resolve, reject) => {
        jwt.sign(sign_data, process.env.JWT_SIGNATURE_PRIVATE_TOKEN as string, {expiresIn: "2h"}, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    })
}

export const GenerateRefreshToken = async(sign_data: ISignatureData) => {
    return new Promise((resolve, reject) => {
        jwt.sign(sign_data, process.env.JWT_SIGNATURE_REFRESH as string, {expiresIn: "21d"}, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    })
}