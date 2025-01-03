import { Context } from "hono";
import prisma from "../../prisma/client";

export const getUsers = async (c: Context) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: "desc" } });

    return c.json(
      {
        success: true,
        message: "List Data Users",
        data: users.length > 0 ? users : "Data Users Empty",
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
  }
};

export async function createUsers(c: Context) {
  try {
    const body = await c.req.parseBody();
    const name = typeof body["name"] === "string" ? body["name"] : "";
    const username =
      typeof body["username"] === "string" ? body["username"] : "";
    const password =
      typeof body["password"] === "string" ? body["password"] : "";

    const post = await prisma.user.create({
      data: {
        name,
        username,
        password,
      },
    });

    return c.json(
      {
        success: true,
        message: "Create Post Success",
        data: post,
      },
      201
    );
  } catch (e: unknown) {
    console.error(`Error Creating Post: ${e}`);
  }
}
