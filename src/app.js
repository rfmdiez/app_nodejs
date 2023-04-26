import express from "express"

import productsRoutes from "./routes/products.routes.js";
import productImagesRoutes from "./routes/product_images.routes.js";
import productAppsRoutes from "./routes/product_apps.routes.js";

const app = express()

app.use(express.json())

app.use('/api/v1',productsRoutes)
app.use('/api/v1',productImagesRoutes)
app.use('/api/v1',productAppsRoutes)

app.use((req,res,next)=>{
    res.status(404).json({
        message : 'endpoint not found'
    })
})

export default app