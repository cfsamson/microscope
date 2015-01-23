Template.postSubmit.events({
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        var errors = validatePost(post);
        if(errors.title || errors.url){
            return Session.set('postSubmitErrors', errors);
        }
        
        Meteor.call('postInsert', post, function (err, result) {
            if(err){
                return throwError(err.reason);
            }

            if(result.postExists){
                throwError('This link has already been posted');
            }

            Router.go('postPage', {_id: result._id});
        });

    }
});

// initlialize postSubmitErrors object when postSubmit-template is created
Template.postSubmit.created = function () {
  Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({
    errorMessage: errorMessage,
    errorClass: errorClass
})

function errorClass(field){
    return !! Session.get('postSubmitErrors')[field] ? 'has-error': '';
}

function errorMessage(field){
    return Session.get('postSubmitErrors')[field];
}