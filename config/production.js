const dotenv = require('dotenv');
dotenv.config();



module.exports = {
    name: 'Production - Online Manikchak Service...',
    dbconn: {
        mongodbURI: process.env.MONGODB_URI
    }
}