import { Hono } from "hono";

import {
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/PostController";

const router = new Hono();

router.get("/", (c) => getPosts(c));

router.post("/", (c) => createPost(c));

router.get("/:id", (c) => getPostById(c));

router.patch("/:id", (c) => updatePost(c));

router.delete("/:id", (c) => deletePost(c));

export const Posts = router;
