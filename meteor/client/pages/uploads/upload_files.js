Template.uploadFiles.events({
	'click .zeroclipboard-is-hover': function(){
		notifier('Copied to Clipboard','info');
	}
});
Template.uploadFiles.rendered = function(tmp){
	ZeroClipboard.config({swfPath: 'http://ikb.l2share.net:8080/resources/flash/ZeroClipboard.swf'});
	new ZeroClipboard($('#' + this.data._id));
};