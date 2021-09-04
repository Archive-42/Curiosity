const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: "json"
    });
  },

  unfollowUser: id => {
    return $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: "json"
    });
  },

  searchUsers: (queryVal) => {
    return $.ajax({
      method: "GET",
      url: "/users/search",
      dataType: "json",
      data: queryVal,
    });
  }
};

module.exports = APIUtil;