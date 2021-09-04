const ApiUtil = require("./api_util.js");

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = $(el).attr("data-user-id");
    this.followState = $(el).attr("data-initial-follow-state");
    this.render();
    this.handleClick();
  }

  render() {
    this.$el.prop("disabled", false)
    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
    } else if (this.followState === "followed") {
      this.$el.text("Unfollow!");
    } else {
      this.$el.prop("disabled", true);
    }
  }

  handleClick() {
    this.$el.click((event) => {
      event.preventDefault();
      let req = "bryce";
      // debugger
      if (this.followState === 'unfollowed') {
        req = ApiUtil.followUser;
        this.followState = "following";
      } else if (this.followState === 'followed'){
        req = ApiUtil.unfollowUser;
        this.followState = "unfollowing";
      }

      req(this.userId).then(() => {
        this.toggleFollowState();
        this.render();
        this.showMessage("");
      }, () => {
        this.showMessage("Something went wrong...");
      });

    });
  }
    // this.$el.click((event) => {
      //   event.preventDefault();

    //   const req = {
    //     url: `/users/${this.userId}/follow`,
    //     dataType: "json",
    //     success: () => {
    //       this.toggleFollowState();
    //       this.render();
    //       this.showMessage("");
    //     },
    //     error: () => { 
    //       this.showMessage("Something went wrong...");
    //     }
    //   };

    //   req.method = (this.followState === 'unfollowed' ? 'POST' : 'DELETE');

    //   $.ajax(req);
    // });
    // }

  toggleFollowState() {
    this.followState = (this.followState === 'unfollowing' ? 'unfollowed' : 'followed');
  }

  showMessage(message) {
    const $messages = $("h3.messages");
    $messages.text(message);
  }

}
module.exports = FollowToggle;