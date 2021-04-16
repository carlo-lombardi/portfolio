import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const { readJSON, writeJSON } = fs;

const getDataPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

export const getProjects = async () =>
  await readJSON(join(getDataPath, "projects.json"));
export const getStudents = async () =>
  await readJSON(join(getDataPath, "student.json"));
export const getReviews = async () =>
  await readJSON(join(getDataPath, "reviews.json"));
//----------------- separamos los reads con los writes
export const writeProjects = async (content) =>
  await writeJSON(join(getDataPath, "projects.json"), content);
export const writeStudents = async (content) =>
  await writeJSON(join(getDataPath, "student.json"), content);
export const writeReviews = async (content) =>
  await writeJSON(join(getDataPath, "reviews.json"), content);
