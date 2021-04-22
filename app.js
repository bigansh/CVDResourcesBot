const express = require('express'),
	app = express(),
	dotenv = require('dotenv')

const twit = require('./connections/twitterConnect')

const twitter = twit

dotenv.config()

const keyWords = [
	'beds available verified',
	'oxygen available verified',
	'ventilator available verified',
	'resource available verified',
]

const stream = twitter.stream('statuses/filter', { track: keyWords })

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
	}
	if (tweet.id_str) {
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

stream.on('limit', (limit) => {
	console.log(limit)
})

app.listen(process.env.PORT, () => {
	console.log('connected')
})
