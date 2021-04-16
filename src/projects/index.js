import express from "express";
import uniqid from "uniqid";
import {
  getProjects,
  writeProjects,
  getStudents,
  writeStudents,
  getReviews,
} from "../library/fs-tools.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dataConverted = await getProjects();
    if (req.query && req.query.name) {
      const filteringTheData = dataConverted.filter((e) => {
        return e.name === req.query.name;
      });
      res.send(filteringTheData);
    } else {
      res.send(dataConverted);
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const dataConverted = await getProjects();
    const requestId = req.params.id;
    const studentJsonId = dataConverted.find((st) => st.id === requestId);

    res.send(studentJsonId);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id/reviews", async (req, res) => {
  try {
    // const dataConverted = await getProjects();
    const requestId = req.params.id;
    const getReview = await getReviews();
    const newArrayReview = getReview.filter((e) => e.projectID === requestId);
    res.send(newArrayReview);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const projects = await getProjects();
    const students = await getStudents();
    const { studentID } = req.body;
    const student = students.find((e) => e.id === studentID);
    if (student) {
      let numberOfProjects = projects.filter((e) => e.studentID === studentID)
        .length;
      const newProject = { ...req.body, id: uniqid() };
      projects.push(newProject);
      await writeProjects(projects);
      numberOfProjects++;
      let newStudentOfTheProjects = students.filter((e) => e.id !== studentID);

      student.numberOfProjects = numberOfProjects;
      newStudentOfTheProjects.push(student);

      await writeStudents(newStudentOfTheProjects);

      res.status(201).send({ status: "all good" });
    } else {
      res.status(400).send({ message: "students is not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const projects = await getProjects();
    const requestId = req.params.id;
    const modifiedProject = projects.filter((x) => x.id !== requestId);
    const newArray = req.body;
    newArray.id = requestId;
    modifiedProject.push(newArray);
    await writeProjects(modifiedProject);
    res.send([{ message: "all good" }]);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const projects = await getProjects();
    const requestId = req.params.id;

    const newArray = req.body;
    newArray.id = requestId;

    const newEmptyArray = projects.filter((x) => x.id !== requestId);
    await writeProjects(newEmptyArray);
    res.send([{ message: "all Good" }]);
  } catch (error) {
    console.log(error);
  }
});

export default router;
