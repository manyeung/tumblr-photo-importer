var tumblr = require('tumblr.js');

function createClient (answers) {
    return tumblr.createClient({
        credentials: {
            consumer_key: answers.consumer_key,
            consumer_secret: answers.consumer_secret,
            token: answers.token,
            token_secret: answers.token_secret
        },
        returnPromises: true
    });
}

module.exports = createClient;