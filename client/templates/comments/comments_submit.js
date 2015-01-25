Template.commentSubmit.created = function () {
    Session.set('commentSubmitErrors', {});
};

Template.commentSubmit.helpers({
    errorClass: errorClass,
    errorMessage: errorMessage
});

Template.commentSubmit.events({
    'submit form': submitFormEvent
});


function errorClass(field){
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error': '';
}

function errorMessage(field){
    return Session.get('commentSubmitErrors')[field];
}

function submitFormEvent(e, template){
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
        body: $body.val(),
        postId: template.data._id
    };

    var errors = {};
    if (! comment.body) {
        errors.body = "Please write some content";
        return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function (err, commentId) {
        if (err){
            throwError(err.reason);
        } else {
            $body.val('');
        }
    })

}

