import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber  o token
  const authToken = request.headers.authorization;

  // Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  // Validar se o token é válido
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "6f8f6adf75b9f443e58d9d8f461e0f23"
    ) as IPayload;
    
    // Recuperar informações do usuário
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
