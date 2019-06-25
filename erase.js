var prompt = require('./prompt');
var createClient = require('./client');

prompt().then(function (answers) {

    var client = createClient(answers);

    getPosts([], client, answers.idenifier).then(function (posts) {
        var slots = [];

        while (posts.length) {
            slots.push(posts.splice(0, answers.slot_count));
        }

        for (let i = 0; i < slots.length; i++) {
            deletePosts(client, answers.idenifier, slots[i], i);
        }
    });
});

function getPosts(posts, client, idenifier, offset=0) {
    console.log("getting posts from %s with offset %d", idenifier, offset);
    return client.blogPosts(idenifier, {offset})
        .then(function (data) {
            var arr = [].concat(posts, data.posts);

            if (data._links && data.total_posts > data._links.next.query_params.offset) {
                return getPosts(arr, client, idenifier, data._links.next.query_params.offset);
            }
            console.log("finish getting posts. posts count: %d", arr.length);
            return arr;
        });
}

function deletePosts(client, idenifier, posts, slotIndex) {
    var i = 0;

    posts.reduce(
        function (promise, post) {
            return promise.then(function () {
                console.log("deleting post from slots[%d], %d posts left in the slot", slotIndex, posts.length - ++i);
                return client.deletePost(idenifier, post.id);
            });
        },
        Promise.resolve()
    );
}