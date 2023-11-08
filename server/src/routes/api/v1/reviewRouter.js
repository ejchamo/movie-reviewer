import express from "express";
import { Review } from "../../../models/index.js";

const reviewRouter = new express.Router();

reviewRouter.patch("/:id", async (req, res) => {
  const reviewContent = req.body.content;

  const user = req.user;
  const reviewId = req.params.id;

  const review = await Review.query().findById(reviewId);
  const reviewUserId = review.userId;

  if (user.id === reviewUserId) {
    try {
      const updatedReview = await review.$query().patchAndFetch({
        content: reviewContent.content,
      });
      res.status(200).json({ updatedReview });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  } else {
    res.status(400).json({ error: "not authorized to edit" });
  }
});

reviewRouter.delete("/:id", async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.id;

  const review = await Review.query().findById(reviewId);
  const reviewUserId = review.userId;

  if (userId === reviewUserId) {
    try {
      const deletedRows = await Review.query().deleteById(reviewId);
      res.status(200).json({ deletedRows });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  } else {
    res.status(401).json({ warning: "not authorized to delete review" });
  }
});

export default reviewRouter;
