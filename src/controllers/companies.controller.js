import { pool } from "../db.js";
import { client } from "../index.js";

const getCompany = async (req,res)=> {
    try {
        const companyFromCache = await client.get(`company${req.params.id}`)
        if(companyFromCache){
            return res.send(JSON.parse(companyFromCache))
        }
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
        if(rows.length<=0) return res.status(404).json({message : 'Employee not found'})
        await client.set(`employee${req.params.id}`,JSON.stringify(rows[0]))
        res.json(rows[0])
        
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'+error
        })
        
    }
    
}

export {getCompany}