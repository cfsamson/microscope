Template.appErrors.helpers({
    errors: function() {
        return AppErrors.collection.find();
    }
});

Template.appError.rendered = function() {
    var error = this.data;
    Meteor.setTimeout(function () {
        AppErrors.collection.remove(error._id);
    }, 3000);
};