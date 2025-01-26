import { Context } from "hono";
import {
  LoginUserRequst,
  RegisterUserRequest,
  toUserResponse,
  UpdateUserRequest,
} from "../../types/User";
import { userService } from "../services/userService";
import { User } from "@prisma/client";

export async function getAllUser(c: Context) {
  const response = await userService.getAll();

  return c.json({
    log: "get all user",
    data: response,
  });
}

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

export async function getUserCurrent(c: Context) {
  const user = c.get("user") as User;
  return c.json({
    data: toUserResponse(user),
  });
}

export async function updateUserCurrent(c: Context) {
  const user = c.get("user") as User;
  const request = (await c.req.json()) as UpdateUserRequest;

  const response = await userService.update(user, request);

  return c.json({
    data: response,
  });
}

export async function logoutUser(c: Context) {
  const user = c.get("user") as User;
  const response = await userService.logout(user);

  return c.json({
    data: {
      logout: response,
      message: "logout success",
    },
  });
}
