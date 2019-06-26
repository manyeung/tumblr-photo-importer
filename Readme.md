# Description

This is to import photo posts from another blog in Tumblr.

# Requirements

Before import, you should have a new blog created and a `posts.xml` file which is exported from Tumblr (https://www.tumblr.com/settings/blog/{blog_name}). Replace the downloaded `posts.xml` file with the existing one.

Then you should [register an application](https://www.tumblr.com/oauth/apps) and get the keys on the [API console](https://api.tumblr.com/console).

Input the fields when running the command. The fields are:

1. consumer_key
1. consumer_secret
1. token
1. token_secret
1. idenifier - the blog name
1. slot_count - it defines the number of posts in each slots. Each slots will run in parallel.

# Import

run `npm run import` to import photo posts from the `posts.xml` file.

![Import](/images/import.png)

# Erase

run `npm run erase` to remove all posts in the blog.

![Erase](/images/erase.png)