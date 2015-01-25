Template.nofifications.helpers({
    notifications: function () {
        return Notifications.find({userId: Meteor.userId(), read: false});
    },
    notificationsCount: function () {
        return Notifications.find({userId: Meteor.userId(), read:false}).count();
    }
});

Template.notificationItem.helpers({
    notificationsPostPath: function () {
        return Router.routes.postPage.path({_id: this.postId});
    }
});

Template.notificationItem.events({
   'a click': function () {
       Notifications.update(this._id, {$set: {read: true}});
   }
});