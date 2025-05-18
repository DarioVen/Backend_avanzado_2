import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '../dao/models/user.model.js';
import config from './config.js';

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.jwtSecret,
    expiresIn: config.jwtExpiration
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.sub);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
}));

export default passport;