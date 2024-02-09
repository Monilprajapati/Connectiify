import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    message: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export const Message = model('Message', messageSchema);

