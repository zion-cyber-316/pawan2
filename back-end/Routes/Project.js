const { getProjects, addProject, geteditProject, EditProjects } = require("../Controller/Project");


const router = require("express").Router()

router.post("/add",addProject)
router.get("/get",getProjects)
router.get("/get/:id",geteditProject)
router.put("/edit/:id",EditProjects)




module.exports = router;