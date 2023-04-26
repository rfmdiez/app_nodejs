import Sequelize from "sequelize";

const sequelize =  new Sequelize('appdb','root','oOhP0#+j',{
    host: 'localhost',
    dialect : 'mysql'
})

export default sequelize;