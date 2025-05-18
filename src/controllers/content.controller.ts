import { Request, Response } from "express";
import { ContentModel } from "../models/content.model";

export const createContent = async (req: Request, res: Response) => {
    const { link, type } = req.body;
    //@ts-ignore
    const userId = req.userId;
    await ContentModel.create({ link, type, userId, tags: [] });
    res.json({ message: "content created" });
};

export const getContents = async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({ userId }).populate("userId", "username");
    res.json({ content });
};

export const deleteContent = async (req: Request, res: Response) => {
    const { contentId } = req.body;
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = await ContentModel.findOneAndDelete({ _id: contentId, userId });
        if (!content) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }
        res.json({ message: "Content deleted" });
    } catch (e) {
        res.status(500).json({ message: "Error deleting content" });
    }
};
