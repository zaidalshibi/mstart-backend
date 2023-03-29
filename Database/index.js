'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const usersModel = require( './users.model' );
const dealsModel = require( './deals.model' );
const claimedDealsModel = require( './claimedDeals.model' );

require( 'dotenv' ).config();

const DATABASE_URL = process.env.DATABASE_URL;

const sequelizeOption = {
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
};

const sequelize = new Sequelize( DATABASE_URL, sequelizeOption );

const users = usersModel( sequelize, DataTypes );
const deals = dealsModel( sequelize, DataTypes );
const claimedDeals = claimedDealsModel( sequelize, DataTypes );

users.hasMany( claimedDeals, { foreignKey: 'user_id' } );
claimedDeals.belongsTo( users, { foreignKey: 'user_id' } );

users.hasMany( deals, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    as: 'deals'
} );
deals.belongsTo( users, {
    foreignKey: 'user_id',
    as: 'user'
} );

deals.hasOne( claimedDeals, {
    foreignKey: 'deal_id',
    onDelete: 'CASCADE',
} );
claimedDeals.belongsTo( deals, { foreignKey: 'deal_id' } );

users.hasMany( claimedDeals, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
} );
claimedDeals.belongsTo( users, {
    foreignKey: 'user_id',
} );



module.exports = {
    db: sequelize,
    users,
    deals,
    claimedDeals
};