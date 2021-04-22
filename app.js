const express = require('express'),
    app = express(),
    dotenv = require('dotenv')

const twit = require('./connections/twitterConnect')

const twitter = twit

dotenv.config()

const keyWords = [
    '@CVDResourcesBot',
    'beds available',
    'oxygen available',
    'remdesivir available',
    '-needed -require -urgent',
    'beds -needed -require -urgent -need',
    'oxygen -needed -require -urgent -need',
    'ventilator -needed -require -urgent -need',
    'remdesivir -needed -require -urgent -need',
    'oxygen verified',
    'beds verified',
    'ventilator verified',
    'resource verified -needed -require -urgent -need'
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