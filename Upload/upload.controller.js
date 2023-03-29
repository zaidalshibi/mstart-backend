const multer = require( "multer" );
const cloudinary = require( "cloudinary" );
const DatauriParser = require( 'datauri/parser' );
require( "dotenv" ).config();


const parser = new DatauriParser();
const { uploader } = cloudinary;


cloudinary.config( {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
} );

const memoryStorage = multer.memoryStorage();

const upload = multer( {
    storage: memoryStorage,
} );



const bufferToDataURI = ( fileFormat, buffer ) =>{
    return parser.format( fileFormat, buffer );
}

const uploadToCloudinary = async ( fileString, format ) => {
    try {
        const res = await uploader.upload(
            `data:image/${format};base64,${fileString}`
        );
        return res;
    } catch ( error ) {
        throw new ErrorHandler( 500, error );
    }
};

const uploadImage = async ( req, res, next ) => {
    try {
        const { file } = req;
        if ( !file ) throw new ErrorHandler( 400, 'Image is required' );
        const fileFormat = file.mimetype.split( '/' )[ 1 ];
        const { base64 } = bufferToDataURI( fileFormat, file.buffer );
        const imageDetails = await uploadToCloudinary( base64, fileFormat );
        req.avatar = imageDetails.secure_url;
        next();
    } catch ( error ) {
        next( error );
    }
};

module.exports = {
    uploadImage,
    upload,
};