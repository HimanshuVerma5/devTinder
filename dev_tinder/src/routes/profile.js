const express = require("express");
const profileRouter = express.Router();
const cors = require("cors");
const { userAuth } = require("../middleware/auth");

profileRouter.options(
  "/profile/edit",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["PATCH"],
  }),
  (req, res) => {
    return res.sendStatus(204);
  }
);

/* NORMAL ROUTES */
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  res.send(req.user);
});

profileRouter.patch("/profile/edit", async (req, res) => {
  try {
    const { firstName, lastName, age, gender, about, photo } = req.body;
    // Example: update user in DB
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, age, gender, about, photo }, { new: true });
    res.json({ message: "Profile updated", data: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = profileRouter;