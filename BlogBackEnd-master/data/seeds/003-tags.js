exports.seed = (knex) => {
  return knex("tags")
    .del()
    .then(() => {
      return knex("tags").insert([
        {
          tagsid: 1,
          tagname: "culture",
        },
        {
          tagsid: 2,
          tagname: "design",
        },
        {
          tagsid: 3,
          tagname: "health",
        },
        {
          tagsid: 4,
          tagname: "history",
        },
        {
          tagsid: 5,
          tagname: "politics",
        },
        {
          tagsid: 6,
          tagname: "science",
        },
        {
          tagsid: 7,
          tagname: "startups",
        },
        {
          tagsid: 8,
          tagname: "tech",
        },
      ]);
    });
};
