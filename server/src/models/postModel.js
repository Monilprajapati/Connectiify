import { Schema, model } from "mongoose";

const postSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    tag: [String],
    image: String,
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    room: String, //dought
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

export const Post = model('Post', postSchema);