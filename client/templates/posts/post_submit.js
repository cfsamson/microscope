Template.postSubmit.events({
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };
        
        Meteor.call('postSubmit', post, function (err, result) {
            if(err)
                return alert(err.reason);

            if(result.postExists){
                alert('This link has already been posted');
            }


        });

        Router.go('postPage', {_id: result._id});

    }
});