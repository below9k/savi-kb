(function(){_imgDep = new Deps.Dependency;
Template.uploadImages.events({
	'click .remove_image': function(e){
		var c = confirm('Delete image?');
		var a = $(e.currentTarget).attr('data-image-id');
		if(c){
			var q = images.remove({_id: new Meteor.Collection.ObjectID(a)});
			if(q > 0)
				console.log('removed',a);
			else
				console.log('Error occured while removing the image.');
		}
	}
});
Template.uploadImages.getImages = function(){
	_imgDep.depend();
	var i = images.find(); //images.find({'metadata.article_id': new Meteor.Collection.ObjectID($('#article_id').val())});
	return i;
}
Template.uploadImages.uploadedImage = function(b){
	if(!b){
		var image_url = images.baseURL+'/'+this.md5;
		var http = new XMLHttpRequest();
		http.open('HEAD', image_url, false);
		http.send();
		if(http.status == 204)
			return '<img src="'+images.baseURL+'/'+this.md5+'" alt="'+this.filename+'" width="175" class="draggable_img" onerror="$(this).attr(\'src\', \'../images/ajax-loader.gif\')">';
		else{
			return '<img src="../images/ajax-loader.gif" alt="'+this.filename+' is loading">';
		}
	}else
		return '[img]'+images.baseURL+'/'+this.md5+'[/img]';
}
Template.uploadImages.rendered = function(){
	// This assigns a file upload drop zone to some DOM node
	images.resumable.assignDrop($(".imageDrop"));
	// This assigns a browse action to a DOM node
	images.resumable.assignBrowse($("#uploadImage"));
	// When a file is added via drag and drop
	images.resumable.on('fileAdded', function (file) {
		// Create a new file in the file collection to upload
		images.insert({
			_id: file.uniqueIdentifier,  // This is the ID resumable will use
			metadata: {article_id: new Meteor.Collection.ObjectID($('#article_id').val())},
			filename: file.fileName,
			contentType: file.file.type
		},function (err, _id) {  // Callback to .insert
			if(err)
				return console.error("File creation failed!", err);
			// Once the file exists on the server, start uploading
			images.resumable.upload();
			_imgDep.changed();
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
			Meteor.subscribe('upImages');
			// $.cookie() assumes use of "jquery-cookie" Atmosphere package.
			// You can use any other cookie package you may prefer...
			$.cookie('X-Auth-Token', Accounts._storedLoginToken());
		});
	}
});

})();
