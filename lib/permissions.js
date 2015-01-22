
// check that the userid specified owns the document

function ownsDocument(userId, doc){
    return doc && doc.userId === userId;
}