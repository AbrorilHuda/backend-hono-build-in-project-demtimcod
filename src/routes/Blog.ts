// di generate oleh dc assistents
import { Hono } from "hono";

import {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} from "../controllers/blogController";

const router = new Hono();
/*
@yourfunction itu function ubah funlerction yang kalian buat
atau menggunakan perintah bun dc make:route --controller
*/

router.get("/", (c) => getBlogs(c));
router.post("/", (c) => createBlog(c));
router.get("/:id", (c) => getBlogById(c));
router.patch("/:id", (c) => updateBlogById(c));
router.delete("/:id", (c) => deleteBlogById(c));
