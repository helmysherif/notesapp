const app = require('express').Router();
const validation = require("../validator/register.validation");
const registerController = require("../controllers/register.controller")
app.get('/', registerController.registerForm);
app.post('/handleSignUp', validation , registerController.handleRegister);
module.exports = app;