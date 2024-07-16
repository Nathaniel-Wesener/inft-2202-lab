import express from 'express';
import { productRouter } from './products.js';



export const router = express.Router();
router.use('/api/products', productRouter);
