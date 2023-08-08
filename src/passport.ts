import passport from 'passport'
import * as passportlocal from 'passport-local'
import { User } from './entities/User';
import { Database } from 'sqlite3';
import { Utils } from './utils';
import UserService from './services/UserService';
import UserController from './controllers/UserController';

const localStrategy = passportlocal.Strategy;
const pool = Database;

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // console.log(req.body);
    const { email, telefono, ciudad, provincia } = req.body;
    const newUser = {
        username,
        password,
        email: '',
        telefono: '',
        ciudad: '',
        provincia: ''
    };
    // encripto el password del signup con bcryptjs
    newUser.password = await Utils.encryptPassword(password);

    // con eso ya puedo cargar el user con UserService
    const userService = new UserService();
    
    try {
        await userService.createUser(newUser).then((result) => {
            req.flash()
            req.flash('success', 'Usuario creado con éxito'); //acá va message en vez de flash?
            return done(null, result);
        });

    } catch (error) {
        req.flash(error.toString());
        req.flash('error', error.toString());
        return done(null,null);
    }
}));

passport.serializeUser((user, done) => {

}); 