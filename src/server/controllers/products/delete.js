import Product from '../../models/Product.js';

const handle = async (request, response, next) => {
    const {url} = request;
    
    if (url !== '/') {
        try {
            const product = await Product.deleteOne({_id: request.params.productId});
            response.json(product);
        } catch (error) {
            next(error);
        }
    } else {
        response.writeHead(400, headers);
        response.end(`Need an id to delete a product.`);
    }
};

export default {handle};