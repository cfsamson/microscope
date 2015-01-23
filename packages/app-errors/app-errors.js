AppErrors = {
    collection: new Mongo.Collection(null),
    throw: function(message){
        AppErrors.collection.insert({message: message, seen: false});
    }
};