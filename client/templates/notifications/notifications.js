Template.notifications.helpers({
    notifications: function () {
        return Notifications.find({userId: Meteor.userId(), read: false});
    },
    notificationsCount: function () {
        return Notifications.find({userId: Meteor.userId(), read:false}).count();
    }
});

Template.notificationItem.helpers({
    notificationPostPath: function () {
        return Router.routes.postPage.path({_id: this.postId});
    }
});

Template.notificationItem.events({
   'click a': function () {
       Notifications.update(this._id, {$set: {read: true}});
   }
});