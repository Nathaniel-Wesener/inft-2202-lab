import Product from '../../models/Product.js';

const handle = async (request, response, next) => {
    const headers = {'Content-Type': 'text/plain'}
    const {url} = request;
    
    if (method === 'PUT' && url !== '/') {
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
    } else {
        response.writeHead(400, headers);
        response.end(`Need an id to update a product.`);
    }
};

export default { handle };