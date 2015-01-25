
// check that the userid specified owns the document
ownsDocument = _ownsDocument;

function _ownsDocument(userId, doc){
    return doc && doc.userId === userId;
}