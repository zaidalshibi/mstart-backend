const { deals } = require( '../Database' );
module.exports = async ( req, res, next ) => {
    const { id } = req.body;
    await deals.findOne( { where: { id: id } } ).then( ( deal ) => {
        if ( deal.user_id === req.user_id ) {
            next();
        } else {
            res.status( 401 ).json( 'Unauthorized' );
        }
    }
    ).catch( ( error ) => {
        res.status( 400 ).json( error );
    } );
};