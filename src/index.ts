import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { readFileSync } from "fs";
import { join } from "path";
import { Routes } from "./routes";

const app = new Hono();
const publicPath = join(process.cwd(), "./public");

// static file render
app.use(
  "/assets/*",
  serveStatic({
    root: "./public",
  })
);

app.get("/", (c) => {
  const htmlPath = join(publicPath, "index.html");
  const htmlContent = readFileSync(htmlPath, "utf-8");
  return c.html(htmlContent);
});

app.get("/api", (c) => {
  return c.json({
    name: "demtimcod-API",
    version: "1.0.0",
    copyright: 2024,
    author: {
      username: "abrordc",
      github: "https://github.com/AbrorilHuda",
    },
    githubComunity: "https://github.com/demtimcod",
  });
});

app.route("/api/posts", Routes);

app.notFound((c) => {
  return c.text("404 Not Found oyyeh", 404);
});

export default app;
