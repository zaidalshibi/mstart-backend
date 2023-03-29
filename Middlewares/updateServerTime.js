const {users} = require( '../Database' );
const { Op } = require( 'sequelize' );

const updateServerTime = async ( req, res, next ) => {
    try {
        users.update( {
            Server_DateTime: new Date( Date.now() ).toString(),
            DateTime_UTC: new Date( Date.now() ).toUTCString(),
        },
            {
                where: {
                    id: {
                        [ Op.gt ]: 0
                    }
                }
            }
        ).then( () => {
            next();
        } ).catch( ( error ) => {
            console.log( error );
        });
    }
    catch ( error ) {
        res.status( 500 ).json( error + ' Error in updateServerTime' );
    }
};

module.exports = updateServerTime;