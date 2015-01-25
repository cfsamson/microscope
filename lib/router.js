Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
            return Meteor.subscribe('notifications');
    }
});

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () { return Posts.findOne(this.params._id);},
    waitOn: function () {
        return Meteor.subscribe('comments', this.params._id);
    }
});

Router.route('/posts/:_id/edit',{
    name: 'postEdit',
    data: function () { return Posts.findOne(this.params._id); }

});

Router.route('/submit', {name: 'postSubmit'});


PostListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function () {
        return parseInt(this.params.postLimit) || 5;
    },
    findOptions: function () {
        return {sort: {submitted: -1}, limit: this.postsLimit()}
    },
    waitOn: function () {
        Meteor.subscribe('posts', this.findOptions());
    },
    data: function () {
        return Posts.find({}, this.findOptions());
    }
});

Router.route('/:postLimit?', {
    name: 'postsList'
});

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

function requireLogin(){
    if(!Meteor.user()){
        if(Meteor.loggingIn()){
            this.render(this.loadingTemplate)
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}