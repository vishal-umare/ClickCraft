import { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

// Controller for user registration

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        //find user by email
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        //Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Saved the user data into DB
        await newUser.save();

        // setting user data in sessions
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id.toString();

        // Send success response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// Controller for logged in user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        // check user exists in the db
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({message: "Invalid email or password"});
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"})
        }

        // Setting user data in sessions
        req.session.isLoggedIn = true;
        req.session.userId = user._id.toString()

        // Send success response
        return res.status(200).json({
            message: "Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Controller for logout
export const logoutUser = async (req: Request, res: Response) => {
    req.session.destroy((error : any) => {
        if(error){
            return res.status(500).json({message: "Failed to logout"})
        }
        res.status(200).json({message: "Logout successfully"})
    })
}

// Controller for user verify

export const verifyUser = async (req: Request, res: Response) => {
    try{
        const { userId } = req.session

        const user = await User.findById(userId)
        if (!user){
            return res.status(404).json({message: "User not found"})
        }

        return res.json({user})

    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}