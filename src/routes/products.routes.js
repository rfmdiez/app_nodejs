import { Router } from "express"
import { getProducts, getProduct } from "../controllers/products.controller.js";

const router = Router()

router.get('/products', getProducts)

router.get('/products/:slug', getProduct)

// router.post('/employees', createEmployee )

// router.patch('/employees/:id', updateEmployee  )

// router.delete('/employees/:id', deleteEmployee )

export default router