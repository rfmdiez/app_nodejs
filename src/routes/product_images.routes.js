import { Router } from "express"
import { getProductImages } from "../controllers/product_images.controller.js";

const router = Router()

router.get('/product-images/:productslug', getProductImages)

export default router