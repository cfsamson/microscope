Notifications = new Meteor.Collection('notifications');

createCommentNotification = _createCommentNotification;

Notifications.allow({
    update: function (userId, doc, fieldNames) {
        return ownsDocument(userId, doc)
            && fieldNames.length === 1
            && fieldNames[0] === 'read';
    }
});

function _createCommentNotification(comment){
    var post = Posts.findOne(comment.postId);

    if(comment.userId !== post.userId){

        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        });
    }

}