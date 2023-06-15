const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router(); // Define the router object
const port = 3000;

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies 
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(router); // Use the defined router object

const studentRepo = require("./repositories/student.repository");

//get all students
router.route("/students").get((req, res) => {
  studentRepo
    .getAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//get student by id
router.route("/students/:id").get((req, res) => {
  const id = req.params.id;

  studentRepo
    .getById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//post new student into table
router.route("/students").post((req, res) => {
  const student = req.body;

  studentRepo
    .addStudent(student)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//update students math grades
router.route("/students/math/:id/:math").put((req, res) => {
  const id = req.params.id;
  const math = req.params.math;
  const student = {
    id,
    math,
  };
  studentRepo
    .updateMathGrade(student)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//update students history grades
router.route("/students/history/:id/:history").put((req, res) => {
  const id = req.params.id;
  const history = req.params.history;
  const student = {
    id,
    history,
  };
  studentRepo
    .updateHistoryGrade(student)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//update students WF grades
router.route("/students/wf/:id/:wf").put((req, res) => {
  const id = req.params.id;
  const wf = req.params.wf;
  const student = {
    id,
    wf,
  };
  studentRepo
    .updateWFGrade(student)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//delete student by id
router.route("/students/:id").delete((req, res) => {
  const id = req.params.id;

  studentRepo
    .deleteById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
