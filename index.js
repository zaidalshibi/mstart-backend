'use strict';

const { start } = require( './server' );
const { db } = require( './Database' );


db.sync().then( () => {
    start( process.env.PORT || 3000 );
} );