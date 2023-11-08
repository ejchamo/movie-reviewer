import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import { ValidationError } from "objection";
import uploadImage from "../../../services/uploadImage.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, username, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

usersRouter.patch("/:id", uploadImage.single("image"), async (req, res) => {
  try {
    const user = req.user;

    const body = await user.$query().patchAndFetch({ image: req.file.location });

    return res.status(201).json({ body });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;
