import User from '../models/user.model.js';

export class UserRepository {
    async findById(id) {
        return await User.findById(id);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }
}