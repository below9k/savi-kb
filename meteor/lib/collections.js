articles = new Meteor.Collection('articles');
comments = new Meteor.Collection('comments');
var fileStore = new FS.Store.GridFS("files", {
  chunkSize: 1024*1024*10 //10MB
});

files = new FS.Collection("files", {
  stores: [fileStore]
});