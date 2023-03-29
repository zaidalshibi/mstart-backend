const { changeUserStatus, addDeal, getDeals, claimDeal, changeDealStatus, profile } = require( "./user" );
const express = require( "express" );
const checkOwner = require( "../../Middlewares/checkOwner" );
const router = express.Router();


router.route( "/changeUserStatus" ).put( changeUserStatus );
router.route( "/addDeal" ).post( addDeal );
router.route( "/getDeals" ).get( getDeals );
router.route( "/claimDeal" ).post( claimDeal );
router.route( "/changeDealStatus" ).put( checkOwner, changeDealStatus );
router.route( "/profile/:id" ).get( profile );

module.exports = router;