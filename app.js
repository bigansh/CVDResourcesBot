const express = require('express'),
    app = express(),
    dotenv = require('dotenv')

const twit = require('./connections/twitterConnect')

const twitter = twit

dotenv.config()

const keyWords = [
    '@CVDResourcesBot',
    'resource verified',
    'beds available',
    'oxygen available',
    'remdesivir available',
    '-need',
    '-require',
    '-urgent'
]

var stream = twitter.stream('statuses/filter', { track: keyWords })

stream.on('tweet', async (tweet) => {
    try {
        if (tweet.quoted_status_id_str) {
            twitter.post('statuses/retweet/:id', { id: tweet.quoted_status_id_str })
        }
        if (tweet.in_reply_to_status_id_str) {
            twitter.post('statuses/retweet/:id', { id: tweet.in_reply_to_status_id_str })
        }
        else {
            twitter.post('statuses/retweet/:id', { id: tweet.id_str })
        }
    } catch {
        console.log(tweet)
    }
})

app.listen(process.env.PORT, () => {
    console.log('connected')
})