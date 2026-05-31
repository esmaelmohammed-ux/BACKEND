import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

// Test endpoint: http://localhost:4000/api/user/test
userRouter.get("/test", (req, res) => {
  res.json({ message: "User route is working" });
});

export default userRouter;
