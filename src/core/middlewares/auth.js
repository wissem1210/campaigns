
import { jwt_secret } from 'babel-dotenv';
import jwt from 'jsonwebtoken';


export const AuthGuard = (req, res, next) => {

    const token = req.headers['authorization'].split(" ")[1];
    if (token) {
        jwt.verify(token, jwt_secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}