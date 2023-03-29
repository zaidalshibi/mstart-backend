const { users, deals, claimedDeals } = require( '../../Database' );

exports.changeUserStatus = async ( req, res ) => {
    const { id, status } = req.body;
    console.log( id, status );
    if ( id && status ) {
        if ( status == 'active' || status == 'in Active' || status == 'deleted' || status == 'expired' ) {
            await users.findOne( { where: { id } } )
                .then( user => {
                    if ( user && user.id === req.user_id ) {
                        user.status = status;
                        user.update( {
                            status,
                            Update_DateTime_UTC: new Date( Date.now() ).toUTCString()
                        } );
                        res.status( 201 ).json( {
                            message: 'User successfully updated',
                        } );
                    } else {
                        res.status( 400 ).json( {
                            message: 'User not found',
                        } );
                    }
                } )
                .catch( error => {
                    res.status( 400 ).json( {
                        message: 'An error occurred',
                        error: error.message,
                    } );
                } );
        } else {
            res.status( 400 ).json( {
                message: 'Id and status not present',
            } );
        }
    } else {
        res.status( 400 ).json( {
            message: 'status not listed in the list',
        } );
    };
};

exports.addDeal = async ( req, res ) => {
    const { name, description, amount, currency, user_id } = req.body;
    if ( name && description && amount && currency ) {
        await deals.create( {
            name,
            description,
            amount,
            currency,
            user_id
        } )
            .then( deal => {
                res.status( 201 ).json( {
                    message: 'Deal successfully created',
                    id: deal.id,
                    Server_DateTime: deal.Server_DateTime,
                    DateTime_UTC: deal.DateTime_UTC,
                    Update_DateTime_UTC: deal.Update_DateTime_UTC,
                    name: deal.name,
                    description: deal.description,
                    amount: deal.amount,
                    currency: deal.currency,
                } );
            } )
            .catch( error => {
                res.status( 400 ).json( {
                    message: 'An error occurred',
                    error: error.message,
                } );
            } );
    } else {
        res.status( 400 ).json( {
            message: 'Name, description, amount and currency not present',
        } );
    }
};

exports.getDeals = async ( req, res ) => {
    await deals.findAll(
        {
            where: {
                status: 'active'
            }
        }
    )
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

exports.claimDeal = async ( req, res ) => {
    const { id, userId } = req.body;
    if ( id && userId ) {
        await deals.update( {
            status: 'in Active',
        }, {
            where: {
                id,
            }
        } )
            .then( async () => {
                await deals.findOne( { where: { id } } )
                    .then( deal => {
                        if ( deal ) {
                            claimedDeals.create( {
                                user_id: userId,
                                deal_id: id,
                                name: deal.name,
                                description: deal.description,
                                amount: deal.amount,
                                currency: deal.currency,
                            } )
                                .then( claimedDeal => {
                                    res.status( 201 ).json( {
                                        message: 'Deal successfully claimed',
                                        id: claimedDeal.id,
                                        Server_DateTime: claimedDeal.Server_DateTime,
                                        DateTime_UTC: claimedDeal.DateTime_UTC,
                                        user_id: claimedDeal.user_id,
                                        deal_id: claimedDeal.deal_id,
                                        name: claimedDeal.name,
                                        description: claimedDeal.description,
                                        amount: claimedDeal.amount,
                                        currency: claimedDeal.currency,
                                    } );
                                } )
                                .catch( error => {
                                    res.status( 400 ).json( {
                                        message: 'An error occurred',
                                        error: error.message,
                                    } );
                                } );
                        } else {
                            res.status( 400 ).json( {
                                message: 'Deal not found',
                            } );
                        }
                    } )
                    .catch( error => {
                        res.status( 400 ).json( {
                            message: 'An error occurred',
                            error: error.message,
                        } );
                    } );
            } )
            .catch( error => {
                res.status( 400 ).json( {
                    message: 'An error occurred',
                    error: error.message,
                } );
            } );
    } else {
        res.status( 400 ).json( {
            message: 'Id and userId not present',
        } );
    }
};



exports.changeDealStatus = async ( req, res ) => {
    const { id, status } = req.body;
    console.log( id, status );
    if ( id && status ) {
        if ( status == 'active' || status == 'In Active' || status == 'deleted' || status == 'expired' ) {
            await deals.findOne( { where: { id } } )
                .then( deal => {
                    if ( deal ) {
                        deal.status = status;
                        deal.update( {
                            status,
                            Update_DateTime_UTC: new Date( Date.now() ).toUTCString()
                        } );
                        res.status( 201 ).json( {
                            message: 'Deal successfully updated',
                        } );
                    } else {
                        res.status( 400 ).json( {
                            message: 'Deal not found',
                        } );
                    }
                } )
                .catch( error => {
                    res.status( 400 ).json( {
                        message: 'An error occurred',
                        error: error.message,
                    } );
                } );
        } else {
            res.status( 400 ).json( {
                message: 'Id and status not present',
            } );
        }
    } else {
        res.status( 400 ).json( {
            message: 'status not listed in the list',
        } );
    };
};

exports.profile = async ( req, res ) => {
    const { id } = req.params;
    if ( id ) {
        await users.findOne( {
            where: { id },
            include: [ 'deals', 'claimedDeals' ],
        } )
            .then( user => {
                if ( user ) {
                    res.status( 200 ).json( {
                        message: 'User successfully fetched',
                        user,
                    } );
                } else {
                    res.status( 400 ).json( {
                        message: 'User not found',
                    } );
                }
            } )
            .catch( error => {
                res.status( 400 ).json( {
                    message: 'An error occurred',
                    error: error.message,
                } );
            } );
    } else {
        res.status( 400 ).json( {
            message: 'Id not present',
        } );
    }
};