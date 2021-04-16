import express, { json } from "express";
import fs from "fs-extra";
import uniqid from "uniqid";
import {
  getProjects,
  writeProjects,
  getStudents,
  writeStudents,
} from "../library/fs-tools.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await getStudents();
    res.send(students);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    const students = await getStudents();
    const studentId = students.find((e) => e.id === reqId);
    res.send(studentId);
  } catch (error) {
    console.log("the error ", error);
  }
});
router.post("/", async (req, res) => {
  try {
    const students = await getStudents();
    const newStudent = { ...req.body, id: uniqid() };

    students.push(newStudent);
    await writeStudents(students);

    res.status(201).send({ id: newStudent.id });
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const students = await getStudents();
    const reqId = req.params.id;
    const gettingNewStudent = students.filter((e) => e.id !== reqId);
    const newModifiedStudent = { ...req.body, id: reqId, modiedAt: new Date() };

    gettingNewStudent.push(newModifiedStudent);
    await writeStudents(gettingNewStudent);
    res.status(201).send({ id: newModifiedStudent.id });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const students = await getStudents();
    const reqId = req.params.id;
    const deleteStudent = students.filter((e) => e.id !== reqId);

    students.push(deleteStudent);
    await writeStudents(deleteStudent);
    res.send({ response: "all good" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
