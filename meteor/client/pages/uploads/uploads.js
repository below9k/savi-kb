Template.uploads.events({
	'change .fileGo': FS.EventHandlers.insertFiles(files,{
		metadata: function(f){
			return {
				uploaded_by: Meteor.userId(),
				article_id: $('#article_id').val()
			};
		},
      after: function (error, fileObj) {
        console.log("Inserted", fileObj.name());
      }
	})
});
Template.uploads.helpers({
	'getFiles': function(){
		return files.find();
	}
});