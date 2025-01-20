import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import app from "../src";
import { logger } from "../log/logging";
import { userTest } from "../utils/user.example";
import { password } from "bun";

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

describe("GET api/users/current", () => {
  beforeEach(async () => {
    await userTest.create();
  });
  afterEach(async () => {
    await userTest.delete();
  });
  it("should be able to get user", async () => {
    const response = await app.request("api/users/current", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.name).toBe("test");
    expect(body.data.username).toBe("test");
  });
  it("should not be able to get user if token is invalid", async () => {
    const response = await app.request("api/users/current", {
      method: "get",
      headers: {
        Authorization: "salah",
      },
    });

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.errors).toBeDefined();
  });
  it("should not be able to get user if there is no Authorization header", async () => {
    const response = await app.request("api/users/current", {
      method: "get",
    });

    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.errors).toBeDefined();
  });
});

describe("PATCH api/users/current", () => {
  beforeEach(async () => {
    await userTest.create();
  });
  afterEach(async () => {
    await userTest.delete();
  });
  it("should be rejected if request is invalid", async () => {
    const response = await app.request("api/users/current", {
      method: "patch",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        name: "",
        password: "",
      }),
    });

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.errors).toBeDefined();
  });
  it("should be able to update name", async () => {
    const response = await app.request("api/users/current", {
      method: "patch",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        name: "nama",
      }),
    });

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.name).toBe("nama");
  });
  it("should be able to update password", async () => {
    let response = await app.request("api/users/current", {
      method: "patch",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        password: "new",
      }),
    });

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();

    response = await app.request("api/users/login", {
      method: "post",
      body: JSON.stringify({
        username: "test",
        password: "new",
      }),
    });
    expect(response.status).toBe(200);
  });
});
