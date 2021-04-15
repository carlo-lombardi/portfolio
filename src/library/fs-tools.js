import fs from "fs-extra";
import { dirname, join, parse } from "path";
import { fileURLToPath } from "url";

const { readJSON, writeJSON } = fs;

const getDataPath = join(dirname(fileURLToPath(import.meta.url), "../data"));

export const getProjects = async () =>
  await readJSON(join(getDataPath, "projects.json"));
export const getStudents = async () =>
  await readJSON(join(getDataPath, "student.json"));
export const writeProjects = async () =>
  await writeJSON(join(getDataPath, "projects.json"));
export const writeStudent = async () =>
  await writeJSON(join(getDataPath, "student.json"));
