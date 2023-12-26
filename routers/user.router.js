import { Router } from "express";
import registerUser from "../controllers/register.js";
import login from "../controllers/login.js";
import verifyjwt from "../middlewares/authMiddleware.js";
import logout from "../controllers/logout.js";

const router= Router();
router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").post(verifyjwt,logout)
export default router;