Template.postItem.helpers({
   domain: function () {
       var a = document.createElement('a');
       a.href = this.url;
       return a.hostname;
   },
    'ownPost': function () {
        return this.userId === Meteor.userId();
    },
    commentsCount: function () {
        Comments.find({_id: this._id}).count();
    }
});