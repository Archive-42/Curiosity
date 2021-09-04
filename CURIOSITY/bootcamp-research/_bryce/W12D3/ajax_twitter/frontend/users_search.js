const APIUtil = require('./api_util.js');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $("input.user-name");
    this.$ul = $("ul.users");

    this.handleInput.call(this);
  }

  handleInput() {
    this.$input.on('input', (event) => {
      APIUtil.searchUsers(this.$input.val())
        .then(res => this.renderResults(res));
    });
  }

  renderResults(results) {
    debugger
    this.$ul.empty();
    results.forEach((res) => {
      const $li = $(`<li><a>${res}</a></li>`);
      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;