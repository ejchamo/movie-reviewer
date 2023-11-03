import express from "express";
import { Review } from "../../../models/index.js";

const reviewRouter = new express.Router();

reviewRouter.delete("/:id", async (req, res) => {
  const userId = req.body.userId;
  const reviewId = req.body.reviewId;
  const reviewUserId = req.body.reviewUserID;

  if (userId === reviewUserId) {
    try {
      console.log("userId in delete try block", userId);
      const deletedRows = await Review.query().deleteById(reviewId);
      console.log("return from delete query", deletedRows);
      res.status(200).json({ deletedRows });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  } else {
    res.status(401).json({ warning: "not authorized to delete review" });
  }
});

export default reviewRouter;
