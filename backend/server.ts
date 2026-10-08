import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import { connectToMongoDB } from "./configs/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import AuthRouter from "./routes/AuthRoutes.js";
import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

declare module "express-session" {
  interface SessionData {
    userId: string,
    isLoggedIn: boolean
  }
}

await connectToMongoDB()

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7  //Expires in 7 Days
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI as string,
        collectionName: "sessions"
    })
}))

app.use(express.json());


const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});



// Routes
app.use("/api/auth", AuthRouter);

app.use("/api/thumbnails", ThumbnailRouter);

app.use("/api/users", UserRouter)


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});