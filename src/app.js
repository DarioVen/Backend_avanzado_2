import express from 'express';
import { initMongoDB } from './config/mongodb.config.js';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import passport from './config/passport.config.js';
import sessionsRouter from './routes/sessions.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Handlebars setup
app.engine('handlebars', engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

initMongoDB().then(() => {
    console.log('Conectado a MongoDB');
}).catch((error) => {
    console.log(error);
    throw 'Error al conectar a la base de datos';
});

// Routes
app.use('/api/sessions', sessionsRouter);

// View routes
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.render('profile');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});