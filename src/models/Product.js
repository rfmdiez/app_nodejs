import {DataTypes} from "sequelize";
import sequelize from "../database/database.js";
import { Product_Image } from "./Product_Image.js"

export const Product = sequelize.define('products',{
    product_id:{
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    company_id:{
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true
    },
    slug:{
        type: DataTypes.STRING(45)
    },
    name:{
        type: DataTypes.STRING(155)
    },
    description:{
        type: DataTypes.TEXT
    },
    keywords:{
        type: DataTypes.TEXT
    },
    },{
        timestamps : true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
});

Product.hasMany(Product_Image, {foreignKey: 'product_id' });
Product_Image.belongsTo(Product, {foreignKey: 'product_id' });