import {DataTypes} from "sequelize";
import sequelize from "../database/database.js";

export const Product_Image = sequelize.define('product_images',{
    product_image_id:{
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    product_id:{
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true
    },
    type_image_id:{
        type: DataTypes.SMALLINT.UNSIGNED,
        primaryKey: true
    },
    description:{
        type: DataTypes.STRING(155)
    },
    url:{
        type: DataTypes.STRING(155)
    },
    orden:{
        type: DataTypes.TINYINT.UNSIGNED
    },
    },{
        timestamps : true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
});
