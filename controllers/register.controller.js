const { validationResult } = require("express-validator");
const validation = require("../validator/register.validation");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
module.exports.registerForm = (req, res) => {
    if(req.session.isLoggedIn)
    {
        res.redirect("home");
    } else {
        res.render("register" , {errors : req.flash('errors') , oldInputs : req.flash('oldInput') , exists : req.flash('exists') , isLoggedIn : false})
    }
}
module.exports.handleRegister = async(req, res) => {
    const {name , email , password} = req.body;
    let errors = validationResult(req);
    if(errors.isEmpty())
    {
        let user = await userModel.findOne({email});
        if(user)
        {
            req.flash('exists' , true);
            res.redirect("/");
        } else {
            bcrypt.hash(password , 7 , async (err,hashedPassword) => {
                await userModel.insertMany({name , email , password:hashedPassword})
                res.redirect("/login");
            })
        }
    } else {
        req.flash('errors',errors.array());
        req.flash('oldInput' , {name , email , password});
        res.redirect('/');
    }
}