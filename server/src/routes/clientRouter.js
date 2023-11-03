import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/movies/:id",
  "/movies/new",
  "/movies/:id/reviewForm",
  "/movies/:id/reviews/:id/edit",
];

const authedClientRoutes = ["/profile"];

router.get(authedClientRoutes, (req, res) => {
  if (req.user) {
    res.sendFile(getClientIndexPath());
  } else {
    res.redirect("/user-sessions/new");
  }
});

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
