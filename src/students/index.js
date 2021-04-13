import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join, parse } from "path"; //cors
import uniqid from "uniqid";

const router = express.Router();

const filename = fileURLToPath(import.meta.url);
const filenameWithPath = join(dirname(filename), "/students.json");

router.get("/", (req, res) => {
  const response = fs.readFileSync(filenameWithPath); //devuelve un buffer
  const responseAsStrings = response.toString();
  const responseAsStringsJSON = JSON.parse(responseAsStrings);
  res.send(responseAsStringsJSON);
});
router.get("/:id", (req, res) => {
  const request = req.params.id;
  const response = fs.readFileSync(filenameWithPath); //devuelve un buffer
  const responseAsStrings = response.toString();
  const responseAsStringsJSON = JSON.parse(responseAsStrings);
  const singleStudent = responseAsStringsJSON.filter(
    (student) => student.id === parseInt(request)
  );

  res.send(singleStudent);
});
router.post("/", (req, res) => {
  res.send({});
});
router.put("/:id", (req, res) => {
  res.send({});
});
router.delete("/:id", (req, res) => {
  res.send({});
});

export default router;
