const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getSinglePost,
  getPosts,
  getPostsByTag,
  update,
  remove,
};

/*
	SELECT authors.firstname, authors.lastname, 
		posts.postsid as id, posts.authorsid as authorId, posts.likes as likes, posts.reads as reads,
		ARRAY_AGG(tags.tagname) AS tags
	FROM posts 
	INNER JOIN authors ON posts.authorsid = authors.authorsid
	INNER JOIN poststags ON posts.postsid = poststags.postsid
	INNER JOIN tags ON poststags.tagsid = tags.tagsid
	GROUP BY posts.postsid, posts.authorsid, authors.firstname, authors.lastname, posts.likes, posts.reads;
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
    );
}

// get one single post
function getSinglePost(postsid) {
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
    .where("posts.postsid", postsid);
}

// get posts by tag
function getPostsByTag(tagname) {
  let resultsToFilter = db("posts")
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
    );
  return resultsToFilter.filter((post) => {
    return post.tags.indexOf(tagname) >= 0;
  });
}

// get all rows from posts table
function find() {
  return db("posts").select("*");
}
// filter posts table rows by filter provided by user
function findBy(filter) {
  return db("posts").where(filter);
}

// create new row in posts table
async function add(post) {
  const [postsid] = await db("posts").insert(post, "postsid");
  return findById(postsid);
}

// find a row in posts table by postsid
function findById(postsid) {
  return db("posts").select("postsid", "*").where({ postsid }).first();
}

// update a row in posts table by postsid
function update(postsid, post) {
  return db("posts").where({ postsid }).update(post);
}

// delete a row in posts table by postsid
function remove(postsid) {
  return db("posts").where("postsid", Number(postsid)).del();
}
