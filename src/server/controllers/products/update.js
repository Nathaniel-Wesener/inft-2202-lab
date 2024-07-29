import Product from '../../models/Product.js';
import { checkSchema } from 'express-validator';

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
    const headers = {'Content-Type': 'text/plain'}
    const {url} = request;
    

        try {
            const { name, description, stock, price } = request.body;
            const product = await Product.updateOne({_id: request.params.productId}, {
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