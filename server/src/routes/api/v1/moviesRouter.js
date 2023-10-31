import express from "express";
import { Movie } from "../../../models/index.js";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/CleanUserInput.js";

const moviesRouter = new express.Router();

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.query();
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ errors: error });
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
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default moviesRouter;
