const db = require("../../data/dbConfig");

module.exports = {
  getPosts,
};

/*
	SELECT authors.firstname, authors.lastname, 
		posts.postsid as id, posts.authorsid as authorId, posts.likes as likes, posts.reads as reads,
		ARRAY_AGG(tags.tagname) AS tags
	FROM posts 
	INNER JOIN authors ON posts.authorsid = authors.authorsid
	INNER JOIN poststags ON posts.postsid = poststags.postsid
	INNER JOIN tags ON poststags.tagsid = tags.tagsid
	GROUP BY posts.postsid, posts.authorsid, authors.firstname, authors.lastname, posts.likes, posts.reads
	LIMIT 20;
*/
// get all posts
function getPosts() {
  return db("posts")
    .select(
      db.raw("authors.firstname || ' ' || authors.lastname as author"),
      "posts.authorsid AS authorId",
      "posts.postsid AS id",
      "posts.likes AS likes",
      "posts.reads AS reads",
      db.raw("ARRAY_AGG(tags.tagname) AS tags")
    )
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .innerJoin("poststags", "posts.postsid", "poststags.postsid")
    .innerJoin("tags", "poststags.tagsid", "tags.tagsid")
    .groupBy(
      "posts.postsid",
      "posts.authorsid",
      "authors.firstname",
      "authors.lastname",
      "posts.likes",
      "posts.reads"
    )
    .limit(20);
}
