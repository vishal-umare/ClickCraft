import { Request, Response } from "express";

//  Controller for getting all users

import { Thumbnail } from "../models/Thumbnails.js";

export const getUsersThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session ;

        const thumbnail = await Thumbnail.find({ userId}).sort({createdAt : -1})

        res.json({thumbnail})

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message : error.message });
    }
}

// Controller to get single thumbnail of user

export const getThumbnailById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { thumbnailId} = req.params ;
        
        const thumbnail = await Thumbnail.findOne({ userId, _id: thumbnailId})

        res.json({thumbnail})
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message : error.message})
    }
}