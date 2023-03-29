'use strict';

const jwt = require( 'jsonwebtoken' );

const Server_DateTime = new Date( Date.now() ).toString();
const DateTime_UTC = new Date( Date.now() ).toUTCString();
const jwtSecret =
    "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";


module.exports = ( sequelize, DataTypes ) => {
    const users = sequelize.define( 'users', {
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
        Last_Login_DateTime_UTC: {
            type: DataTypes.STRING,
            defaultValue: DateTime_UTC
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'active'
        },
        gender: {
            type: DataTypes.STRING,
            defaultValue: 'other'
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'https://unsplash.com/photos/WNoLnJo7tS8'
        },
        token: {
            type: DataTypes.VIRTUAL,
            get () {
                return jwt.sign(
                    { id: this.id, username: this.username, role: this.role },
                    jwtSecret,
                    {
                        expiresIn: 3 * 60 * 60,
                    }
                );
            },
            set ( value ) {
                throw new Error( 'Do not try to set the `token` value!' );
            }
        }
    } );
    return users;
};