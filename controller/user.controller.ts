import { NextFunction, Request, Response } from "express";
import { Collection } from "mongodb";

export const userController = (user: Collection) => {
  const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await user.insertOne({ name, email, password });
      res.status(201).json({
        success: true,
        message: "User created successfully",
        payload: newUser,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to create user",
        error: error.message,
      });
      next(error);
    }
  };

  const findAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await user.find().toArray();
      if (!users) {
        return res.status(404).json({
          success: true,
          message: "Not found User",
        });
      }
      res.status(201).json({
        success: true,
        message: "Return all user",
        payload: users,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to create user",
        error: error.message,
      });
      next(error);
    }
  };

  return {
    createUser,
    findAllUsers,
  };
};
