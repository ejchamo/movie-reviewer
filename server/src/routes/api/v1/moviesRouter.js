import express from "express";
import { Movie } from "../../../models/index.js";

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
  const { title } = req.body;
  try {
    const newMovie = await Movie.query().insertAndFetch({
      title,
    });
    return res.status(201).json({ title: newMovie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default moviesRouter;
