const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
module.exports.loginForm = (req, res) => {
    if(req.session.isLoggedIn)
    {
        res.redirect("home");
    } else {
        res.render("login" , {exists : req.flash('exists') , incorrect : req.flash('incorrect') , isLoggedIn : false})
    }
}
module.exports.handleLogin = async(req, res) => {
    const {email , password} = req.body;
    let user = await userModel.findOne({email});
    if(user)
    {
        const match = await bcrypt.compare(password , user.password);
        if(match)
        {
            req.session.isLoggedIn = true;
            req.session.userID = user._id;
            res.redirect("/home")
        } else {
            req.flash('incorrect' , true)
            res.redirect("/login")
        }
    } else {
        req.flash('exists' , true);
        res.redirect("/login")
    }
}