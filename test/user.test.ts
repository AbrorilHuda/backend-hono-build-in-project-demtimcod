import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import app from "../src";
import { logger } from "../log/logging";
import { userTest } from "../utils/user.example";

describe("POST api/users", async () => {
  afterEach(async () => {
    await userTest.delete();
  });

  it("should reject register new user if request is invalid", async () => {
    const response = await app.request("api/users", {
      method: "post",
      body: JSON.stringify({
        name: "",
        username: "",
        password: "",
      }),
    });

    const body = await response.json();
    logger.debug(body);

    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });
  it("should reject register new user if username already exists", async () => {
    await userTest.create();
    const response = await app.request("api/users", {
      method: "post",
      body: JSON.stringify({
        name: "test",
        username: "test",
        password: "test",
      }),
    });

    const body = await response.json();
    logger.debug(body);

    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });
  it("should register new user succes", async () => {
    const response = await app.request("api/users", {
      method: "post",
      body: JSON.stringify({
        name: "test",
        username: "test",
        password: "test",
      }),
    });

    const body = await response.json();
    logger.debug(body);

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.username).toBe("test");
    expect(body.data.name).toBe("test");
  });
});

describe("POST api/users/login", () => {
  beforeEach(async () => {
    await userTest.create();
  });

  afterEach(async () => {
    await userTest.delete();
  });
  it("should be able to login", async () => {
    const response = await app.request("api/users/login", {
      method: "post",
      body: JSON.stringify({
        username: "test",
        password: "test",
      }),
    });

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.data.token).toBeDefined();
  });
  it("should be rejected if username is wrong", async () => {
    const response = await app.request("api/users/login", {
      method: "post",
      body: JSON.stringify({
        username: "username salah",
        password: "test",
      }),
    });

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.errors).toBeDefined();
  });
  it("should be rejected if password is wrong", async () => {
    const response = await app.request("api/users/login", {
      method: "post",
      body: JSON.stringify({
        username: "test",
        password: "password salah",
      }),
    });

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.errors).toBeDefined();
  });
});
