import app from "./app.js";
import { PORT,PORT_REDIS,DB_HOST } from './config.js'
import sequelize from "./database/database.js";

import { createClient } from 'redis';

const client = createClient({
    //url: 'redis://myredis.pohiql.ng.0001.use1.cache.amazonaws.com:6379',
    //host: 'myredis.pohiql.ng.0001.use1.cache.amazonaws.com',
    host: DB_HOST,
    port: PORT_REDIS
})

//client.on('error',(err)=> console.log(err.message))
const startup = async()=>{

    try {
        // await sequelize.authenticate();
        // console.log('Connection has been established successfully.');
        await client.connect()
        app.listen(PORT)
        console.log('Server running on port', PORT);
    } catch (error) {
        console.error('Unable to connect to the database:', error);        
    }

}
startup()

export {client}