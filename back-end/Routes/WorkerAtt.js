const { getAttandance, updateAttendance, Otupdate, getworker, attendanceReport, monthlyAttendanceSummary, getAdminAtt } = require("../Controller/WorkerAtt");
const { defaulWorkerAtt } = require("../Middelwere/defaultWorkerAtt");

const router = require("express").Router()

router.get("/get",defaulWorkerAtt,getAttandance)
router.put("/update/:id",updateAttendance)
router.put("/updateOT/:id",Otupdate)
router.get("/getworker",getworker)
router.get("/attendanceReport",attendanceReport)
router.get("/monthly-summary",monthlyAttendanceSummary)
router.get("/attendanceReport",getAdminAtt)


module.exports = router;