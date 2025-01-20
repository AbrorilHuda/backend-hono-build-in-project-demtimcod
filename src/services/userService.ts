import prisma from "../../prisma/client";
import { userValidation } from "../validation/userValidation";
import { HTTPException } from "hono/http-exception";
import {
  LoginUserRequst,
  RegisterUserRequest,
  TokenType,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../../types/User";
import { User } from "@prisma/client";

export class userService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    // validasi request
    request = userValidation.REGISTER.parse(request);

    const totalUserWithUsername = await prisma.user.count({
      where: {
        username: request.username,
      },
    });

    // apa ada di database apa tidak
    if (totalUserWithUsername != 0) {
      throw new HTTPException(400, {
        message: "username already exist",
      });
    }

    // hash password
    request.password = await Bun.password.hash(request.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    //save ke database
    const user = await prisma.user.create({
      data: request,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequst): Promise<UserResponse> {
    // validasi user
    request = userValidation.LOGIN.parse(request);

    let user = await prisma.user.findUnique({
      where: {
        username: request.username,
      },
    });

    if (!user) {
      throw new HTTPException(401, {
        message: "username or password is wrong",
      });
    }

    const invalidPassword = await Bun.password.verify(
      request.password,
      user.password,
      "bcrypt"
    );

    if (!invalidPassword) {
      throw new HTTPException(401, {
        message: "username or password is wrong",
      });
    }

    user = await prisma.user.update({
      where: {
        username: request.username,
      },
      data: {
        token: crypto.randomUUID(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }

  static async get(token: TokenType): Promise<User> {
    const result = userValidation.TOKEN.safeParse(token);

    if (result.error) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }

    token = result.data;

    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }
    return user;
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    request = userValidation.UPDATE.parse(request);

    if (request.name) {
      user.name = request.name;
    }

    if (request.password) {
      user.password = await Bun.password.hash(request.password, {
        algorithm: "bcrypt",
        cost: 10,
      });
    }

    user = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return toUserResponse(user);
  }
}
