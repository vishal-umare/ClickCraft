import mongoose from "mongoose"

export interface IThumbnail extends mongoose.Document {
    userId: string;
    title: string;
    description?: string;
    style: "Bold & Graphic" | "Tech/Futuristic" | "Minimalist" | "Photorealistic" | "Illustrated";
    aspect_ratio?: "16:9" | "9:16";
    colorScheme?:
    | "Electric Blue"
    | "Midnight"
    | "Sunset"
    | "Neon Green"
    | "Purple Dream"
    | "Ocean"
    | "Warm Earth"
    | "Cyber Neon";
    text_overlay?: boolean;
    image_url?: string;
    prompt_used?: string;
    user_prompt?: string;
    isGenerating?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}   

export const ThumbnailSchema = new mongoose.Schema<IThumbnail>({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    style: {
        type: String,
        enum: ["Bold & Graphic", "Tech/Futuristic", "Minimalist", "Photorealistic", "Illustrated"],
        required: true
    },
    aspect_ratio: {
        type: String,
        enum: ["16:9", "9:16"],
        default: "16:9"
    },
    colorScheme: {
        type: String,
        enum: ["Electric Blue", "Midnight", "Sunset", "Neon Green", "Purple Dream", "Ocean", "Warm Earth", "Cyber Neon"],
    },
    text_overlay: {
        type: Boolean,
        default: false
    },
    image_url: {
        type: String,
        default: ""
    },
    prompt_used: {
        type: String,
    },
    user_prompt: {
        type: String,
    },
    isGenerating: {
        type: Boolean,
        default: true 
    }
}, {timestamps: true})

export const Thumbnail = mongoose.model<IThumbnail>("Thumbnail", ThumbnailSchema);