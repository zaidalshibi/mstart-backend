'use strict';

const Server_DateTime = new Date( Date.now() ).toString();
const DateTime_UTC = new Date( Date.now() ).toUTCString();

module.exports = ( sequelize, DataTypes ) => {
    const claimedDeals = sequelize.define( 'claimedDeals', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deal_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Server_DateTime: {
            type: DataTypes.STRING,
            defaultValue: Server_DateTime
        },
        DateTime_UTC: {
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
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'USD'
        }
    } );
    return claimedDeals;
};

