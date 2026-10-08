import { Router } from "express";
import { getThumbnailById, getUsersThumbnail } from "../controllers/UserController.js";

const UserRouter = Router();

UserRouter.get("/thumbnails", getUsersThumbnail)

UserRouter.get("/thumbnail/:id", getThumbnailById)

export default UserRouter