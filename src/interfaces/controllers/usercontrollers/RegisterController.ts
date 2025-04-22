import { Request, Response } from "express";

import { UserRepository } from "../../../domain/repositories/UserRepository";
import { RegisterUser } from "../../../application/user/RegisterUser";
import { UserMongoRepository } from "../../../infrastructure/Repositories/UserMongoRepository";


export class RegisterController {
  private RegisterUser: RegisterUser;
  constructor() {
    const userRepository: UserRepository = new UserMongoRepository();
    this.RegisterUser = new RegisterUser(userRepository);
  }
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await this.RegisterUser.execute(name, email, password);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
