'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const dotenv = require( 'dotenv' );
const updateServerTime = require( './Middlewares/updateServerTime' );
const { userAuth, adminAuth } = require( './Middlewares/auth' );

// Load environment variables from .env file
dotenv.config();

// App
const app = express();

// Global Middleware
app.use( cors() );
app.use( express.json() );
app.use(updateServerTime);
app.use("/api/auth", require("./Auth/route"));
app.use("/api/admin", adminAuth, require("./V1/admin/route"));
app.use("/api/user", userAuth , require("./V1/user/route"));

// Home Route
app.get( '/', ( req, res ) => {
    res.status( 200 ).send( 'Hello World' );
} );

// Catchalls
app.use( '*', ( req, res ) => {
    res.status( 404 ).send( 'Not Found' );
} );

// Export the server start function
function start ( port ) {
    app.listen( port, () => console.log( `Server up on ${port}` ) );
}

module.exports = {
    app,
    start
};