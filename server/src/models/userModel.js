import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_EXPIRY, TOKEN_SECRET } from "../config/serverConfig.js";


let profile_imgs_name_list = [
    "Garfield",
    "Tinkerbell",
    "Annie",
    "Loki",
    "Cleo",
    "Angel",
    "Bob",
    "Mia",
    "Coco",
    "Gracie",
    "Bear",
    "Bella",
    "Abby",
    "Harley",
    "Cali",
    "Leo",
    "Luna",
    "Jack",
    "Felix",
    "Kiki",
];

let profile_imgs_collections_list = [
    "notionists-neutral",
    "adventurer-neutral",
    "lorelei-neutral",
    "fun-emoji",
];

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    userAvatar: {
        type: String,
        default: () => {
            return `https://api.dicebear.com/7.x/${profile_imgs_collections_list[
                Math.floor(Math.random() * profile_imgs_collections_list.length)
            ]
                }/svg?seed=${profile_imgs_name_list[
                Math.floor(Math.random() * profile_imgs_name_list.length)
                ]
                }`;
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    room: {
        type: String,
        default: "",
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    channels: [
        {
            type: Schema.Types.ObjectId,
            ref: "Channel",
        },
    ],
    status: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        required: true,
    },
    isAlumniVerified: {
        type: Boolean,
        default: false,
    },
    degree: {
        type: String,
        default: "",
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        TOKEN_SECRET,
        {
            expiresIn: TOKEN_EXPIRY,
        }
    );
};

export const User = model("User", userSchema);