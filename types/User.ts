import { User } from "@prisma/client";

// di generate oleh dc assistents
export type RegisterUserRequest = {
  name: string;
  username: string;
  password: string;
};

export type LoginUserRequst = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};
export type UserResponse = {
  name: string;
  username: string;
  token?: string;
};

export type TokenType = string | undefined | null;

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  };
}
