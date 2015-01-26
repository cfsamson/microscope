Posts = new Mongo.Collection('posts');
validatePost = _validatePost;

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
    update: function (userId, post, fieldNames) {
        // may only edit the following two fields
        return (_.without(fieldNames, 'url', 'title').lenth > 0);
    },

    update: function (userId, post, fieldNames, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

Meteor.methods({
    postInsert: postInsert,
    upvote: upvote
});

function postInsert(postAttributes){
    check(Meteor.userId(), String);
    check(postAttributes, {
        title: String,
        url: String
    });

    var errors = validatePost(postAttributes);
    if(errors.title || errors.url){
        throw new Meteor.Error('invalid-post', 'You must set a tile and URL for your post');
    }

    var postWithSameLink = Posts.findOne({url: postAttributes.url});

    if(postWithSameLink){
        return {
            postExists: true,
            _id: postWithSameLink._id
        }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
        _id: postId
    }
}

function upvote(postId){
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
        _id: postId,
        upvoters: {$ne: this.userId}
    }, {
        $addToSet: {upvoters: this.userId},
        $inc: {votes: 1}
    });

    if(!affected){
        throw new Meteor.Error('invalid', "You weren't able to upvote that post");
    }

}

function _validatePost(post){
    var errors = {};

    if(!post.title){
        errors.title = 'Please fill inn a headline';
    }

    if(!post.url){
        errors.url = 'Please fill inn a URL';
    }

    return errors;
}
