import bcrypt from "bcrypt";
import mongoose, { Document, Model, Types } from "mongoose";
import { IUserDoc } from "./user.js";

interface IAuthentication {
  secret: string;
  user: IUserDoc["_id"];
}

interface IAuthenticationDoc extends IAuthentication, Document<Types.ObjectId> {
  verifyPassword(password: string): boolean;
  hashAndSetPassword(password: string): void;
}

export type IAuthenticationModel = Model<IAuthenticationDoc>;

const AuthenticationSchema = new mongoose.Schema<
  IAuthenticationDoc,
  IAuthenticationModel
>({
  secret: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
});

AuthenticationSchema.methods.verifyPassword = function (password: string) {
  return bcrypt.compare(password, this.secret);
};

AuthenticationSchema.methods.hashAndSetPassword = async function (
  password: string
) {
  this.set("secret", await bcrypt.hash(password, 10));
};

export const Authentication = mongoose.model<
  IAuthenticationDoc,
  IAuthenticationModel
>("authentications", AuthenticationSchema, "authentications");
