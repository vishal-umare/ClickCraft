import { Router } from "express";
import {protect } from "../middlewares/auth.js";
import { deleteThumbnail, generateThumbnail } from "../controllers/ThumbnailController.js";

const ThumbnailRouter = Router()

ThumbnailRouter.post("/generate", protect, generateThumbnail)

ThumbnailRouter.delete("/delete/:id", protect, deleteThumbnail)

export default ThumbnailRouter;
