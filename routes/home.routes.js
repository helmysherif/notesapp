const app = require('express').Router();
const auth = require("../middleware/auth");
const homeController = require("../controllers/home.controller");
app.get('/home'       , auth , homeController.getAllNotes);
app.get('/logout'     , homeController.logout);
app.post('/addNote'   , homeController.addNote);
app.post('/delete'    , homeController.deleteNote);
app.post('/updateNote', homeController.updateNote);
module.exports = app;