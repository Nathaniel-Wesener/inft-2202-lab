import express from 'express';
import ProductCreateController from '../controllers/products/create.js';
import ProductRetrieveController from '../controllers/products/retrieve.js';
import ProductDeleteController from '../controllers/products/delete.js';
import ProductUpdateController from '../controllers/products/update.js';
import ProductSearchController from '../controllers/products/search.js';
import { CheckValidation } from '../middleware/validation.js';

export const productRouter = express.Router();
productRouter.get('/', CheckValidation(ProductSearchController.rules), ProductSearchController.handle);

productRouter.post('/', CheckValidation(ProductCreateController.rules), ProductCreateController.handle);

productRouter.delete('/:productId', ProductDeleteController.handle);

productRouter.put('/:productId', CheckValidation(ProductUpdateController.rules), ProductUpdateController.handle);
productRouter.get('/:productId', ProductRetrieveController.handle);