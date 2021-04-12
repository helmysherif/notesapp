const app = require('express').Router();
const loginController = require("../controllers/login.controller");
app.get('/login', loginController.loginForm);
app.post('/handleSignin', loginController.handleLogin);
module.exports = app;