import Product from '../../models/Product.js';

const handle = async(request, response, next) => {

    try {
        const product = await Product.findById({_id: request.params.productIdId});
        response.json(product);
    } catch (error) {
        next(error);
    }
};

export default {handle};