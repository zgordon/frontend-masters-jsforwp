# 4.2 - Passing Arguments to the WP API

This exercise helps you get comfortable passing arguments to the WordPress REST API.

You can find [Post Arguments here](https://developer.wordpress.org/rest-api/reference/posts/#arguments).  Other endpoint documentation pages also include accepted arguments.

1. Access yoursite.com/wp-json/posts?\_embed (You should an "\_embedded" property on all posts with data like author, replies and wp:term)
2. Access yoursite.com/wp-json/posts&per_page=1 (You should now see only 1 post returned)
3. Add a new author to your site and assign them a post.  Then access yoursite.com/wp-json/posts?\_embed&author=1 (You should only see posts from the main admin)
4. Access yoursite.com/wp-json/posts?orderby=title&order=asc (You should now see posts listed by title)
5. Add some categories and assign them to posts.  Get a category id and add it to this url structure (replacing ID): yoursite.com/wp-json/posts?categories=ID
6. Play around arguments for other endpoints (like pages, media, users, etc)
