import { UserRepository } from "../data/repositories/userRepository";

const userRepo = new UserRepository();

export const MyProfile = (req, res) => {
    res.status(200).json(userRepo.findOne(u => u.username === req.user.username))
}