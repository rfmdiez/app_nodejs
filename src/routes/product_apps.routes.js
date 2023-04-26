import { Router } from "express"
import { getProductApps } from "../controllers/product_apps.controller.js";

const router = Router()

router.get('/product-apps/:productslug', getProductApps)

export default router