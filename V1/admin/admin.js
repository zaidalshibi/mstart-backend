const { users, deals, claimedDeals } = require( '../../Database' );

exports.getUsers = async ( req, res ) => {
    const { page } = req.query;
    const limit = 10;
    const offset = ( page - 1 ) * limit;
    await users.findAndCountAll(
        {
            limit,
            offset
        }
    )
        .then( users => {
            res.status( 200 ).json( {
                message: 'Users successfully fetched',
                users,
            } );
        } )
        .catch( error => {
            res.status( 400 ).json( {
                message: 'An error occurred',
                error: error.message,
            } );
        } );
};

exports.getDeals = async ( req, res ) => {
    const { page } = req.query;
    const limit = 10;
    const offset = ( page - 1 ) * limit;
    await deals.findAndCountAll( {
        include: [ 'user' ],
        limit,
        offset
    } )
        .then( deals => {
            res.status( 200 ).json( {
                message: 'Deals successfully fetched',
                deals,
            } );
        } )
        .catch( error => {
            res.status( 400 ).json( {
                message: 'An error occurred',
                error: error.message,
            } );
        } );
};

exports.claimedDeals = async ( req, res ) => {
    const { page } = req.query;
    const limit = 10;
    const offset = ( page - 1 ) * limit;
    await claimedDeals.findAndCountAll( {
        limit,
        offset,
        include: [ 'user']
    } )
        .then( claimedDeals => {
            res.status( 200 ).json( {
                message: 'Claimed deals successfully fetched',
                claimedDeals,
            } );
        } )
        .catch( error => {
            res.status( 400 ).json( {
                message: 'An error occurred',
                error: error.message,
            } );
        } );
};

exports.deleteOneOrMoreUsers = async ( req, res ) => {
    const { ids } = req.body;
    await users.destroy( {
        where: {
            id: ids
        }
    } )
        .then( () => {
            res.status( 200 ).json( {
                message: 'Users successfully deleted',
            } );
        } )
        .catch( error => {
            res.status( 400 ).json( {
                message: 'An error occurred',
                error: error.message,
            } );
        } );
};

exports.updateRole = async ( req, res, next ) => {
    const { role, id } = req.body;
    if ( role && id ) {
        if ( role === "admin" ) {
            await users.findOne( { where: { id } } )
                .then( ( user ) => {
                    if ( user.role !== "admin" ) {
                        user.role = role;
                        user.update( { role } );
                        res.status( 201 ).json( {
                            message: "User successfully updated",
                            id: user.id,
                            username: user.username,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            date_of_birth: user.date_of_birth,
                            gender: user.gender,
                            role: user.role,
                        } )
                            .catch( ( error ) => {
                                res
                                    .status( 400 )
                                    .json( { message: "An error occurred", error: error.message } );
                            } );
                    } else {
                        res.status( 400 ).json( {
                            message: "Role is not admin",
                        } );
                    }
                } )
                .catch( ( error ) => {
                    res
                        .status( 400 )
                        .json( { message: "An error occurred", error: error.message } );
                }
                );
        } else {
            res.status( 400 ).json( {
                message: "Role or id not present",
            } );
        };
    }
};