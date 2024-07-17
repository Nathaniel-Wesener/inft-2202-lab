import {model, Schema} from 'mongoose';

const fields = {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
};

const schema = new Schema(fields);

export default model('Product', schema);
