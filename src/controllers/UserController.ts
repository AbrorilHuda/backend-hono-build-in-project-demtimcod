import { Context } from "hono";
import { LoginUserRequst, RegisterUserRequest } from "../../types/User";
import { userService } from "../services/userService";

export async function registerUser(c: Context) {
  const request = (await c.req.json()) as RegisterUserRequest;

  const response = await userService.register(request);

  return c.json({
    data: response,
  });
}
export async function loginUser(c: Context) {
  const request = (await c.req.json()) as LoginUserRequst;

  const response = await userService.login(request);

  return c.json({
    data: response,
  });
}
