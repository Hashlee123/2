import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { jwt_password } from "../config/config";

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        await UserModel.create({ username, password });
        res.json({ message: "User Signed UP" });
    } catch (e) {
        res.status(411).json({ message: " duplicate alert" });
    }
};

export const signin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const existingUser = await UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, jwt_password);
        res.json({ token });
    } else {
        res.status(403).json({ message: " incorrect cred" });
    }
};
