import { Hono } from "hono";
import { getUsers, createUsers } from "../controllers/UserController";

const router = new Hono();

router.get("/", (c) => getUsers(c));

router.post("/", (c) => createUsers(c));

export const Users = router;
