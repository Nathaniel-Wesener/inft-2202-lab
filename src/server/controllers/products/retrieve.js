import Product from '../../models/Product.js';
import { NotFoundError } from '../../errors/NotFoundError.js';

const handle = async(request, response, next) => {

    try {
        const product = await Product.findById({_id: request.params.productId});
        if(!product){
            throw new NotFoundError('Could not find that product');
        }
        response.json(product);
    } catch (error) {
        next(error);
    }
};

export default {handle};