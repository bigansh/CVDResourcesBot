require('dotenv').config()

const twit = require('./connections/twitterConnect')

const twitter = twit

const keyWords = [
	'beds available verified',
	'oxygen available verified',
	'ventilator available verified',
	'resource available verified',
]

const stream = twitter.stream('statuses/filter', { track: keyWords })

stream.on('tweet', (tweet) => {
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