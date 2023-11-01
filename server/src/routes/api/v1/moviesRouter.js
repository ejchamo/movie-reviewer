import express from "express";
import { Movie } from "../../../models/index.js";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/CleanUserInput.js";
import MovieSerializer from "../../../serializers/MovieSerializer.js";
import movieReviewRouter from "./movieReviewRouter.js";

const moviesRouter = new express.Router();
moviesRouter.use("/:id/reviewForm", movieReviewRouter);

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.query();
    const serializedMovies = MovieSerializer.getDetails(movies);

    res.status(200).json({ movies: serializedMovies });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

moviesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.query().findById(id);
    const serializedMovie = await MovieSerializer.getSummary(movie);

    return res.status(200).json({ movie: serializedMovie });
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
});

moviesRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { title } = formInput;

  try {
    const newMovie = await Movie.query().insertAndFetch({
      title,
    });
    return res.status(201).json({ title: newMovie });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default moviesRouter;
