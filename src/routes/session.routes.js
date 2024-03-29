import { Router } from "express";
import userModel from '../models/user.model.js'
import passport from "passport";

const router = Router();

//! passport Github
    router.get("/github",passport.authenticate('github', { scope:['user:email']} ), async(req,res)=>{
        { }
    });


    router.get("/githubcallback", passport.authenticate('github', {
        failureRedirect:  '/github/error'
    }),async(req,res) => {
        const user = req.user;
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        };
        req.session.admin = true;
        res.redirect("/users")
    })




//! passport Local
router.post('/register', passport.authenticate('register', {
    failureRedirect: 'api/session/fail-register'
}), async (req, res) => {
    console.log("Registrando usuario:");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
})


// Login
router.post('/login', passport.authenticate('login',
    {
        failureRedirect: 'api/session/fail-login'
    }
), async (req, res) => {
    console.log("User found to login:");

    const user = req.user;
    console.log(user);

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
})


router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});




export default router;