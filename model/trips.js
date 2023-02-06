const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');

class Trip extends Model {}

Trip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        trip_budget: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            unique: false,
        },
        traveller_amount:{

        },
        traveller_id: {
            type: DataTypes.INTEGER,
            unique: false,
            references: {
                model: 'Traveller.id',
                key: 'id'
            }
        },
        location_id: {
            type: DataTypes.INTEGER,
            unique: false,
            references: {
                model: 'Location.id',
                key: 'id'
            },
        }
    }
)