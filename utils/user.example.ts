import prisma from "../prisma/client";

export class userTest {
  static async create() {
    await prisma.user.create({
      data: {
        name: "test",
        username: "test",
        password: await Bun.password.hash("test", {
          algorithm: "bcrypt",
          cost: 10,
        }),
        token: "test",
      },
    });
  }

  static async delete() {
    await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }
}
