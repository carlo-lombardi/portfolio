import express, { json } from "express";
import fs from "fs-extra";
import { dirname, join, parse } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

const router = express.Router();
const fullPath = fileURLToPath(import.meta.url);
const fullPathFile = join(dirname(fullPath), "../data/student.json");

router.get("/", (req, res) => {
  const asBuffer = fs.readFileSync(fullPathFile);
  const asBufferConverted = asBuffer.toString();
  const studentJson = JSON.parse(asBufferConverted);
  res.send(studentJson);
});
router.get("/:id", (req, res) => {
  const requestId = req.params.id;
  const asBuffer = fs.readFileSync(fullPathFile);
  const asBufferConverted = asBuffer.toString();
  const studentJson = JSON.parse(asBufferConverted);
  const studentJsonId = studentJson.find((st) => st.id === requestId);

  res.send(studentJsonId);
});
router.post("/", (req, res) => {
  const asBuffer = fs.readFileSync(fullPathFile);
  const asBufferConverted = asBuffer.toString();
  const studentJson = JSON.parse(asBufferConverted);

  const newStudent = req.body;
  newStudent.id = uniqid();

  studentJson.push(newStudent);

  fs.writeFileSync(fullPathFile, JSON.stringify(studentJson));

  res.status(201).send({ id: newStudent.id });
});
router.put("/:id", (req, res) => {
  const requestId = req.params.id;
  const asBuffer = fs.readFileSync(fullPathFile);
  const asBufferConverted = asBuffer.toString();
  const studentJson = JSON.parse(asBufferConverted);

  const arrayMod = studentJson.filter((x) => x.id !== requestId);

  const newArray = req.body;
  newArray.id = requestId;

  arrayMod.push(newArray);
  fs.writeFileSync(fullPathFile, JSON.stringify(arrayMod));

  res.send([{ data: "hello world" }]);
});
router.delete("/:id", (req, res) => {
  const requestId = req.params.id;
  const asBuffer = fs.readFileSync(fullPathFile);
  const asBufferConverted = asBuffer.toString();
  const studentJson = JSON.parse(asBufferConverted);

  const newArray = req.body;
  newArray.id = requestId;

  const newEmptyArray = studentJson.filter((x) => x.id !== requestId);
  fs.writeFileSync(fullPathFile, JSON.stringify(newEmptyArray));

  res.send([{ data: "hello world" }]);
});

export default router;
