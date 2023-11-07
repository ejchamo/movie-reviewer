import express from "express";
import { Review } from "../../../models/index.js";

const reviewRouter = new express.Router();

reviewRouter.patch("/:id", async (req, res) => {
  const reviewContent = req.body.content;

  const userId = req.body.userId;
  const reviewId = req.body.reviewId;

  const review = await Review.query().findById(reviewId);
  const reviewUserId = review.userId;

  if (userId === reviewUserId) {
    try {
      const updatedReview = await Review.query().patchAndFetchById(reviewId, {
        content: reviewContent.content,
      });
      res.status(200).json({ updatedReview });
      // res.status(200).json({ return all reviews including the updated one  });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  } else {
    res.status(400).json({ error: "not authorized to edit" });
  }
});

export default reviewRouter;
