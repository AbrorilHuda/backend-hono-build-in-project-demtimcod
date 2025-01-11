import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { env } from "hono/adapter";
import { readFileSync } from "fs";
import { join } from "path";
import { Posts, Users } from "./routes";

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
  const env_proses = env(c);
  return c.json({
    name: env_proses.NAME,
    version: env_proses.VERSION,
    copyright: env_proses.COPYRIGHT,
    author: {
      username: "abrordc",
      github: "https://github.com/AbrorilHuda",
    },
    githubComunity: "https://github.com/demtimcod",
  });
});

// routes handler

app.route("/api/posts", Posts);
app.route("/api/users", Users);

app.notFound((c) => {
  c.status(404);
  return c.json({
    status: 404,
    message: "Not Found",
  });
});

export default app;
