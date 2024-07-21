const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type : String,
        require : [true,"Task Title is missing"]
    },
    description : {
        type : String,
        require : [true,'Discription is missing']
    },
    status : {
        type : String,
        enum : ["To do", "In Progress", "Done"],
        default : "To do"
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        require : [true, "Date is missing"]
    },
    createdBy : {
        type : String,
        require : true
    }

},{versionKey : false});

module.exports = mongoose.model('Task',taskSchema);