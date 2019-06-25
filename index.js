var fs = require('fs');
var parseString = require('xml2js').parseString;
var prompt = require('./prompt');
var createClient = require('./client');

prompt().then(function (answers) {

    var client = createClient(answers);

    // To verify the authentication before import
    client.blogInfo(answers.idenifier).then(function () {
        // Import
        var data = fs.readFileSync(__dirname + '/posts.xml');
        parseString(data, function (err, result) {
            var posts = result.tumblr.posts[0].post;
            var slots = [];
            var slotCount = answers.slot_count;

            while (posts.length) {
                slots.push(posts.splice(0, slotCount));
            }

            for (let index = 0; index < slots.length; index++) {
                dumpData(client, answers.idenifier, slots[index], index);
            }
        });
    });
});

function dumpData (client, idenifier, posts, slotIndex) {
    var i = 0;

    posts.reduce(
        (promise, post) => promise.then(() => {
            var caption = post['photo-caption'][0];
            var source = post['photo-url'][0]._;
            var tags = post.tag[0];
            console.log("processing slots[%d], %d posts left in the slot", slotIndex, posts.length - ++i);
            return client.createPhotoPost(idenifier, {
                source,
                caption,
                tags
            });
        }),
        Promise.resolve()
    );
}