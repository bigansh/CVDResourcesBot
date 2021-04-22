const express = require('express'),
	app = express(),
	dotenv = require('dotenv')

const twit = require('./connections/twitterConnect')

const twitter = twit

dotenv.config()

const keyWords = [
	'@CVDResourcesBot',
	'beds verified',
	'beds available',
	'oxygen verified',
	'oxygen available',
	'ventilator verified',
	'remdesivir available',
	'-needed -require -urgent',
	'beds -needed -require -urgent -need',
	'oxygen -needed -require -urgent -need',
	'remdesivir -needed -require -urgent -need',
	'ventilator -needed -require -urgent -need',
	'resource verified -needed -require -urgent -need',
]

var stream = twitter.stream('statuses/filter', { track: keyWords })

stream.on('tweet', (tweet) => {
	if (tweet.quoted_status_id_str) {
		twitter
			.post('statuses/retweet/:id', {
				id: tweet.quoted_status_id_str,
			})
			.catch((error) => {
				console.log(error)
			})
	}
	if (tweet.in_reply_to_status_id_str) {
		twitter
			.post('statuses/retweet/:id', {
				id: tweet.in_reply_to_status_id_str,
			})
			.catch((error) => {
				console.log(error)
			})
	} else {
		twitter
			.post('statuses/retweet/:id', {
				id: tweet.id_str,
			})
			.catch((error) => {
				console.log(error)
			})
	}
})

stream.on('error', (error) => {
	console.log(error)
})

app.listen(process.env.PORT, () => {
	console.log('connected')
})
