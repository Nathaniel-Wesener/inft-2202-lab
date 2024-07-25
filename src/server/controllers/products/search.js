import Product from '../../models/Product.js';
import { checkSchema } from 'express-validator';


const rules = checkSchema({
    page: {
        isNumeric: true,
        errorMessage: `"page" must be a number`
    },
    perPage: {
        isNumeric: true,
        errorMessage: `"perPage" must be a number`
    }
}, ['query']);

const handle = async(request, response, next) => {
    
    try {
        const {page = 1, perPage = 5} = request.query;
        const where = {};
        const fields = {};
        const options = {
            skip: (page - 1) * perPage,
            limit: perPage,
            sort: {
                createdAt: 1
            }
        };

        const count = await Product.countDocuments(where);
        const pages = Math.ceil(count/perPage);
        const pagination = {
            page: parseInt(page),
            perPage: parseInt(perPage),
            count,
            pages
        }

        const records = await Product.find(where, fields, options);
        response.json({ pagination, records });

    } catch (error) {
        next(error);
    }
};

export default { handle, rules };