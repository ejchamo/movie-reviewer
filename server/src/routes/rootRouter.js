import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import moviesRouter from "./api/v1/moviesRouter.js";
import reviewRouter from "./api/v1/reviewRouter.js";
import votesRouter from "./api/v1/votesRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/movies", moviesRouter);
rootRouter.use("/api/v1/reviews", reviewRouter);
rootRouter.use("/api/v1/votes", votesRouter);

//place your server-side routes here

export default rootRouter;
