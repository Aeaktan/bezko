const config = require("../data_access/db-config");
const queries = require("./sql-queries");
const sql = require("mssql");
const { isValidName, isValidGrade } = require("./validation");

sql.on("error", (err) => { // Handle SQL errors
  console.error(err);
});

//get all students
async function getAll() {
  try {
    const connction = await sql.connect(config);

    const response = await connction
      .request()
      .query(queries.students.getAll)
      .then((response) => response?.recordsets);

    sql.close();

    return response;
  } catch (error) {
    console.error(error);
    sql.close();
    throw new Error(error);
  }
}

//get student by id
async function getById(id) {
  try {
    const connction = await sql.connect(config);

    const response = await connction
      .request()
      .input("student_id", sql.Int, id)
      .query(queries.students.getById)
      .then((response) => {
        const records = response?.recordsets; // Get the recordsets
        if (records?.length !== 1) {
          throw new Error(`Student with given Id=${id} not exists`);
        }
        return records[0];
      });

    sql.close();

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    sql.close();
    throw new Error(error);
  }
}

//post new student into table
async function addStudent(student) {
  try {
    const { id, name, math, history, wf } = student;
    const connection = await sql.connect(config); // Connect to the SQL server

    if (!isValidName(name)) {
      throw new Error(
        "Invalid name format. Name should start with a capital letter and contain only lowercase Latin letters."
      );
    }

    if (!isValidGrade(math) || !isValidGrade(history) || !isValidGrade(wf)) {
      throw new Error(
        "Invalid grade format. Grades should be between 1 and 6."
      );
    }

    const response = await connection
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar(50), name)
      .input("math", sql.Int, math)
      .input("history", sql.Int, history)
      .input("wf", sql.Int, wf)
      .query(queries.students.addStudent);

    sql.close();

    const responseBody = {
      message: "Student added successfully.",
      student,
    };

    console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error(error);
    sql.close();
    throw new Error(error);
  }
}

//update students math grades
async function updateMathGrade(student) {
  try {
    const { id, math } = student;
    const connection = await sql.connect(config);

    if (!isValidGrade(math)) {
      throw new Error(
        "Invalid grade format. Grades should be between 1 and 6."
      );
    }

    const response = await connection
      .request()
      .input("id", sql.Int, id)
      .input("math", sql.Int, math)
      .query(queries.students.updateMathGrade);

    const updatedMathGrade = response.recordset[0];

    sql.close();

    const responseBody = {
      message: "Math grade updated.",
      mathGrade: updatedMathGrade,
    };

    console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error(error);
    sql.close();
    throw new Error(error);
  }
}

//update students history grades
async function updateHistoryGrade(student) {
  try {
    const { id, history } = student;
    const connection = await sql.connect(config);

    if (!isValidGrade(history)) {
      throw new Error(
        "Invalid grade format. Grades should be between 1 and 6."
      );
    }

    const response = await connection
      .request()
      .input("id", sql.Int, id)
      .input("history", sql.Int, history)
      .query(queries.students.updateHistoryGrade);

    const updatedHistoryGrade = response.recordset[0];

    sql.close();

    const responseBody = {
      message: "History grade updated.",
      historyGrade: updatedHistoryGrade,
    };

    console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error(error);
    sql.close();
    throw new Error(error);
  }
}

//update students WF grades
async function updateWFGrade(student) {
  try {
    const { id, wf } = student;
    const connection = await sql.connect(config);

    if (!isValidGrade(wf)) {
      throw new Error(
        "Invalid grade format. Grades should be between 1 and 6."
      );
    }

    const response = await connection
      .request()
      .input("id", sql.Int, id)
      .input("wf", sql.Int, wf)
      .query(queries.students.updateWFGrade);

    const updatedWFGrade = response.recordset[0];

    sql.close();

    const responseBody = {
      message: "Wf grade updated.",
      wfGrade: updatedWFGrade,
    };

    console.log(responseBody);
    return responseBody;
  } catch (error) {
    console.error(error);
    sql.close();
    throw new Error(error);
  }
}

//delete student by id
async function deleteById(id) {
  try {
    const connection = await sql.connect(config);

    const response = await connection
      .request()
      .input("student_id", sql.Int, id)
      .query(queries.students.deleteById);

    const rowsAffected = response?.rowsAffected[0]; // Get the number of affected rows
    if (rowsAffected === 0) {
      throw new Error(`Student with given Id=${id} does not exist`);
    }

    sql.close();

    console.log(`Student with Id=${id} has been deleted.`);
    return `Student with Id=${id} has been deleted.`; // tutaj nie wiem co ma zwracac backend
  } catch (error) {
    console.error(error);
    sql.close();
    throw new Error(error);
  }
}

module.exports = {
  getAll: getAll,
  getById: getById,
  addStudent: addStudent,
  updateMathGrade: updateMathGrade,
  updateHistoryGrade: updateHistoryGrade,
  updateWFGrade: updateWFGrade,
  deleteById: deleteById,
};
