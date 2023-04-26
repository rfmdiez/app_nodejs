import { pooldb } from "../db.js";
import { client } from "../index.js";

const getProductImages = async (req,res)=> {
    try {
        const productImagesFromCache = await client.get(`productImages-${req.params.productslug}`)
        if(productImagesFromCache){
            return res.send(JSON.parse(productImagesFromCache))
        }
        const [rows] = await pooldb.query(`SELECT p.slug,prodimg.url FROM products p INNER JOIN product_images prodimg ON(p.product_id  = prodimg.product_id) WHERE p.slug = ? ORDER BY prodimg.orden ASC` , [req.params.productslug])
        if(rows.length<=0) return res.status(404).json({message : 'Apps for product not found'})
        await client.set(`productImages-${req.params.productslug}`,JSON.stringify(rows))
        res.json(rows)  
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'+error
        })
    }
}

export {getProductImages}