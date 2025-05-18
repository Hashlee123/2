import { Request, Response } from "express";

export const shareBrain = async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;
    const shareLink = Math.random().toString(36).substring(2, 10);
    res.json({ shareLink });
};

export const accessBrain = async (req: Request, res: Response) => {
    const { shareLink } = req.params;
    res.json({ message: `Accessed shared brain with link: ${shareLink}` });
};
