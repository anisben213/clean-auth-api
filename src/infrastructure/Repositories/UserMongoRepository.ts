import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../Models/UserModel";
import { IUser } from "../Models/UserModel";

export class UserMongoRepository implements UserRepository {
  public async save(user: User): Promise<void> {
    const userMongo = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await userMongo.save();
  }
  public async findById(id: string): Promise<User | null> {
      const userDoc = await UserModel.findById(id).exec();
      if (!userDoc)  return null;
      return this.toDomain(userDoc)    
  }
  public async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email}).exec();
    if(!userDoc) return null;
    return this.toDomain(userDoc)
  }
  public async delete(id:string): Promise<void> {
    const userDoc = await UserModel.findByIdAndDelete(id).exec();
  }
  public async update(user: User): Promise<void> {
    const userDoc = await UserModel.findById(user.id).exec();
    if (!userDoc) throw new Error("User not found");
    userDoc.name = user.name;
    userDoc.email = user.email;
    userDoc.password = user.password;
    await userDoc.save();
  }
  // Convert the MongoDB document to a domain entity
  private toDomain(userDoc: IUser): User {
    return new User(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.password
    );
  }
}