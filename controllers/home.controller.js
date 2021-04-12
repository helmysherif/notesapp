const noteModel = require("../models/notes.model")
module.exports.getAllNotes = async(req, res) => {
    let notes = await noteModel.find({userID : req.session.userID});
    res.render("index" , {isLoggedIn : req.session.isLoggedIn , notes }); 
}
module.exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
}
module.exports.addNote = async(req, res) => {
    const {title , desc} = req.body;
    await noteModel.insertMany({userID:req.session.userID , title , desc});
    res.redirect("/home");
}
module.exports.deleteNote = async(req, res) => {
    await noteModel.findByIdAndDelete({_id : req.body.delete})
    res.redirect("/home");
}
module.exports.updateNote = async(req, res) => {
    const {_id,title,desc} = req.body;
    await noteModel.findByIdAndUpdate({_id} , {title,desc});
    res.redirect("/home");
}