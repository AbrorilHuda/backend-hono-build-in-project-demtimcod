import { Hono } from "hono";
import {
  getUserCurrent,
  loginUser,
  registerUser,
  updateUserCurrent,
} from "../controllers/UserController";
import { ApplicationVariable } from "../../types/App";
import { userService } from "../services/userService";

const router = new Hono<{ Variables: ApplicationVariable }>();

router.post("/", (c) => registerUser(c));

router.post("/login", (c) => loginUser(c));

router.use(async (c, next) => {
  const token = c.req.header("Authorization");
  const user = await userService.get(token);
  c.set("user", user);
  await next();
});

router.get("/current", (c) => getUserCurrent(c));
router.patch("/current", (c) => updateUserCurrent(c));

export const Users = router;
