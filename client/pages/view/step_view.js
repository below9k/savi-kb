Template.stepView.rendered = function(){
	$('.lightbox img').panzoom({
		minScale: 0,
		increment: 0.2,
		disablePan: false,
		contain: false
	});
}