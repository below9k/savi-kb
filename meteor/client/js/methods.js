if(Meteor.isClient){
	notifier = function(msg,type){
		switch(type){
			case 'error':
				Session.set('notifier',{msg:'<div class="bg-danger"><i class="fa fa-2x fa-times-circle"></i><span>&nbsp;' + msg + '</span><hr class="stripe-color" style="background-color:#B82323;"></div>'});
				$('body').find(".annoucement").css({'display':'inline-block'}).fadeIn(250).delay(1000).fadeOut(1500);
				break;
			case 'info':
				Session.set('notifier',{msg:'<div class="bg-info"><i class="fa fa-2x fa-bullhorn"></i><span>&nbsp;' + msg + '</span><hr class="stripe-color" style="background-color:#3482DA;"></div>'});
				$('body').find(".annoucement").css({'display':'inline-block'}).fadeIn(250).delay(1000).fadeOut(1500);
				break;
			case 'success':
				Session.set('notifier',{msg:'<div class="bg-success"><i class="fa fa-2x fa-check-circle"></i><span>&nbsp;' + msg + '</span><hr class="stripe-color" style="background-color:#23452E;"></div>'});
				$('body').find(".annoucement").css({'display':'inline-block'}).fadeIn(250).delay(1000).fadeOut(1500);
				break;
			case 'warning':
				Session.set('notifier',{msg:'<div class="bg-warning"><i class="fa fa-2x fa-exclamation-circle"></i><span>&nbsp;' + msg + '</span><hr class="stripe-color" style="background-color:#DACB34;"></div>'});
				$('body').find(".annoucement").css({'display':'inline-block'}).fadeIn(250).delay(1000).fadeOut(1500);
				break;
		}
	};
	update_title = function(preTitle,postTitle,version){
		preTitle = (preTitle) ? preTitle : '';
		postTitle = (postTitle) ? postTitle : '';
		version = (version) ? 'v' + settings.version : '';
		document.title = preTitle + ' ' + settings.title + ' ' + postTitle + version;
	};
}