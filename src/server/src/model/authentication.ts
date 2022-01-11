import bcrypt from 'bcrypt';
import mongoose, {Document, Model, Types} from "mongoose";
import {IUserDoc} from "./user.js";



interface IAuthentication {
  secret: string;
  user: IUserDoc['_id']
}

interface IAuthenticationDoc extends IAuthentication, Document<Types.ObjectId> {
  verifyPassword(password: string): boolean;
}

export interface IAuthenticationModel extends Model<IAuthenticationDoc> {}

const AuthenticationSchema = new mongoose.Schema<IAuthenticationDoc, IAuthenticationModel>({
  secret: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users',
    required: true
  }
});

AuthenticationSchema.methods.verifyPassword = function(password:string) {
  return bcrypt.compareSync(password, this.secret);
}

AuthenticationSchema.methods.hashAndSetPassword = function(password:string) {
  this.set('secret', bcrypt.hashSync(password, 10));
}

export const Authentication = mongoose.model<IAuthenticationDoc, IAuthenticationModel>('authentications', AuthenticationSchema, 'authentications');
