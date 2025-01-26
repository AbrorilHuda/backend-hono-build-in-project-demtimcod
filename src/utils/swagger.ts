import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, z } from "@hono/zod-openapi";
export function setupSwagger(app: OpenAPIHono) {
  // Define a schema for your API endpoint
  app.get("/docs", swaggerUI({ url: "/openapi" }));
  // Create an API route with OpenAPI documentation
  const UserRegisterSchema = z.object({
    username: z.string().min(1, "Username must not be empty"),
    password: z.string().min(1, "Password must not be empty"),
    name: z.string().min(1, "Name must not be empty"),
  });

  const UserLoginSchema = z.object({
    username: z.string().min(1, "Username must not be empty"),
    password: z.string().min(1, "Password must not be empty"),
  });

  const UserAllSchema = z.object({
    id: z.string().min(1, "Id must not be empty"),
    username: z.string().min(1, "Username must not be empty"),
    password: z.string().min(1, "Password must not be empty"),
  });

  const UserUpdateSchema = z.object({
    name: z.string().optional(),
    password: z.string().optional(),
  });

  app.get("/openapi", (c) => {
    return c.json({
      openapi: "3.0.0",
      info: {
        title: "Demtimcod API",
        version: "1.0.0",
        description: "API untuk aplikasi demtimcod dan experimentnya",
      },
      tags: [
        {
          name: "User",
          description: "api user namagement",
        },
      ],
      paths: {
        "/api/users": {
          post: {
            tags: ["User"],
            summary: "Register User",
            requestBody: {
              content: {
                "application/json": {
                  schema: UserRegisterSchema.openapi("UserRegister"),
                },
              },
            },
            responses: {
              "200": {
                description: "Registrasi berhasil",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            username: { type: "string" },
                            name: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/users/login": {
          post: {
            tags: ["User"],
            summary: "Login User",
            requestBody: {
              content: {
                "application/json": {
                  schema: UserLoginSchema.openapi("UserLogin"),
                },
              },
            },
            responses: {
              "200": {
                description: "Login berhasil",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            username: { type: "string" },
                            name: { type: "string" },
                            token: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/users/all": {
          get: {
            tags: ["User"],
            summary: "get all data users",
            responses: {
              "200": {
                description: "Profil pengguna berhasil diambil",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            data: [],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/users/current": {
          get: {
            tags: ["User"],
            summary: "Get User Profile",
            security: [{ bearerAuth: [] }],
            responses: {
              "200": {
                description: "Profil pengguna berhasil diambil",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            username: { type: "string" },
                            name: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          patch: {
            tags: ["User"],
            summary: "Update User Profile",
            security: [{ bearerAuth: [] }],
            requestBody: {
              content: {
                "application/json": {
                  schema: UserUpdateSchema.openapi("UserUpdate"),
                },
              },
            },
            responses: {
              "200": {
                description: "Profil berhasil diperbarui",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            username: { type: "string" },
                            name: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          delete: {
            tags: ["User"],
            summary: "Logout User",
            security: [{ bearerAuth: [] }],
            responses: {
              "200": {
                description: "Logout berhasil",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: {
                          type: "object",
                          properties: {
                            logout: { type: "boolean" },
                            message: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    });
  });
}
