
import { ObjectId } from 'mongoose';
import { IUser } from './../model/user';
import {SessionUserT} from "@shared/types";
import {ErrorRequestHandler, RequestHandler} from "express";

export const sessionizeUser: (user: IUser) => SessionUserT = ({ id, username }) => ({ id, username });

export const use = (fn: RequestHandler): RequestHandler => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

export const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  return res.status(500).json({error: true, message: err.message})
}
