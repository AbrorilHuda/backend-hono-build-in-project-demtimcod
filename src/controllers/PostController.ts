import { Context } from "hono";

import prisma from "../../prisma/client";

export const getPosts = async (c: Context) => {
  try {
    const posts = await prisma.post.findMany({ orderBy: { id: "desc" } });

    return c.json(
      {
        success: true,
        message: "List Data Posts",
        data: posts,
      },
      200
    );
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
  }
};

export async function createPost(c: Context) {
  try {
    const body = await c.req.parseBody();

    const title = typeof body["title"] === "string" ? body["title"] : "";
    const content = typeof body["content"] === "string" ? body["content"] : "";

    const post = await prisma.post.create({
      data: {
        title,
        content,
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

export async function getPostById(c: Context) {
  try {
    const postId = parseInt(c.req.param("id"));

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return c.json(
        {
          success: false,
          message: `post id ${postId} Not Found `,
        },
        404
      );
    }

    return c.json(
      {
        success: true,
        message: "Detail Data Post id : " + postId,
        data: post,
      },
      200
    );
  } catch (e: unknown) {
    console.error("error get post by id" + e);
  }
}

export async function updatePost(c: Context) {
  try {
    const postId = parseInt(c.req.param("id"));

    const body = await c.req.parseBody();

    const title = typeof body["title"] === "string" ? body["title"] : "";
    const content = typeof body["content"] === "string" ? body["content"] : "";

    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    return c.json(
      {
        success: true,
        message: "Update Post Success",
        data: post,
      },
      200
    );
  } catch (e: unknown) {
    console.error("erro update post" + e);
  }
}

export async function deletePost(c: Context) {
  try {
    const postId = parseInt(c.req.param("id"));

    await prisma.post.delete({
      where: { id: postId },
    });

    return c.json(
      {
        success: true,
        message: "Delete Post Success",
      },
      200
    );
  } catch (e: unknown) {
    console.error("error delete poost" + e);
  }
}
