import express from 'express';
import ProductCreateController from '../controllers/products/create.js';
import ProductRetrieveController from '../controllers/products/retrieve.js';
import ProductDeleteController from '../controllers/products/delete.js';
import ProductUpdateController from '../controllers/products/update.js';
import ProductSearchController from '../controllers/products/search.js';

export const productRouter = express.Router();
productRouter.get('/', ProductSearchController.handle);

productRouter.post('/', ProductCreateController.handle);

productRouter.delete('/:productId', ProductDeleteController.handle);

productRouter.put('/:productId', ProductUpdateController.handle);
productRouter.get('/:productId', ProductRetrieveController.handle);