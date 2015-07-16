(function(){var _fileDep = new Deps.Dependency;
Template.uploadFiles.events({
	'click .remove_file': function(e){
		var c = confirm('Delete file?');
		var a = $(e.currentTarget).attr('data-file-id');
		if(c){
			var q = files.remove({_id: new Meteor.Collection.ObjectID(a)});
			if(q > 0)
				console.log('removed',a);
			else
				console.log('Error occured while removing the file.');
		}
	}
});
Template.uploadFiles.getFiles = function(){
	_fileDep.depend();
	var i = files.find();
	return i;
}
Template.uploadFiles.uploadedFile = function(b){
	if(!b){
		var file_url = files.baseURL+'/'+this.md5;
		var http = new XMLHttpRequest();
		http.open('HEAD', file_url, false);
		http.send();
		console.log(this.filename);
		if(http.status == 204)
			return '<div class="uploadedFile"><i class="fa fa-4x fa-file-archive-o"></i><p class="filename">'+this.filename+'</p></div>';
		else{
			return '<img src="../images/ajax-loader.gif" alt="'+this.filename+' is loading">';
		}
	}else
		return window.location.origin+files.baseURL+'/'+this.md5;
}
Template.uploadFiles.rendered = function(){
	// This assigns a file upload drop zone to some DOM node
	files.resumable.assignDrop($(".fileDrop"));
	// This assigns a browse action to a DOM node
	files.resumable.assignBrowse($("#uploadFile"));
	// When a file is added via drag and drop
	files.resumable.on('fileAdded', function (file) {
		// Create a new file in the file collection to upload
		files.insert({
			_id: file.uniqueIdentifier,  // This is the ID resumable will use
			metadata: {article_id: new Meteor.Collection.ObjectID($('#article_id').val())},
			filename: file.fileName,
			contentType: file.file.type
		},function (err, _id) {  // Callback to .insert
			if(err)
				return console.error("File creation failed!", err);
			// Once the file exists on the server, start uploading
			files.resumable.upload();
			_fileDep.changed();
		});
	});
	$( '.scrollable' ).bind( 'mousewheel DOMMouseScroll', function ( e ) {
		var e0 = e.originalEvent,
			delta = e0.wheelDelta || -e0.detail;
		this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
		e.preventDefault();
	});
}
Meteor.startup(function(){
	if(Meteor.isServer){
		Deps.autorun(function () {
			// Sending userId prevents a race condition
			Meteor.subscribe('upFiles');
			// $.cookie() assumes use of "jquery-cookie" Atmosphere package.
			// You can use any other cookie package you may prefer...
			$.cookie('X-Auth-Token', Accounts._storedLoginToken());
		});
	}
});

})();
