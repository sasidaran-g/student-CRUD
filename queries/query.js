exports.getAllData = "SELECT * FROM `angular_std`";
exports.insertData = "INSERT INTO angular_std(name,age,gender,course,hobbies) values (?,?,?,?,?);";
exports.editData= "SELECT * FROM `angular_std` WHERE id =?";
exports.updateData = "UPDATE `angular_std` SET name =?,age =?,gender =?,course =?,hobbies =? WHERE id =?";
exports.deleteData="DELETE FROM `angular_std` WHERE id =?";