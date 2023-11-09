import express from "express";
import { Vote } from "../../../models/index.js";
import VoteSerializer from "../../../serializers/VoteSerializer.js";
import { ValidationError } from "objection";

const votesRouter = new express.Router();

votesRouter.post("/:id", async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id;
  const { body } = req;
  const { vote } = body;

  try {
    const newVote = await Vote.query().insertAndFetch({
      reviewId,
      userId,
      vote,
    });

    const serializedVote = VoteSerializer.cleanVote(newVote);
    return res.status(201).json({ newVote: serializedVote });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default votesRouter;
