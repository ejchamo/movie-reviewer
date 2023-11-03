import express from "express";
import { Review } from "../../../models/index.js";

const reviewRouter = new express.Router();

reviewRouter.patch("/:id", async (req, res) => {
  const userId = req.body.userId;
  const reviewId = req.body.reviewId;

  const review = await Review.query().findById(reviewId);
  console.log("review", review);
  const reviewUserId = review.userId;

  if (userId === reviewUserId) {
    try {
      const editRow = await Review.query().patchAndFetchById(reviewId, { content: "edit" });
      console.log("editRow", editRow.content);
      res.status(200).json({});
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  } else {
    res.status(400).json({ error: "not authorized to edit" });
  }
});

export default reviewRouter;
