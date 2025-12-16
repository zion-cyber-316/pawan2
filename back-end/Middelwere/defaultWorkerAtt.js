// const Worker = require("../models/Worker");
// const WorkerAttendance = require("../models/WorkerAttandance");



// const defaulWorkerAtt = async(req,res,next)=>{
//     try{
//         const date = new Date().toISOString().split("T")[0];
//         const existingAttandance = await WorkerAttendance.findOne({date});

//         if(!existingAttandance){
//             const workers = await Worker.find({});
//             const attendance = workers.map(work =>
//             ({date, workerId : work._id , project :work.employeeId , status: null}))

//             await WorkerAttendance.insertMany(attendance)
//         }

// next();


//     }catch(error){

// res.status(500).json({success : false ,error :error})
//     }



// }

// module.exports = {defaulWorkerAtt}







const Worker = require("../models/Worker");
const WorkerAttendance = require("../models/WorkerAttandance");

const defaulWorkerAtt = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    // Worker → Employee → Project populate
    const workers = await Worker.find({})
      .populate({
        path: "employeeId",
        populate: { path: "project" }
      });

    for (let w of workers) {

      // Check duplicates
      const exists = await WorkerAttendance.findOne({
        date,
        workerId: w._id
      });

      if (!exists) {

        // Add attendance
        await WorkerAttendance.create({
          date,
          workerId: w._id,

          // ⭐ Project ID
          project: w?.employeeId?.project?._id || null,

          // ⭐ Project Name
          projectName: w?.employeeId?.project?.projectname || null,

          status: "Not Marked",
          overtime: 0
        });
      }
    }

    next();

  } catch (error) {
    console.log("ATTENDANCE ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { defaulWorkerAtt };




