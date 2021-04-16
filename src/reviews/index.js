import express, { json } from "express";
import fs from "fs-extra";
import uniqid from "uniqid";
import {
  getReviews,
  writeReviews,
  getProjects,
  writeProjects,
} from "../library/fs-tools.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();
    res.send(reviews);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    const reviews = await getReviews();
    const reviewId = reviews.find((e) => e.id === reqId);
    res.send(reviewId);
  } catch (error) {
    console.log("the error ", error);
  }
});
router.post("/", async (req, res) => {
  try {
    const reviews = await getReviews();
    const projects = await getProjects();
    const { projectID } = req.body;
    const projectAddedToReview = projects.find((e) => e.id === projectID);
    if (projectAddedToReview) {
      let numberReviewed = reviews.filter((e) => e.projectID === projectID)
        .length;

      const newReview = { ...req.body, id: uniqid(), date: new Date() };
      reviews.push(newReview);
      await writeReviews(reviews);

      numberReviewed++;

      let newReviewed = projects.filter((e) => e.id !== projectID);

      projectAddedToReview.numberReviewed = numberReviewed;
      newReviewed.push(projectAddedToReview);

      await writeProjects(newReviewed);

      res.status(201).send({ message: "all good" });
    } else {
      res.status(400).send({ message: "not found" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const reviews = await getReviews();
    const reqId = req.params.id;
    const gettingNewReview = reviews.filter((e) => e.id !== reqId);
    const newModifiedReview = {
      ...req.body,
      id: reqId,
      modifiedAt: new Date(),
    };

    gettingNewReview.push(newModifiedReview);
    await writeReviews(gettingNewReview);
    res.status(201).send({ id: newModifiedReview.id });
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const reviews = await getReviews();
    const reqId = req.params.id;
    const deleteReview = reviews.filter((e) => e.id !== reqId);

    reviews.push(deleteReview);
    await writeReviews(deleteReview);
    res.send({ response: "all good" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
