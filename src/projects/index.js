import express from "express";
import uniqid from "uniqid";
import {
  getProjects,
  writeProjects,
  getStudents,
  writeStudent,
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
router.post("/", async (req, res) => {
  try {
    const projects = await getProjects();
    const students = await getStudents();
    const { studentID } = req.body;
    const student = students.find((e) => e.id === studentID);
    if (student) {
      const numberOfProjects = projects.filter((e) => e.studentID === studentID)
        .lenght;
      const newProject = { ...req.body, id: uniqid() };
      projects.push(newProject);
      writeProjects(projects);
      numberOfProjects++;
      const newStudentOfTheProjects = students.filter(
        (e) => e.id !== studentID
      );

      students.numberOfProjects = numberOfProjects;
      newStudentOfTheProjects.push(student);

      await writeStudent(newStudentOfTheProjects);

      res.status(201).send({ id: newProject.id });
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const dataConverted = await getProjects();
    const requestId = req.params.id;

    const arrayMod = dataConverted.filter((x) => x.id !== requestId);

    const newArray = req.body;
    newArray.id = requestId;

    arrayMod.push(newArray);
    await writeStudent(arrayMod);

    res.send([{ data: "hello world" }]);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const dataConverted = await getProjects();
    const requestId = req.params.id;

    const newArray = req.body;
    newArray.id = requestId;

    const newEmptyArray = dataConverted.filter((x) => x.id !== requestId);
    await writeStudent(newEmptyArray);
    res.send([{ data: "hello world" }]);
  } catch (error) {
    console.log(error);
  }
});

export default router;
