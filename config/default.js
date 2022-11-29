const dotenv = require('dotenv');
dotenv.config();



module.exports = {
    name: 'Default - Online Manikchak Service...',
    dbconn: {
        mongodbURI: process.env.MONGODB_URI
    }
}