const { Model, Datatypes } = require('sequelize')
const sequelize = require('../config/connection')

class Traveller extends Model { }

// creates a table for traveller with classifications
Traveller.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },

    },
    {
        sequelize,
        timestamps: false,
        modelName: 'traveller',
    }
);

// exporting Traveller for reference for other files
module.exports = Traveller;