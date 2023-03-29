'use strict';

const Server_DateTime = new Date( Date.now() ).toString();
const DateTime_UTC = new Date( Date.now() ).toUTCString();

module.exports = ( sequelize, DataTypes ) => {
    const deals = sequelize.define( 'deals', {
        Server_DateTime: {
            type: DataTypes.STRING,
            defaultValue: Server_DateTime
        },
        DateTime_UTC: {
            type: DataTypes.STRING,
            defaultValue: DateTime_UTC
        },
        Update_DateTime_UTC: {
            type: DataTypes.STRING,
            defaultValue: DateTime_UTC
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'active'
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'USD'
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    } );
    return deals;
};