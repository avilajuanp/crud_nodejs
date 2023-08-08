import { Router, request, response } from "express";
import passport from "passport";

const routerAuth = Router();

routerAuth.get("/signup", (request, response) => {
    response.render("auth/signup");
});
/*
routerAuth.post("/signup", (request, response) => {
    //  console.log(request.body)
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });

    response.send('recibido');
});
*/
//opcion a lo de arriba
routerAuth.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));
    

routerAuth.get('/profile', (request, response) => {
    response.send('bienvenido a tu perfil.')
});

export { routerAuth };