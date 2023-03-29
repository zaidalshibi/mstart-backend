const { getUsers, getDeals, claimedDeals, deleteOneOrMoreUsers, updateRole } = require( './admin' );


const express = require( "express" );
const router = express.Router();


router.route( '/users' ).get( getUsers );
router.route( '/deals' ).get( getDeals );
router.route( '/claimedDeals' ).get( claimedDeals );
router.route( '/deleteUser' ).post( deleteOneOrMoreUsers );
router.route( '/updateRole' ).put( updateRole );

module.exports = router;