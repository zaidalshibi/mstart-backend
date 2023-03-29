const { register, login, uploadAvatar } = require( "./auth" );
const { uploadImage, upload } = require( "../Upload/upload.controller" );

const express = require( "express" );
const router = express.Router();


router.route( "/register" ).post( register );
router.route( "/login" ).post( login );
router.route( "/upload" ).post( upload.single( "avatar" ), uploadImage, uploadAvatar );

module.exports = router;