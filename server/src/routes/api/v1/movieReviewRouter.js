import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Review } from "../../../models/index.js";
import cleanUserInput from "../../../services/CleanUserInput.js";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js";

const movieReviewRouter = new express.Router({ mergeParams: true });

movieReviewRouter.post("/", async (req, res) => {
  const movieId = req.params.id;
  const userId = req.user.id;
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { content, rating } = formInput;

  try {
    const newReview = await Review.query().insertAndFetch({
      movieId,
      userId,
      content,
      rating,
    });

    const serializedReview = ReviewSerializer.cleanReview(newReview);
    return res.status(201).json({ newReview: serializedReview });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default movieReviewRouter;
