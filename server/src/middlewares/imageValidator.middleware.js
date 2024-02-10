import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from '../config/serverConfig.js'
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

export const imageValidator = asyncHandler(async (req, res, next) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "I have provided you an image, you have to give me response either 'Yes' or 'No' based on the image, that image is contains nudity or not. I will use this response to further process the image or not, so please provide me 'Yes' or 'No' based on the image. Thank you.";

    if (!req.files?.postImage[0]?.path) {
        next()
    }

    const imageParts = [
        fileToGenerativePart(req.files?.postImage[0]?.path, "image/jpeg"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini's Response |", text, "|");

    if (text.trim() === "No") {
        console.log("1")
        next()
    } else {
        console.log("2")
        throw new ApiError(400, "Image contains nudity")
    }
})