
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true,
});
module.exports = {
    communication(req, res) {
        const { body } = req;
        const { text, id } = body;
        const result = sentiment.analyze(text);
        const comparative = result.comparative;
        let msg = "hi";
        const tone =
            comparative >= 0 ? (comparative >= 1 ? 'positive' : 'neutral') : 'negative';
        const data = {
            text,
            id,
            timeStamp: new Date(),
            sentiment: {
                tone,
                score: result.score,
            },
        };
        pusher.trigger('chat', 'message', data);
        console.log(data);
        res.json(data);
    }
}