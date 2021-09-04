const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getAllAuthors,
  getAuthor,
  getPostsByAuthor,
  getPostsByAllAuthors,
  getTotalLikesCount,
  getTotalReadsCount,
  getTagsByAuthor,
  getTagsByAllAuthors,
  getAllTotalReadsCount,
  getAllTotalLikesCount,
  update,
  remove,
};

/*
	SELECT authors.authorsid, authors.firstname, authors.lastname, authors.bio
	FROM authors
*/
// get bio info for all authors
function getAllAuthors() {
  return db("authors").select(
    "authors.bio AS bio",
    "authors.firstname AS firstname",
    "authors.authorsid AS id",
    "authors.lastname AS lastName"
  );
}

/*
	SELECT 
		authors.authorsid as id, authors.firstname as firstname, 
		authors.lastname as lastName, authors.bio
	FROM authors
	WHERE authors.authorsid = 2;
*/
// get bio info for one author
function getAuthor(authorsid) {
  return db("authors")
    .select(
      "authors.bio AS bio",
      "authors.firstname AS firstname",
      "authors.authorsid AS id",
      "authors.lastname AS lastName"
    )
    .where("authors.authorsid", authorsid);
}

/*
	SELECT posts.postsid as id, posts.authorsid as authorId, posts.likes as likes, posts.reads as reads,
		ARRAY_AGG(tags.tagname) AS tags
	FROM posts 
	INNER JOIN authors ON posts.authorsid = authors.authorsid
	INNER JOIN poststags ON posts.postsid = poststags.postsid
	INNER JOIN tags ON poststags.tagsid = tags.tagsid
	WHERE authors.authorsid = 2
	GROUP BY posts.postsid, posts.authorsid, authors.firstname, authors.lastname, posts.likes, posts.reads;
*/
// get posts by author
function getPostsByAuthor(authorsid) {
  return db("posts")
    .select(
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
    .where("authors.authorsid", authorsid);
}

/*
	SELECT posts.postsid as id, posts.authorsid as authorId, posts.likes as likes, posts.reads as reads,
		ARRAY_AGG(tags.tagname) AS tags
	FROM posts 
	INNER JOIN authors ON posts.authorsid = authors.authorsid
	INNER JOIN poststags ON posts.postsid = poststags.postsid
	INNER JOIN tags ON poststags.tagsid = tags.tagsid
	GROUP BY posts.postsid, posts.authorsid, authors.firstname, authors.lastname, posts.likes, posts.reads;
*/
// get posts by author
function getPostsByAllAuthors() {
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

/*
	SELECT SUM(posts.likes) as totalLikesCount
	FROM posts
	INNER JOIN authors
	ON posts.authorsid = authors.authorsid
	WHERE authors.authorsid = 2;
*/
// get total likes count for one author
function getTotalLikesCount(authorsid) {
  return db("posts")
    .select(db.raw("SUM(posts.likes) AS totalLikeCount"))
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .where("authors.authorsid", authorsid);
}

/*
	SELECT SUM(posts.reads) as totalLikesCount
	FROM posts
	INNER JOIN authors
	ON posts.authorsid = authors.authorsid
	WHERE authors.authorsid = 2;
*/
// get total reads count for one author
function getTotalReadsCount(authorsid) {
  return db("posts")
    .select(db.raw("SUM(posts.reads) AS totalReadCount"))
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .where("authors.authorsid", authorsid);
}

/*
	SELECT SUM(posts.likes) as totalLikesCount, authors.authorsid
	FROM posts
	INNER JOIN authors
	ON posts.authorsid = authors.authorsid
	GROUP BY authors.authorsid;
*/
// get total likes count
function getAllTotalLikesCount() {
  return db("posts")
    .select(db.raw("SUM(posts.likes) AS totalLikeCount"), "authors.authorsid")
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .groupBy("authors.authorsid");
}
/*
	SELECT SUM(posts.likes) as totalLikesCount, authors.authorsid
	FROM posts
	INNER JOIN authors
	ON posts.authorsid = authors.authorsid
	GROUP BY authors.authorsid;
*/
// get total likes count
function getAllTotalReadsCount() {
  return db("posts")
    .select(db.raw("SUM(posts.reads) AS totalReadCount"), "authors.authorsid")
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .groupBy("authors.authorsid");
}

/*
	SELECT DISTINCT ARRAY_AGG(tags.tagname) AS tags
	FROM Tags
	INNER JOIN PostsTags 
	ON tags.tagsid = poststags.tagsid
	INNER JOIN Posts
	ON poststags.postsid = posts.postsid
	INNER JOIN Authors
	ON posts.authorsid = authors.authorsid
	WHERE authors.authorsid = 2;
*/
// get tags for one author
function getTagsByAuthor(authorsid) {
  return db("tags")
    .distinct()
    .select(db.raw("ARRAY_AGG(tags.tagname) AS tags"))
    .innerJoin("poststags", "tags.tagsid", "poststags.tagsid")
    .innerJoin("posts", "poststags.postsid", "posts.postsid")
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .where("authors.authorsid", authorsid);
}

/*
	SELECT DISTINCT ARRAY_AGG(tags.tagname) AS tags, authors.authorsid
	FROM Tags
	INNER JOIN PostsTags 
	ON tags.tagsid = poststags.tagsid
	INNER JOIN Posts
	ON poststags.postsid = posts.postsid
	INNER JOIN Authors
	ON posts.authorsid = authors.authorsid
  	GROUP BY authors.authorsid;
*/
// get tags by all authors
function getTagsByAllAuthors() {
  return db("tags")
    .distinct()
    .select(db.raw("ARRAY_AGG(tags.tagname) AS tags"), "authors.authorsid")
    .innerJoin("poststags", "tags.tagsid", "poststags.tagsid")
    .innerJoin("posts", "poststags.postsid", "posts.postsid")
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .groupBy("authors.authorsid");
}

// return list of all authors
function find() {
  return db("authors").select("*");
}

// find an author by any field
function findBy(filter) {
  return db("authors").where(filter);
}

// create an author
async function add(author) {
  const [authorsid] = await db("authors").insert(author, "authorsid");
  return findById(authorsid);
}

// find an author by authorsid
function findById(authorsid) {
  return db("authors").select("authorsid", "*").where({ authorsid }).first();
}

// update an author
function update(authorsid, author) {
  return db("authors").where({ authorsid }).update(author);
}

// delete an author
function remove(authorsid) {
  return db("authors").where("authorsid", Number(authorsid)).del();
}
