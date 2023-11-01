import express from "express";
import { Movie } from "../../../models/index.js";
import MovieSerializer from "../../../serializers/MovieSerializer.js";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js";

const moviesRouter = new express.Router();

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.query();
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

moviesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.query().findById(id);
    const serializedMovie = MovieSerializer.getDetails(movie);

    const reviews = await movie.$relatedQuery("reviews");
    const serializedReviews = reviews.map((review) => {
      return ReviewSerializer.cleanReview(review);
    });

    serializedMovie.reviews = serializedReviews;

    return res.status(200).json({ movie: serializedMovie });
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
});

export default moviesRouter;
