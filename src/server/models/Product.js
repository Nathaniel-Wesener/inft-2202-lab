import {model, Schema} from 'mongoose';

const fields = {
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    legs: {
        type: Number,
        required: true
    },
    eyes: {
        type: Number,
        required: true
    },
    sound: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
};

const schema = new Schema(fields);

export default model('Product', schema);
