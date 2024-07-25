import { checkSchema } from 'express-validator';
import Product from '../../models/Product.js';
import { ConflictError } from '../../errors/ConflictError.js';

const rules = checkSchema({
    name:{
        notEmpty: true,
        errorMessage: `Product must have a name!`
    },
    description:{
        notEmpty: true,
        errorMessage: `Product must have a description!`
    },
    stock:{
        isNumeric: true,
        notEmpty: true,
        errorMessage: `Product must have stock (and be a number)!`
    },
    price:{
        isNumeric: true,
        notEmpty: true,
        errorMessage: `Product must have a price (and be a number)!`
    }
}, ['body']);

const handle = async (request, response, next) => {
    try {
        const { name, description, stock, price} = request.body;
        const exists = await Product.findOne({name});
        if(exists){
            throw new ConflictError('That Product already exists');
        }
        const product = await Product.create({
            name,
            description,
            stock,
            price
        });
        response.json(product);
    } catch (error) {
        next(error);
    }
    
};

export default { handle, rules };