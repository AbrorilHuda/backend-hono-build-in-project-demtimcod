import { Hono } from "hono";
import { loginUser, registerUser } from "../controllers/UserController";

const router = new Hono();

router.post("/", (c) => registerUser(c));

router.post("/login", (c) => loginUser(c));

export const Users = router;
