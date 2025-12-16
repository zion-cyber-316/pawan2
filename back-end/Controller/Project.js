
// //// add Project 

const Project = require("../models/Projects");

const addProject = async(req,res)=>{
   try{
     const{projectname,description} =req.body;
const newProject = new Project({
    projectname,
    description
})
await newProject.save();
return res.status(200).json({success :true , Project :newProject})
   }catch(err){
   return  res.status(500).json({success :false ,error : " add Project server eror"})
   }



}

// get projects 

const getProjects = async(req,res)=>{

     try{
      const Projects = await Project.find();
     return res.status(200).json({success:true,Projects})
   }catch(error){
     return  res.status(500).json({success :false ,error : " get department server eror"})
    }
    
}



// //// edit department 

const geteditProject = async(req,res)=>{
   try{
      const {id} = req.params;
      const editProject = await Project.findById({_id : id})
       return res.status(200).json({success:true,editProject})
   }catch(error){
     return  res.status(500).json({success :false ,error : " get department server eror"})
   }
}


// edit projects 

const EditProjects = async(req,res)=>{
   try{
      const {id} = req.params;
       const{projectname,description} =req.body;
       const updProject = await Project.findByIdAndUpdate({_id:id},{projectname,description})
     
       return res.status(200).json({success:true,updProject})
   }catch(error){
     return  res.status(500).json({success :false ,error : " edit Project server eror"})
   }
}








module.exports = {getProjects,addProject,geteditProject,EditProjects}

































// const Project = require("../models/Projects.js")












// const EditDepartment = async(req,res)=>{
//    try{
//       const {id} = req.params;
//        const{dep_name,description} =req.body;
//        const upddepartment = await Deparment.findByIdAndUpdate({_id:id},{dep_name,description})
     
//        return res.status(200).json({success:true,upddepartment})
//    }catch(error){
//      return  res.status(500).json({success :false ,error : " edit department server eror"})
//    }
// }

// //// delete department 
// const deleteDepartment = async(req,res)=>{
//    try{
//       const {id} = req.params;
//       const Deletedepartment = await Deparment.findByIdAndDelete({_id : id})
//        return res.status(200).json({success:true,Deletedepartment})
//    }catch(error){
//      return  res.status(500).json({success :false ,error : " Delete department server eror"})
//    }
// }



// module.exports = {
//    addProject,getProjects
// }