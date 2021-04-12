const express = require('express');
const path = require("path");
const port = 3000;
const mongoose = require("mongoose");
let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const app = express();
let store = new MongoDBStore({
    uri : 'mongodb+srv://admin:admin@cluster0.p5ug5.mongodb.net/project1',
    collection : 'mySessions'  
})
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : false,
    store
}))
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(require("./routes/register.routes"));
app.use(require("./routes/login.routes"));
app.use(require("./routes/home.routes"));
app.use(express.static(path.join(__dirname , 'public')));
mongoose.connect('mongodb+srv://admin:admin@cluster0.p5ug5.mongodb.net/project1' , {useNewUrlParser : true , useUnifiedTopology : true}).then(() => {
    console.log("Connected!");
}).catch(() => {
    console.log("failed to connect to mongo database");
});
app.listen(process.env.PORT || port, () => {
    console.log('App listening on port 3000!');
});