const { users } = require( "../Database" );
const bcrypt = require( "bcryptjs" );



exports.register = async ( req, res, next ) => {
    const {
        username,
        password,
        name,
        email,
        phone,
        date_of_birth,
        gender,
        role
    } = req.body;
    if ( password.length < 6 ) {
        return res.status( 400 ).json( { message: "Password less than 6 characters" } );
    }
    bcrypt.hash( password, 10 ).then( async ( hash ) => {
        await users.create( {
            username,
            password: hash,
            name,
            email,
            phone,
            date_of_birth,
            gender,
            role
        } )
            .then( ( user ) => {
                res.status( 201 ).json( {
                    message: "User successfully created",
                    Server_DateTime: user.Server_DateTime,
                    DateTime_UTC: user.DateTime_UTC,
                    Update_DateTime_UTC: user.Update_DateTime_UTC,
                    Last_Login_DateTime_UTC: user.Last_Login_DateTime_UTC,
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    date_of_birth: user.date_of_birth,
                    gender: user.gender,
                    role: user.role,
                    token: user.token,
                } );
            } )
            .catch( ( error ) =>
                res.status( 400 ).json( {
                    message: "User not successful created",
                    error: error.message,
                } )
            );
    } );
};

exports.login = async ( req, res, next ) => {
    const { username, password } = req.body;
    if ( !username || !password ) {
        return res.status( 400 ).json( {
            message: "Username or Password not present",
        } );
    }
    try {
        const user = await users.findOne(
            {
                where: {
                    username
                }
            }
        );
        if ( !user ) {
            res.status( 400 ).json( {
                message: "Login not successful",
                error: "User not found",
            } );
        } else {
            bcrypt.compare( password, user.password ).then( function ( result ) {
                if ( result ) {
                    users.update(
                        {
                            Last_Login_DateTime_UTC: new Date( Date.now() ).toUTCString()
                        }, {
                        where: {
                            id: user.id
                        }
                    }
                    );
                    res.status( 200 ).json( {
                        message: "User successfully Logged in",
                        id: user.id,
                        Server_DateTime: user.Server_DateTime,
                        DateTime_UTC: user.DateTime_UTC,
                        Update_DateTime_UTC: user.Update_DateTime_UTC,
                        Last_Login_DateTime_UTC: user.Last_Login_DateTime_UTC,
                        username: user.username,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        date_of_birth: user.date_of_birth,
                        gender: user.gender,
                        role: user.role,
                        token: user.token,
                        status: user.status,
                        avatar: user.avatar,
                    } );
                } else {
                    res.status( 400 ).json( { message: "Login not succesful" } );
                }
            } );
        }
    } catch ( error ) {
        res.status( 400 ).json( {
            message: "An error occurred",
            error: error.message,
        } );
    }
};

exports.uploadAvatar = async ( req, res, next ) => {
    const { id } = req.body;
    if ( id ) {
        await users.findOne( { where: { id } } )
            .then( ( user ) => {
                if ( user ) {
                    user.avatar = req.avatar;
                    user.update( { avatar: req.avatar } );
                    res.status( 201 ).json( {
                        message: "User successfully updated",
                    } );
                } else {
                    res.status( 400 ).json( {
                        message: "User not found",
                    } );
                }
            } )
            .catch( ( error ) => {
                res.status( 400 ).json( {
                    message: "An error occurred",
                    error: error.message,
                } );
            } );
    } else {
        res.status( 400 ).json( {
            message: "Id not present",
        } );
    }
};