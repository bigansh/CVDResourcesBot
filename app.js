const express = require('express'),
	app = express(),
	dotenv = require('dotenv')

const twit = require('./connections/twitterConnect')

const twitter = twit

dotenv.config()

const keyWords = [
	'@CVDResourcesBot',
	'beds verified -help',
	'beds available -help',
	'oxygen verified -help',
	'oxygen available -help',
	'ventilator verified -help',
	'remdesivir available -help',
	'-needed -require -urgent -help',
	'beds -needed -require -urgent -need -help',
	'oxygen -needed -require -urgent -need -help',
	'remdesivir -needed -require -urgent -need -help',
	'ventilator -needed -require -urgent -need -help',
	'resource verified -needed -require -urgent -need -help',
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
