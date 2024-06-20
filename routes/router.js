var express = require("express");
var router = express.Router();
const errorHandler = require("../handler/error-handler/error.handler");
const {
  getStudentData,
  insertStudent,
  editStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/student-controller/students.controller");

router.get("/getStudentData", errorHandler(getStudentData));

router.post("/insertStudent", errorHandler(insertStudent));

router.get("/getEditStudent/:id", errorHandler(editStudent));

router.put("/updateStudent/:id", errorHandler(updateStudent));

router.delete("/deleteStudent/:id", errorHandler(deleteStudent));

module.exports = router;
