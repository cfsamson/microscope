
Template.postEdit.created = createdEvent
Template.postEdit.events({
    'submit form': submitFormEvent,
    'click .delete': clickDeleteEvent
});

Template.postEdit.helpers({
    errorMessage: errorMessage,
    errorClass: errorClass
})

function clickDeleteEvent(e) {
    e.preventDefault();

    if(confirm('Delete this post?')){
        var currentPostId = this._id;

        Posts.remove(currentPostId);
        Router.go('postsList');
    }
}

function createdEvent(){
    Session.set('postEditErrors', {});
}

function errorClass(field){
    return !! Session.get('postEditErrors'[field] ? 'has-error': '');
}

function errorMessage(field){
    return Session.get('postEditErrors')[field];
}

function submitFormEvent(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
        url: $(e.target).find('[name=url]').val(),
        title: $(e.target).find('[name=title]').val()
    };

    var errors = validatePost(postProperties);
    if(errors.title || errors.url){
        return Session.set('postEditErrors', errors);
    }

    Posts.update(currentPostId, {$set: postProperties}, function (err) {
        if(err){
            throwError(err.reason);
        } else {
            Router.go('postPage', {_id: currentPostId});
        }
    })
}