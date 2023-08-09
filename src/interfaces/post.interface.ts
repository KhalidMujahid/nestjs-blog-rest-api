import { IUser } from "./user.interface";

export interface IPost {
  author: IUser;
  title: string;
  photo: string;
  tags: string[];
}
