const express = require('express'),
    app = express(),
    dotenv = require('dotenv')

const twit = require('./connections/twitterConnect')

const twitter = twit

dotenv.config()

var stream = twitter.stream('statuses/filter', { track: ['@CVDResourcesBot', 'verified resource'] })

stream.on('tweet', (tweet) => {
    if (tweet.quoted_status_id_str) {
        twitter.post('statuses/retweet/:id', { id: tweet.quoted_status_id_str })
    }
    if (tweet.in_reply_to_status_id_str) {
        twitter.post('statuses/retweet/:id', { id: tweet.in_reply_to_status_id_str })
    }
    else {
        twitter.post('statuses/retweet/:id', { id: tweet.id_str })
    }
})

app.listen(process.env.PORT, () => {
    console.log('connected')
})