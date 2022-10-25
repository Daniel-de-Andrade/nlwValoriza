import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // Verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // Gerar token
    const token = sign(
      {
        email: user.email,
      },
      "6f8f6adf75b9f443e58d9d8f461e0f23",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;

  }
}

export { AuthenticateUserService };
