import { pooldb } from "../db.js";
import { client } from "../index.js";
import { Product } from "../models/Product.js"
import { Op } from "sequelize";
import { Product_Image } from "../models/Product_Image.js";

const getProducts = async (req,res)=> {
    try {
        const page =  parseInt(req.query.page) || 1;
        const limit =  parseInt(req.query.limit) || 10;
        const offset = page ? (page - 1) * limit : 1;
        const search = req.query.search || "";
        const search_query = search.trim().split(" ");
        const search_w1 = search_query[0];
        const search_w2 = search_query[1];
        const search_w3 = search_query[2];

        const {count,rows} = await Product.findAndCountAll({
            attributes: ['slug', 'name','description'],
            include: {
                model: Product_Image,
                as: 'product_images',
                attributes: ['url'],
                where: {
                    type_image_id: 2
                }
            },
            where:{
                [Op.or]: [
                    {
                        keywords: {
                        [Op.like]: '%'+search_w1+'%'
                      }
                    },
                    {
                        keywords: {
                        [Op.like]: '%'+search_w2+'%'
                      }
                    },
                    {
                        keywords: {
                        [Op.like]: '%'+search_w3+'%'
                      }
                    }
                  ]
            },
            order:[
                ['product_id', 'ASC']
            ],
            offset: offset,
            limit: limit
        });

        const totalPages = Math.ceil(count / limit);

        if(page > totalPages){
            return res.status(404).json({total: 0 , message : 'Products not found'})
        }else{
            res.json({data : rows,
                current_page: page,
                per_page: limit,
                total: count,
                total_pages: totalPages}); 
        }
        
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong',
            error: error
        })
    }
}

// const getProducts = async (req,res)=> {
//     try {
//         const [rows] = await pooldb.query('SELECT  p.slug,prodimg.url FROM products p INNER JOIN product_images prodimg ON(p.product_id  = prodimg.product_id) WHERE prodimg.type_image_id = 2 ORDER BY p.product_id,prodimg.orden ASC')
//         res.json(rows)
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Something goes wrong',
//             error: error
//         })
//     }
// }

const getProduct = async (req,res)=> {
    try {
        const productFromCache = await client.get(`product-${req.params.slug}`)
        if(productFromCache){
            return res.send(JSON.parse(productFromCache))
        }
        const [rows] = await pooldb.query('SELECT * FROM products WHERE slug = ?', [req.params.slug])
        if(rows.length<=0) return res.status(404).json({message : 'Product not found'})
        await client.set(`product-${req.params.slug}`,JSON.stringify(rows[0]))
        res.json(rows[0])  
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'+error
        })
    }
}

export {getProducts, getProduct}