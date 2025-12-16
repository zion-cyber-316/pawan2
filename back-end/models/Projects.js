const mongoose = require("mongoose");


const ProjectSchema = new mongoose.Schema({
   projectname : {type : String, required : true},
    description : {type : String},
    createAt :{type :Date ,default :Date.now},
    updateAt : {type :Date ,default :Date.now}
});

const Project = mongoose.model("Project",ProjectSchema);

module.exports = Project;