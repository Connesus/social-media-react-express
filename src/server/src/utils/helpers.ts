import {ErrorRequestHandler, RequestHandler} from "express";
import mongoose from "mongoose";


export const use = (fn: RequestHandler): RequestHandler => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

export const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  console.error(err.stack)
  return res.status(500).json({error: true, message: err.message})
}

export const parseIdStr = (id: unknown) => id ? new mongoose.Types.ObjectId(String(id).trim()) : undefined;
