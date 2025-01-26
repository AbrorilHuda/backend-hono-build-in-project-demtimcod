import { Hono } from "hono";
import {
  getAllUser,
  getUserCurrent,
  loginUser,
  logoutUser,
  registerUser,
  updateUserCurrent,
} from "../controllers/UserController";
import { ApplicationVariable } from "../../types/App";
import { userService } from "../services/userService";

const router = new Hono<{ Variables: ApplicationVariable }>();

router.post("/", (c) => registerUser(c));

router.post("/login", (c) => loginUser(c));
router.get("/all", (c) => getAllUser(c));

router.use(async (c, next) => {
  let token = c.req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    c.status(401);
    c.json({ error: "Unauthorized" });
  }
  if (token) {
    token = token.split(" ")[1];
  }

  const user = await userService.get(token);
  c.set("user", user);
  await next();
});

router.get("/current", (c) => getUserCurrent(c));
router.patch("/current", (c) => updateUserCurrent(c));
router.delete("/current", (c) => logoutUser(c));

export const Users = router;
