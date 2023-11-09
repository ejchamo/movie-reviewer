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

// votesRouter.patch("/:id", async (req, res) => {
//   const reviewContent = req.body.content;

//   const user = req.user;
//   const reviewId = req.params.id;

//   const review = await Review.query().findById(reviewId);
//   const reviewUserId = review.userId;

//   if (user.id === reviewUserId) {
//     try {
//       const updatedReview = await review.$query().patchAndFetch({
//         content: reviewContent.content,
//       });
//       res.status(200).json({ updatedReview });
//     } catch (err) {
//       res.status(500).json({ errors: err });
//     }
//   } else {
//     res.status(400).json({ error: "not authorized to edit" });
//   }
// });

export default votesRouter;
