const db = require("../../data/dbConfig");

module.exports = {
  add,
  findBy,
  findById,
  getTagsByAuthor,
  getTagsByPost,
  getTags,
  getAllTags,
  getAllAuthorsByAllTags,
  getAllPostsByAllTags,
  getOneTag,
  getAllAuthorsByOneTag,
  getAllPostsByOneTag,
  update,
  remove,
};

/*
	SELECT tags.tagsid, tags.tagname 
	FROM Tags;
*/
// get tagsid & tagname on all tags
function getAllTags() {
  return db("tags").select("tags.tagsid", "tags.tagname");
}

/*
	SELECT tags.tagname AS tagname, authors.bio AS bio, 
		authors.firstname || ' ' || authors.lastname AS author, authors.authorsid AS id
	FROM Tags
	INNER JOIN PostsTags
	ON tags.tagsid = poststags.tagsid
	INNER JOIN Posts
	ON poststags.postsid = posts.postsid
	INNER JOIN Authors
	ON authors.authorsid = posts.authorsid
	GROUP BY tags.tagname, authors.authorsid, authors.firstname, authors.lastname, authors.bio;
*/
// get all authors per all tags
function getAllAuthorsByAllTags() {
  return db("tags")
    .select(
      "authors.bio as bio",
      "authors.authorsid AS id",
      db.raw("authors.firstname || ' ' || authors.lastname AS author"),
      "tags.tagname AS tagname"
    )
    .innerJoin("poststags", "tags.tagsid", "poststags.tagsid")
    .innerJoin("posts", "poststags.postsid", "posts.postsid")
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .groupBy(
      "tags.tagname",
      "authors.authorsid",
      "authors.firstname",
      "authors.lastname",
      "authors.bio"
    );
}

/*
	SELECT tags.tagname, posts.postsid AS id, posts.likes AS likes, posts.reads AS reads
	FROM Tags
	INNER JOIN PostsTags
	ON tags.tagsid = poststags.tagsid
	INNER JOIN Posts
	ON poststags.postsid = posts.postsid
	GROUP BY tags.tagname, posts.postsid, posts.likes, posts.reads;
*/
// get all posts per all tags
function getAllPostsByAllTags() {
  return db("tags")
    .select(
      "tags.tagname AS tagname",
      "posts.postsid",
      "authors.authorsid",
      db.raw("authors.firstname || ' ' || authors.lastname AS author"),
      "posts.postsid AS id",
      "posts.likes AS likes",
      "posts.reads AS reads"
    )
    .innerJoin("poststags", "tags.tagsid", "poststags.tagsid")
    .innerJoin("posts", "poststags.postsid", "posts.postsid")
    .innerJoin("authors", "authors.authorsid", "posts.authorsid");
}

/*
	SELECT tags.tagsid, tags.tagname
	FROM Tags
	WHERE tags.tagname = "tech"
*/
// get tagsid & tagname on one tag
function getOneTag(singleTagName) {
  return db("tags")
    .select("tags.tagname AS tagname", "tags.tagsid AS tagsid")
    .where("tags.tagname", singleTagName);
}

/*
	SELECT tags.tagname AS tagname, authors.bio AS bio, 
		authors.firstname || ' ' || authors.lastname AS author, authors.authorsid AS id
	FROM Tags
	INNER JOIN PostsTags
	ON tags.tagsid = poststags.tagsid
	INNER JOIN Posts
	ON poststags.postsid = posts.postsid
	INNER JOIN Authors
	ON authors.authorsid = posts.authorsid
	WHERE tags.tagname = "tech"
	GROUP BY tags.tagname, authors.authorsid, authors.firstname, authors.lastname, authors.bio;
*/
// get all authors on one tag
function getAllAuthorsByOneTag(tagName) {
  return db("tags")
    .select(
      "authors.bio AS bio",
      "authors.authorsid",
      db.raw("authors.firstname || ' ' || authors.lastname AS author")
    )
    .distinct()
    .innerJoin("poststags", "tags.tagsid", "poststags.tagsid")
    .innerJoin("posts", "poststags.postsid", "posts.postsid")
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .where("tags.tagname", tagName);
}

/*
	SELECT tags.tagname, posts.postsid AS id, posts.likes AS likes, posts.reads AS reads
	FROM Tags
	INNER JOIN PostsTags
	ON tags.tagsid = poststags.tagsid
	INNER JOIN Posts
	ON poststags.postsid = posts.postsid
	WHERE tags.tagname = "tech"
	GROUP BY tags.tagname, posts.postsid, posts.likes, posts.reads;
*/
// get all posts on one tag
function getAllPostsByOneTag(tagName) {
  return db("tags")
    .select(
      "posts.postsid AS id",
      "posts.likes AS likes",
      "posts.reads AS reads",
      "authors.authorsid",
      db.raw("authors.firstname || ' ' || authors.lastname AS author")
    )
    .innerJoin("poststags", "tags.tagsid", "poststags.tagsid")
    .innerJoin("posts", "poststags.postsid", "posts.postsid")
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .where("tags.tagname", tagName);
}

/*
	SELECT DISTINCT tags.tagname 
	FROM tags
	INNER JOIN poststags
	ON tags.tagsid = poststags.tagsid
	INNER JOIN posts
	ON poststags.postsid = posts.postsid
	INNER JOIN authors
	ON posts.authorsid = authors.authorsid
	WHERE authors.authorsid = 2;
*/
// get tags by author
function getTagsByAuthor(authorsid) {
  return db("tags")
    .select("authors.authorsid", db.raw("ARRAY_AGG(tags.tagname) AS tags"))
    .distinct()
    .innerJoin("poststags", "posts.postsid", "poststags.postsid")
    .innerJoin("posts", "authors.authorsid", "posts.authorsid")
    .innerJoin("authors", "posts.authorsid", "authors.authorsid")
    .where("authors.authorsid", authorsid)
    .groupBy("authors.authorsid");
}

/*
	SELECT tags.tagname
	FROM tags
	INNER JOIN poststags
	ON tags.tagsid = poststags.tagsid
	INNER JOIN posts
	ON poststags.postsid = poststags.postsid
	WHERE posts.postsid = 2;
*/
// get tags by post id
function getTagsByPost(postsid) {
  return db("tags")
    .select("posts.postsid", db.raw("ARRAY_AGG(tags.tagname) AS tags"))
    .innerJoin("poststags", "poststags.tagsid", "tags.tagsid")
    .innerJoin("posts", "poststags.postsid", "posts.postsid")
    .where("posts.postsid", postsid)
    .groupBy("posts.postsid");
}

/*
	SELECT posts.postsid, tags.tagname
	FROM tags
	INNER JOIN poststags
	ON tags.tagsid = poststags.tagsid
	INNER JOIN posts
	ON poststags.postsid = poststags.postsid
	GROUP BY posts.postsid;
*/
// get tags
function getTags() {
  return db("tags")
    .select(
      "posts.postsid AS postsid",
      db.raw("ARRAY_AGG(tags.tagname) AS tags")
    )
    .innerJoin("poststags", "poststags.tagsid", "tags.tagsid")
    .innerJoin("posts", "poststags.postsid", "poststags.postsid")
    .groupBy("posts.postsid");
}

// find a tag by any field
function findBy(filter) {
  return db("tags").where(filter);
}

// add a tag
async function add(tag) {
  const [tagsid] = await db("tags").insert(tag, "tagsid");
  return findById(tagsid);
}

// find a tag by tag id
function findById(tagsid) {
  return db("tags").select("tagsid", "*").where({ tagsid }).first();
}

// update a tag by tag id
function update(tagsid, tag) {
  return db("tags").where({ tagsid }).update(tag);
}

// delete a tag by tag id
function remove(tagsid) {
  return db("tags").where("tagsid", Number(tagsid)).del();
}
