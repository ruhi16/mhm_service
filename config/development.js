const dotenv = require('dotenv');
dotenv.config();





module.exports = {
    name: 'Development - Online Manikchak Service...',
    dbconn: {
        mongodbURI: process.env.MONGODB_URI_DEV
    }
}