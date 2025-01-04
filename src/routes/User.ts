import { Hono } from "hono";
import {
  getUsers,
  createUsers,
  getUserById,
} from "../controllers/UserController";

const router = new Hono();

router.get("/", (c) => getUsers(c));

router.post("/", (c) => createUsers(c));

router.get("/:id", (c) => getUserById(c));

export const Users = router;
