import { pooldb } from "../db.js";
import { client } from "../index.js";

const getProductApps = async (req,res)=> {
    try {
        const productAppsFromCache = await client.get(`productApps-${req.params.productslug}`)
        if(productAppsFromCache){
            return res.send(JSON.parse(productAppsFromCache))
        }
        const [rows] = await pooldb.query('SELECT a.name,ai.url,ca.info FROM products p INNER JOIN companies c ON(p.company_id = c.company_id) INNER JOIN company_apps ca ON(c.company_id = ca.company_id) INNER JOIN apps a  ON(a.app_id = ca.app_id) INNER JOIN app_images ai ON(a.app_id = ai.app_id) WHERE p.slug = ?', [req.params.productslug])
        if(rows.length<=0) return res.status(404).json({message : 'Apps for product not found'})
        await client.set(`productApps-${req.params.productslug}`,JSON.stringify(rows))
        res.json(rows)  
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'+error
        })
    }
}

export {getProductApps}