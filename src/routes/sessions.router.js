import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../dao/models/user.model.js';
import { UserDTO } from '../dto/user.dto.js';
import { UserRepository } from '../dao/repositories/user.repository.js';
import config from '../config/config.js'; 

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        const user = new User({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        });
        
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { sub: user._id },
            config.jwtSecret,
            { expiresIn: config.jwt.expiration }
        );
        res.cookie('jwt', token, config.jwt.cookieOptions);
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const userRepository = new UserRepository();

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json(userDTO);
});

export default router;