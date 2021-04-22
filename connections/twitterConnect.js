const twit = require('twit'),
    dotenv = require('dotenv');

dotenv.config();

const twitterConnect = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

module.exports = twitterConnect;