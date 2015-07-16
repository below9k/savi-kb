(function(){_procDep = new Deps.Dependency;
Template.imex.events({
	'keyup #project_json_text': function(e){
		var v = $(e.currentTarget).val();
		if(v.length > 4){
			try{
				v = JSON.parse(v);
			}catch(e){
				$('#project_json_text').addClass('bg-danger');
				console.log('error',e);
				return false;
			}
			_procDep.changed();
			$('#project_json_text').removeClass('bg-danger');
			v.settings.push({'name': '/savi-core/client/project-name', 'value': v.name});
			delete v.name;
			v.settings.sort();
			v.drivers = _(v.drivers).groupBy(function(o) {
				return o.name;
			});
			var a = [];
			for(var p in v.drivers){
				var q = {};
				q[p] = v.drivers[p];
				if(q[p][0].type === 'driver')
					delete q.p;
				else{
					for(var i=0;i<q[p].length;i++){
						if(q[p][i].metaName){
							q[p][i]['driverKlass'] = q[p][i].metaName;
							delete q[p][i].metaName;
						}
						if(q[p][i].type === 'switch' && typeof q[p][i].videoInputMap !== "undefined"){
							q[p][i]['inputMap'] = q[p][i].videoInputMap;
							delete q[p][i].videoInputMap;
							q[p][i]['outputMap'] = q[p][i].videoOutputMap;
							delete q[p][i].videoOutputMap;
						}else if(q[p][i].type === 'amplifier' && typeof q[p][i].audioInputMap !== "undefined"){
							q[p][i]['inputMap'] = q[p][i].audioInputMap;
							delete q[p][i].videoInputMap;
							q[p][i]['outputMap'] = q[p][i].audioOutputMap;
							delete q[p][i].videoOutputMap;
						}
					}
				}
				a.push(q);
			}
			v.drivers = a;
			v.devices = _(v.devices).groupBy(function(o) {
				return o.name;
			});
			a = [];
			for(var p in v.devices){
				q = {};
				q[p] = v.devices[p];
				if(q[p][0].type === 'driver')
					delete q.p;
				if(q[p][0].type === 'source'){
					for(var i=0;i<q[p].length;i++){
						q[p][i].type = 'source';
						q[p][i].driver = 'driver';
					}
				}
				a.push(q);
			}
			v.devices = a;
			SessionAmplify.set('buildMe',v);
			console.log('json',v);
		}
		return false;
	},
	'click .remove_item': function(e){
		var t = $(e.currentTarget);
		var i = t.attr('id');
		console.log('deleting',i);
		update(i);
	},
	'change select': function(){
		console.log('proc changed 2');
		_procDep.changed();
	},
	'keyup, change .watch': function(e){
		var t = $(e.currentTarget);
		var i = t.attr('id');
		var v = t.val();
		if(i !== 'project_json_text'){
			//console.log('changing',v);
			update(i,v);
		}
	},
	'click .delete_dupes': function(e){
		var r = confirm('Remove duplicates? This will remove even changed names in this group. Are sure?');
		var s = SessionAmplify.get('buildMe');
		if(r){
			var t = $(e.currentTarget);
			var i = t.attr('id').split('-_-');
			s[i[0]][i[1]][i[2]].splice(1,s[i[0]][i[1]][i[2]].length-1);
			SessionAmplify.set('buildMe',s);
			$('#'+i[0]).val(i[1]);
		}
	},
	'click .enumerate_dupes': function(e){
		var r = confirm('Enumerate duplicates (..1, ..2, ..3)? Are sure?');
		var s = SessionAmplify.get('buildMe');
		if(r){
			var t = $(e.currentTarget);
			var i = t.attr('id').split('-_-');
			for(var k=0;k<s[i[0]][i[1]][i[2]].length;k++){
				s[i[0]][i[1]][i[2]][k].name = s[i[0]][i[1]][i[2]][k].name + ' ' + (k+1);
			}
			SessionAmplify.set('buildMe',s);
			$('#'+i[0]).val(i[1]);
		}
	}
});
Template.imex.doStep2 = function(){
	_procDep.depend();
	try{
		var v = $('#project_json_text').val();
		if(v.length > 4)
			v = JSON.parse(v);
	}catch(e){
		console.log('error',e);
		return false;
	}
	return true;
}
Template.imex.editDriver = function(){
	_procDep.depend();
	var v = $('#drivers').val();
	var s = SessionAmplify.get('buildMe');
	var a = [];
	if(!s.drivers)
		return false;
	else
		s = s.drivers[v];
	for(var p in s){
		if(s[p].length > 1)
			s[p][0]['count'] = s[p].length;
		for(var i=0;i<s[p].length;i++){
			s[p][i]['gName'] = p;
			s[p][i]['group'] = v;
			s[p][i]['item'] = i;
		}
		a.push(s[p]);
	}
	//console.log('editDriver',a);
	return a[0];
}
Template.imex.editDevice = function(){
	_procDep.depend();
	var v = $('#devices').val();
	var s = SessionAmplify.get('buildMe');
	var a = [];
	if(!s.devices)
		return false;
	else
		s = s.devices[v];
	for(var p in s){
		if(s[p].length > 1)
			s[p][0]['count'] = s[p].length;
		for(var i=0;i<s[p].length;i++){
			s[p][i]['gName'] = p;
			s[p][i]['group'] = v;
			s[p][i]['item'] = i;
		}
		a.push(s[p]);
	}
	//console.log('editDevice',a);
	return a[0];
}
Template.imex.getSettings = function(){
	m = SessionAmplify.get('buildMe');
	if(!m.settings)
		return false;
	else
		m = m.settings;
	for(var i=0;i<m.length;i++){
		m[i]['gName'] = 'settings';
		m[i]['item'] = i;
	}
	return m;
}
Template.imex.getMacros = function(){
	var a = [];
	var m = SessionAmplify.get('buildMe');
	if(!m.devices)
		return false;
	else
		m = m.devices;
	for(i=0;i<m.length;i++){
		for(var p in m[i]){
			if(m[i][p].length === 1 && m[i][p][0].type === 'macro'){
				m[i][p][0]['group'] = i;
				m[i][p][0]['item'] = 0;
				a.push(m[i][p][0]);
			}else{
				for(j=0;j<m[i][p].length;j++){
					if(m[i][p][j].type === 'macro'){
						m[i][p][j]['group'] = i;
						m[i][p][j]['item'] = j;
						a.push(m[i][p][j]);
					}
				}
			}
		}
	}
	//console.log('getMacros',a);
	return a;
}
Template.imex.getDevices = function(){
	var a = [];
	var d = SessionAmplify.get('buildMe');
	if(!d.devices)
		return false;
	else
		d = d.devices;
	for(i=0;i<d.length;i++){
		for(var p in d[i]){
			if(d[i][p].length === 1 && d[i][p][0].type !== 'macro'){
				//d[i][p][0]['gName'] = p;
				d[i][p][0]['group'] = i;
				d[i][p][0]['item'] = 0;
				a.push(d[i][p][0]);
			}else{
				if(d[i][p][0].type !== 'macro'){
					//d[i][p][0]['gName'] = p;
					d[i][p][0]['count'] = d[i][p].length;
					d[i][p][0]['group'] = i;
					a.push(d[i][p][0]);
				}
			}
		}
	}
	//console.log('getDevices',a);
	return a;
}
Template.imex.getDrivers = function(){
	var a = [];
	var d = SessionAmplify.get('buildMe');
	if(!d.drivers)
		return false;
	else
		d = d.drivers;
	for(i=0;i<d.length;i++){
		for(var p in d[i]){
			if(d[i][p].length === 1){
				//d[i][p][0]['gName'] = p;
				d[i][p][0]['group'] = i;
				d[i][p][0]['item'] = 0;
				a.push(d[i][p][0]);
			}else if(d[i][p].length !== 0){
				//d[i][p][0]['gName'] = p;
				d[i][p][0]['count'] = d[i][p].length;
				d[i][p][0]['group'] = i;
				a.push(d[i][p][0]);
			}
		}
	}
	//console.log('getDrivers',a);
	return a;
}
//
//	Fix
//		This
//			Helper
//					Its
//						Broken
Template.imex.putMap = function(m){
	var out = '<select class="form-control">';
	for(var p in m)
		out = out + '<option value="'+m[p]+'">'+ p +' : '+ m[p] +'</option>';
	out = out + '</select>';
	return out;
}
Template.imex.typeSelection = function(name,group,gName,item,d){
	var types = [
		'amplifier',
		'cd',
		'dvd',
		'driver',
		'macro',
		'source',
		'satellite',
		'switch',
		'speaker',
		'television'
	];
	var out = '<select class="form-control watch" id="'+d+'-_-'+group+'-_-'+gName+'-_-'+item+'-_-type">';
	for(var i=0;i<types.length;i++){
		if(name !== types[i])
			out = out + '<option value="'+types[i]+'">'+types[i]+'</option>';
		else
			out = out + '<option value="'+types[i]+'" selected>'+types[i]+'</option>';
	}
	return out + '</select>';
}
Template.imex.driverKlassSelection = function(name,group,gName,item){
	var types = [
		'c4-amplifier',
		'c4-switch',
		'c4-television'
	];
	var out = '<select class="form-control watch" id="drivers-_-'+group+'-_-'+gName+'-_-'+item+'-_-driverKlass">';
	for(var i=0;i<types.length;i++){
		if(name !== types[i])
			out = out + '<option value="'+types[i]+'">'+types[i]+'</option>';
		else
			out = out + '<option value="'+types[i]+'" selected>'+types[i]+'</option>';
	}
	return out + '</select>';
}
Template.imex.driverSelection = function(name,group,gName,item){
	var out = '<select class="form-control watch" id="devices-_-'+group+'-_-'+gName+'-_-'+item+'-_-driver">';
	var s = SessionAmplify.get('buildMe').drivers;
	for(var k=0;k<s.length;k++){
		for(var p in s[k]){
			for(var q=0;q<s[k][p].length;q++){
				if(q > 0){
					if(s[k][p][q].name !== s[k][p][q - 1].name){
						if(name !== s[k][p][0])
							out = out + '<option value="'+s[k][p][q].name+'">'+s[k][p][q].name+'</option>';
						else
							out = out + '<option value="'+s[k][p][q].name+'" selected>'+s[k][p][q].name+'</option>';
					}
				}else{
					if(name !== s[k][p][0].name)
						out = out + '<option value="'+s[k][p][0].name+'">'+s[k][p][0].name+'</option>';
					else
						out = out + '<option value="'+s[k][p][0].name+'" selected>'+s[k][p][0].name+'</option>';
				}
			}
		}
	}
	if(name !== 'driver')
		out = out + '<option value="driver">driver</option>';
	else
		out = out + '<option value="driver" selected>driver</option>';
	return out + '</select>';
}
Template.imex.isSpeaker = function(s){
	if(s === 'speaker')
		return true;
	return false;
}
Template.imex.doBuild = function(){
	var s = SessionAmplify.get('buildMe');
	var out = {};
	out['settings'] = s.settings;
	out['drivers'] = [];
	for(var i=0;i<s.drivers;i++){
		for(var p in s.drivers[i]){
			for(var k=0;k<s.drivers[i][p].length;k++){
				console.log(s.drivers[i][p][k]);
				out['drivers'].push(s.drivers[i][p][k]);
			}
		}
	}
	out['devices'] = [];
	for(var i=0;i<s.devices;i++){
		for(var p in s.devices[i]){
			for(var k=0;k<s.devices[i][p].length;k++){
				console.log(s.devices[i][p][k]);
				out['devices'].push(s.devices[i][p][k]);
			}
		}
	}
	return JSON.stringify(out, null, "\t");
}
Template.imex.rendered = function(){
}
function update(i,v){
	// [0]: drivers,devices,settings,name
	// [1]: index ^
	// [2]: name
	// [3]: index ^
	// [4]: fields:: name,type,driver,index,count
	var s = SessionAmplify.get('buildMe');
	if(!Array.isArray(i))
		i = i.split('-_-');
	for(var k=0;k<i.length;k++){
		if(!isNaN(parseFloat(i[k])) && isFinite(i[k]))
			i[k] = parseInt(i[k]);
	}
	if(v){
		switch(i.length-1){
			case 2:
				//console.log('s2',s[i[0]][i[1]][i[2]],v);
				s[i[0]][i[1]][i[2]] = v;
				break;
			case 3:
				//console.log('s3',s[i[0]][i[1]][i[2]][i[3]],v);
				s[i[0]][i[1]][i[2]][i[3]] = v;
				break;
			case 4:
				//console.log('s4',s[i[0]][i[1]][i[2]][i[3]][i[4]],v);
				s[i[0]][i[1]][i[2]][i[3]][i[4]] = v;
				break;
			case 5:
				//console.log('s5',s[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]],v);
				s[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]] = v;
				break;
			case 6:
				//console.log('s6',s[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]][i[6]],v);
				s[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]][i[6]] = v;
				break;
			default:
				console.log('Invalid ID - no action taken',i);
		}
	}else{
		switch(i.length-1){
			case 2:
				//console.log('s2',s[i[0]][i[1]][i[2]],v);
				delete s[i[0]][i[1]].i[2];
				break;
			case 3:
				//console.log('s3',s[i[0]][i[1]][i[2]][i[3]],v);
				s[i[0]][i[1]][i[2]].splice(i[3],1);
				break;
			case 4:
				//console.log('s4',s[i[0]][i[1]][i[2]][i[3]][i[4]],v);
				delete s[i[0]][i[1]][i[2]][i[3]].i[4];
				break;
			case 5:
				//console.log('s5',s[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]],v);
				s[i[0]][i[1]][i[2]][i[3]][i[4]].splice(i[5],1);
				break;
			case 6:
				//console.log('s6',s[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]][i[6]],v);
				s[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]].splice(i[6],1);
				break;
			default:
				console.log('Invalid ID - no action taken',i);
		}
	}
	console.log('updated',i,((v) ? v : 'deleted'));
	console.log('buildMe',s);
	SessionAmplify.set('buildMe',s);
}

})();
