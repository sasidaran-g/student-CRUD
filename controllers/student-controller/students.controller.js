const allQueries = require("../../queries/query");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected successfully!");
});

exports.getStudentData = (req, res) => {
  db.query(allQueries.getAllData, (err, result) => {
    if (err) {
      console.log("error", err);
      send500Error(res, "Error geting data");
    } else {
      console.log("result", result);
      send200AndData(res, result);
    }
  });
};

exports.insertStudent = (req, res) => {
  const studentData = req.body;
  const hobbiesString = studentData.hobbies.join(", ");
  db.query(allQueries.insertData,
    [studentData.stdname,parseInt(studentData.stdage),studentData.gender,studentData.course,hobbiesString],(err, result) => {
      if (err) {
        console.log("error", err);
        console.log("Data====>>", studentData);
        console.log("studentdata==>", studentData.stdage);
        send500Error(res, "Error in posting data");
      } else {
        console.log("result", result);
        send200AndData(res, result);
        console.log("success!!!");
      }
    }
  );
};

exports.editStudent = (req, res) => {
  const getId = req.params.id;
  db.query(allQueries.editData, getId, (err, result) => {
    if (err) {
      console.log("Error==>", err);
    } else {
      console.log("result", result);
      send200AndData(res, result);
      console.log("successsss!!!!!");
    }
  });
};

exports.updateStudent = (req, res) => {
  const updateId = req.params.id;
  const updateData = req.body;
  const hobbiesString = updateData.hobbies.join(", ");
  console.log("update id-->", updateId);
  db.query(allQueries.updateData,
           [updateData.stdname,updateData.stdage,updateData.gender,updateData.course,hobbiesString,updateId],(err, result) => {
      if (err) {
        console.log("error in upadte-->", err);
        send500Error(res, "error in update");
      } else {
        console.log("result===>", result);
        send200AndData(res, result);
      }
    }
  );
};

exports.deleteStudent = (req, res) => {
  const delId = req.params.id;
  console.log("delid", delId);
  db.query(allQueries.deleteData, delId, (err, result) => {
    if (err) {
      console.log("error...", err);
      send500Error(err, "error in delete data");
    } else {
      console.log("result", result);
      send200AndData(res, result);
      console.log("delete success");
    }
  });
};

function send200AndData(res, result) {
  res.status(200).json({ status: "Success", data: result });
  return;
}

function send500Error(res, message) {
   res.status(500).send(message);
  return;
}
