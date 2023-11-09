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

  const existingVote = await Vote.query().findOne({ reviewId, userId });

  if (existingVote && existingVote.vote !== parseInt(vote)) {
    try {
      const newVote = await existingVote.$query().patchAndFetch({ vote });
      const serializedVote = VoteSerializer.cleanVote(newVote);
      res.status(200).json({ newVote: serializedVote });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  } else if (existingVote && existingVote.vote === parseInt(vote)) {
    res.send("no vote change");
  } else {
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
  }
});

export default votesRouter;
