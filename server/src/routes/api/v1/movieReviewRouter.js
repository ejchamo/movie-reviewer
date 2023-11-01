import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Review } from "../../../models/index.js";
import cleanUserInput from "../../../services/CleanUserInput.js";

const movieReviewRouter = new express.Router({ mergeParams: true });

movieReviewRouter.post("/", async (req, res) => {
  const movieId = req.params.movieId;
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { content, userId } = formInput;

  try {
    const newReview = await Review.query().insertAndFetch({
      movieId,
      userId,
      content,
    });
    return res.status(201).json({ newReview });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default movieReviewRouter;
