import { jwt_secret } from 'babel-dotenv';
import { UserRepository } from '../data/repositories/userRepository';
const jwt = require('jsonwebtoken')

const userRepo = new UserRepository();

export const login = (req, res) =>{
    const { username, password } = req.body;
    const user = userRepo.findOne(user => user.username === username && user.password === password)
    jwt.sign(user, jwt_secret, { algorithm: 'HS256' }, (err, token) => {
        if (token) {
            res.status(200).json({
                access_token: token
            })
        } else {
            res.status(404).json({
                message: 'User Not found',
                error: err
            })
        }
    })
}