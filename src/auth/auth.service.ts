import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

@Injectable()
export class AuthService {
  constructor(@InjectModel("User") private readonly userModel: Model<IUser>) {}

  public async registerUser(user: IUser): Promise<boolean> {
    const result = await this.userModel.create(user);
    return result ? true : false;
  }

  //   login service
  public async loginUser(user: { email: string }) {
    const result = await this.userModel.findOne({ email: user.email });
    return result;
  }
}
