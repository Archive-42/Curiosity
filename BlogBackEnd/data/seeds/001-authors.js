exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("authors")
    .del()
    .then(() => {
      return knex("authors").insert([
        {
          bio: "I really enjoy writing. It is one of my favourite hobbies.\n\nFollow me on:\n-Instagram\n-Snapchat",
          firstname: "Lainey",
          authorsid: 1,
          lastname: "Ritter",
        },
        {
          bio: "I'm love politics. Always looking for feedback on my posts. My interests are below:\n\n-politics\n-science\n-history",
          firstname: "Tia",
          authorsid: 2,
          lastname: "Roberson",
        },
        {
          bio: "-Read my posts\n-Let me know what you think!",
          firstname: "Jaden",
          authorsid: 3,
          lastname: "Bryant",
        },
        {
          bio: "-Software Developer from New York\n-Tech is my thing!",
          firstname: "Jon",
          authorsid: 4,
          lastname: "Abbott",
        },
        {
          bio: "I have been writing since I was 12. Now I work for the New York Times",
          firstname: "Trevon",
          authorsid: 5,
          lastname: "Rodriguez",
        },
        {
          bio: "-Coder by day\n-Writer by night\n",
          firstname: "Bryson",
          authorsid: 6,
          lastname: "Bowers",
        },
        {
          bio: "You can contact me at ahmad@dunn.com!\n\n-Engineer\n-Writer",
          firstname: "Ahmad",
          authorsid: 7,
          lastname: "Dunn",
        },
        {
          bio: "",
          firstname: "Elisha",
          authorsid: 8,
          lastname: "Friedman",
        },
        {
          bio: "I love writing about tech. Check out my posts and let me know what you think!",
          firstname: "Rylee",
          authorsid: 9,
          lastname: "Paul",
        },
        {
          bio: "Favorite topics:\n-science\n-culture\n-design",
          firstname: "Kinley",
          authorsid: 10,
          lastname: "Crosby",
        },
        {
          bio: "Always looking for new connections.\n\nConnect with me on:\n-Facebook\n-Linkedin",
          firstname: "Adalyn",
          authorsid: 11,
          lastname: "Blevins",
        },
        {
          bio: "You can contact me at zack@turner.com!\n\n-CEO\n-Co-founder\n-Writer",
          firstname: "Zackery",
          authorsid: 12,
          lastname: "Turner",
        },
      ]);
    });
};
