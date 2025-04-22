import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { v4 as uuidv4 } from "uuid";
import { HashPassword } from "../../shared/HashPassword";

export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    // Validate input
    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }
    // Chexk if a user already exists with the same email
    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new Error("User already exits with this email.");

    }
    // Hash the password 
     const hashedPassword = await HashPassword.hash(password)
    // Craete a new user 
    const user = new User(
      uuidv4(), 
      name,
      email,
      hashedPassword
    )
    // Save the user to the repository
    await this.userRepository.save(user);
    // Return the created user
    return user;
}
}