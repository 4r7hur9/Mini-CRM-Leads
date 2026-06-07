import bcrypt from "bcrypt";
import * as authService from "../../src/services/authService";
import { prisma } from "../../src/config/database";
import { AppError } from "../../src/utils/AppError";

describe("AuthService", () => {
  describe("register", () => {
    it("cria usuario com senha hasheada e retorna token", async () => {
      const result = await authService.register({
        name: "Arthur Teste",
        email: "arthur@example.com",
        password: "Senha@123",
      });

      const storedUser = await prisma.user.findUnique({
        where: { email: "arthur@example.com" },
      });

      expect(result.user.email).toBe("arthur@example.com");
      expect(result.token).toEqual(expect.any(String));
      expect(storedUser?.passwordHash).not.toBe("Senha@123");
      expect(await bcrypt.compare("Senha@123", storedUser?.passwordHash ?? "")).toBe(true);
    });

    it("lanca CONFLICT se e-mail ja existe", async () => {
      await authService.register({
        name: "Arthur Teste",
        email: "arthur@example.com",
        password: "Senha@123",
      });

      await expect(
        authService.register({
          name: "Arthur Duplicado",
          email: "arthur@example.com",
          password: "Senha@123",
        }),
      ).rejects.toMatchObject({
        code: "CONFLICT",
        statusCode: 409,
      });
    });
  });

  describe("login", () => {
    it("retorna JWT valido com credenciais corretas", async () => {
      const registered = await authService.register({
        name: "Arthur Teste",
        email: "arthur@example.com",
        password: "Senha@123",
      });

      const login = await authService.login({
        email: "arthur@example.com",
        password: "Senha@123",
      });
      const payload = authService.verifyAuthToken(login.token);

      expect(login.user.id).toBe(registered.user.id);
      expect(payload.id).toBe(registered.user.id);
      expect(payload.email).toBe("arthur@example.com");
    });

    it("lanca UNAUTHORIZED com senha errada", async () => {
      await authService.register({
        name: "Arthur Teste",
        email: "arthur@example.com",
        password: "Senha@123",
      });

      await expect(
        authService.login({
          email: "arthur@example.com",
          password: "senha-errada",
        }),
      ).rejects.toMatchObject({
        code: "UNAUTHORIZED",
        statusCode: 401,
      });
    });

    it("lanca UNAUTHORIZED com e-mail inexistente", async () => {
      await expect(
        authService.login({
          email: "nao-existe@example.com",
          password: "Senha@123",
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });
});
