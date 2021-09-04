const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");

$(() => {
  $("button.follow-toggle").each( (idx, ele) => {
    new FollowToggle(ele);
  });

  $("nav.users-search").each((idx, ele) => {
    new UsersSearch(ele);
  });
});