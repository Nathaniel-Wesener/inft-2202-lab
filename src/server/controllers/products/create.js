import Product from '../../models/Product.js';

const handle = async (request, response, next) => {
    try {
        const { name, description, stock, price} = request.body;
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

export default {handle};