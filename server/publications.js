Meteor.publish('posts', function () {
    return Posts.find();
});

Meteor.publish('comments', function (q) {
   return Comments.find();
});