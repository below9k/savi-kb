(function(){_contDep = new Deps.Dependency;
// add property checks to is checks
// .devicedata.proxies[.proxy][.__text]
// .devicedata.proxy
var isTv = function(t) {
	var proxy = [
		'tv', 'plasma', 'projector'
	]
	if ($.inArray(t, proxy) >= 0)
		return true;
	return false;
}
var isSource = function(t) {
	var proxy = [
		'cd', 'dvd'
	]
	if ($.inArray(t, proxy) >= 0)
		return true;
	return false;
}
var isSatellite = function(t) {
	return t === 'satellite';
}
var isSwitch = function(t) {
	var proxy = [
		'avswitch', 'aswitch'
	]
	if ($.inArray(t, proxy) >= 0)
		return true;
	return false;
}
var isAmplifier = function(t) {
	return t === 'amplifier';
}
var proxyTypeFix = function(p) {
	var proxy = {
		'tv': 'television',
		'plasma': 'television',
		'projector': 'television',
		'avswitch': 'switch',
		'aswitch': 'switch'
	}
	return (proxy[p]) ? proxy[p] : p;
}
var proxyDriverKlassFix = function(p) {
	var proxy = {
		'tv': 'c4-television',
		'plasma': 'c4-television',
		'projector': 'c4-television',
		'avswitch': 'c4-switch',
		'aswitch': 'c4-switch',
		'amplifier': 'c4-amplifier',
		'dvd': 'c4-dvd',
		'cd': 'c4-cd',
		'media-player': 'c4-dvd'
	}
	return (proxy[p]) ? proxy[p] : p;
}
Template.imexImport.events({
	'change #import': function(e) {
		var fr = new FileReader();
		var f = $(e.currentTarget).get(0).files[0];
		var n = f.name.split('.').pop();
		var txt,x,fin;
		fr.readAsText(f);
		fr.onload = function() {
			try {
				x = new x2j();
				txt = x.xml2json(x.parseXmlString(fr.result));
			} catch (e) {
				txt = 'Error: ' + e + '<br />' + fr.result;
			}
			console.log(txt);
			SessionAmplify.set('importMe', txt);
			fin = {
				settings: [{
					name: '/savi-core/control4/ip',
					value: '127.0.0.1'
				}, {
					name: '/savi-core/client/project-name',
					value: ''
				}, {
					name: '/savi-core/client/volume-preset-sort',
					value: [
						'Softer', 'Soft', 'Normal', 'Loud', 'Louder'
					]
				}],
				drivers: [{
					name: 'c4-satellite',
					type: 'satellite',
					outputs: ['Output']
				}, {
					name: 'source',
					type: 'source',
					outputs: ['Output']
				}, {
					name: 'c4-dvd',
					type: 'dvd',
					outputs: ['Output']
				}, {
					name: 'c4-cd',
					type: 'cd',
					outputs: ['Output']
				}, {
					name: 'c4-macro',
					type: 'macro',
					control4MacroId: 0
				}, {
					name: 'speaker',
					type: 'speaker',
					inputs: ['Input']
				}],
				devices: []
			}
			$('#cont').val('1');
			_contDep.changed();
			SessionAmplify.set('fin', fin);
		}
	}
});
Template.imexImport.isCont = function() {
	_contDep.depend();
	var ro = parseInt($('#run_once').val());
	if ($('#cont').val() === '1' && ro === 0) {
		$('#run_once').val('1');
		console.log('ran once');
		return true;
	}else if(ro > 0){
		console.log('ran more than once');
		return true;
	}
	return false;
}
Template.imexImport.parseFin = function() {
	// Also gonna get section TVs too
	// Get into project heirarchy
	var room_list;
	var imp = SessionAmplify.get('importMe');
	var conn = imp.currentstate.bindings.boundbinding;
	imp = imp.currentstate.systemitems.item;
	var fin = SessionAmplify.get('fin');
	var driverList = []
	fin.settings[1].value = imp.name;
	fin['scenes'] = [{}];
	fin.scenes[0]['name'] = 'Main';
	fin.scenes[0]['filterGroups'] = [{}];
	fin.scenes[0].filterGroups[0]['name'] = 'Rooms';
	fin.scenes[0].filterGroups[0]['filters'] = [];
	fin.scenes[0]['sections'] = [];
	fin.scenes[0].sections[0] = {
		name: 'Displays',
		type: 'televisions',
		items: [],
		presets: []
	}
	fin.scenes[0].sections[1] = {
		name: 'Audio',
		type: 'speaker',
		items: [],
		presets: []
	}
	fin.scenes[0].sections[2] = {
		name: 'Macros',
		type: 'macros',
		items: []
	}
	fin['volumeProfile'] = [{}];
	fin.volumeProfile[0] = {
		name: 'Default',
		defaultValue: 50,
		presets: {
			Softer: 45,
			Soft: 50,
			Normal: 55,
			Loud: 60,
			Louder: 65
		}
	}
	fin['connections'] = []
	//Determine structure and fix it up
	for (var i = 0; i < imp.subitems.item.length; i++) {
		if (imp.subitems.item[i].type === '2') {
			if (Array.isArray(imp.subitems.item[i]))
				room_list = imp.subitems.item[i];
			else if (Array.isArray(imp.subitems.item[i].subitems.item))
				room_list = imp.subitems.item[i].subitems.item;
			else if (Array.isArray(imp.subitems.item[i].subitems.item.subitems.item))
				room_list = imp.subitems.item[i].subitems.item.subitems.item;
			else if (Array.isArray(imp.subitems.item[i].subitems.item.subitems.item.subitems.item))
				room_list = imp.subitems.item[i].subitems.item.subitems.item.subitems.item;
			else if (Array.isArray(imp.subitems.item[i].subitems.item.subitems.item.subitems.item.subitems.item) && imp.subitems.item[i].subitems.item.subitems.item.subitems.item.subitems.item)
				room_list = imp.subitems.item[i].subitems.item.subitems.item.subitems.item.subitems.item;
			//Home -> House/Office -> Main -> Room List (here)
			for (var k = 0; k < room_list.length; k++) {
				//Room List -> Devices List in room (here)
				fin.devices.push({
					name: room_list[k].name,
					type: 'speaker',
					driver: 'speaker',
					volumeProfile: 'Default'
				});
				fin.scenes[0].sections[1].items.push(room_list[k].name);
				fin.scenes[0].filterGroups[0].filters.push({
					name: room_list[k].name,
					items: [room_list[k].name]
				});
				if (room_list[k].subitems) {
					for (var j = 0; j < room_list[k].subitems.item.length; j++) {
						if (room_list[k].subitems.item[j].devicedata) {
							if (room_list[k].subitems.item[j].devicedata.proxies) {
								// Check proxy for relavent types [avswitch,dvd,tv,cd,..]
								// Device List -> Device data check proxy
								if (room_list[k].subitems.item[j].devicedata.proxies || room_list[k].subitems.item[j].devicedata.proxy) {
									if (isTv(room_list[k].subitems.item[j].devicedata.proxies.proxy.__text) ||
										isTv(room_list[k].subitems.item[j].devicedata.proxies.proxy) ||
										isTv(room_list[k].subitems.item[j].devicedata.proxy)) {
										//fin.scenes[0].filterGroups[0].filters[k].items.push(room_list[k].subitems.item[j].subitems.item.name);
										fin.scenes[0].sections[0].items.push(room_list[k].subitems.item[j].subitems.item.name);
										for (var g = 0; g < fin.scenes[0].filterGroups[0].filters.length; g++) {
											if (fin.scenes[0].filterGroups[0].filters[g].name) {
												if (fin.scenes[0].filterGroups[0].filters[g].name === room_list[k].name)
													fin.scenes[0].filterGroups[0].filters[g].items.push(room_list[k].subitems.item[j].subitems.item.name);
											}
										}
										fin.devices.push({
											name: room_list[k].subitems.item[j].subitems.item.name,
											type: 'television',
											driver: room_list[k].subitems.item[j].name,
											driverOptions: {
												control4Id: room_list[k].subitems.item[j].subitems.item.id
											}
										});
									}
									if (isSource(room_list[k].subitems.item[j].devicedata.proxies.proxy.__text) ||
										isSource(room_list[k].subitems.item[j].devicedata.proxies.proxy) ||
										isSource(room_list[k].subitems.item[j].devicedata.proxy)) {
										fin.devices.push({
											name: room_list[k].subitems.item[j].subitems.item.name,
											type: "source",
											driver: "driver",
											driverOptions: {
												control4Id: room_list[k].subitems.item[j].subitems.item.id
											}
										});
									}
									if (isSatellite(room_list[k].subitems.item[j].devicedata.proxies.proxy.__text) ||
										isSatellite(room_list[k].subitems.item[j].devicedata.proxies.proxy) ||
										isSatellite(room_list[k].subitems.item[j].devicedata.proxy)) {
										fin.devices.push({
											name: room_list[k].subitems.item[j].subitems.item.name,
											type: "satellite",
											driver: "c4-satellite",
											driverOptions: {
												control4Id: room_list[k].subitems.item[j].subitems.item.id,
												ipAddress: 'Local ip address to satellite'
											}
										});
									}
									if (isAmplifier(room_list[k].subitems.item[j].devicedata.proxies.proxy.__text) ||
										isAmplifier(room_list[k].subitems.item[j].devicedata.proxies.proxy) ||
										isAmplifier(room_list[k].subitems.item[j].devicedata.proxy)) {
										fin.devices.push({
											name: room_list[k].subitems.item[j].subitems.item.name,
											type: "amplifier",
											driver: room_list[k].subitems.item[j].name,
											driverOptions: {
												control4Id: room_list[k].subitems.item[j].subitems.item.id
											}
										});
									}
									if (isSwitch(room_list[k].subitems.item[j].devicedata.proxies.proxy.__text) ||
										isSwitch(room_list[k].subitems.item[j].devicedata.proxies.proxy) ||
										isSwitch(room_list[k].subitems.item[j].devicedata.proxy)) {
										fin.devices.push({
											name: room_list[k].subitems.item[j].subitems.item.name,
											type: "switch",
											driver: room_list[k].subitems.item[j].name,
											driverOptions: {
												control4Id: room_list[k].subitems.item[j].subitems.item.id
											}
										});
									}
									if (room_list[k].subitems.item[j].type === '6') {
										if ($.inArray(room_list[k].subitems.item[j].name, driverList) === -1) {
											driverList.push(room_list[k].subitems.item[j].name);
											if (Array.isArray(room_list[k].subitems.item[j].devicedata.connections.connection) && room_list[k].subitems.item[j].subitems.item.devicedata) {
												var driver = {
													name: room_list[k].subitems.item[j].name,
													type: proxyTypeFix(room_list[k].subitems.item[j].subitems.item.devicedata.control),
													driverKlass: proxyDriverKlassFix((room_list[k].subitems.item[j].devicedata.proxies.proxy.__text) ? room_list[k].subitems.item[j].devicedata.proxies.proxy.__text : room_list[k].subitems.item[j].devicedata.proxies.proxy),
												}
												for (var f = 0; f < room_list[k].subitems.item[j].devicedata.connections.connection.length; f++) {
													var prefix;
													if ((room_list[k].subitems.item[j].devicedata.connections.connection[f].id >= 1000 && room_list[k].subitems.item[j].devicedata.connections.connection[f].id < 2000) ||
														(room_list[k].subitems.item[j].devicedata.connections.connection[f].id >= 2000 && room_list[k].subitems.item[j].devicedata.connections.connection[f].id < 3000))
														prefix = 'video_';
													else if ((room_list[k].subitems.item[j].devicedata.connections.connection[f].id >= 3000 && room_list[k].subitems.item[j].devicedata.connections.connection[f].id < 4000) ||
														(room_list[k].subitems.item[j].devicedata.connections.connection[f].id >= 4000 && room_list[k].subitems.item[j].devicedata.connections.connection[f].id < 5000))
														prefix = 'audio_';
													if (room_list[k].subitems.item[j].devicedata.connections.connection[f].consumer === 'True') {
														if (!driver.inputMap)
															driver['inputMap'] = {}
														if (room_list[k].subitems.item[j].devicedata.connections.connection[f].connectionname.indexOf('Room Selection') === -1)
															driver.inputMap[prefix + room_list[k].subitems.item[j].devicedata.connections.connection[f].connectionname] = room_list[k].subitems.item[j].devicedata.connections.connection[f].id;
													} else {
														if (!driver.outputMap)
															driver['outputMap'] = {}
														if (room_list[k].subitems.item[j].devicedata.connections.connection[f].connectionname.indexOf('Room Selection') === -1)
															driver.outputMap[prefix + room_list[k].subitems.item[j].devicedata.connections.connection[f].connectionname] = room_list[k].subitems.item[j].devicedata.connections.connection[f].id;
													}
												}
												if (driver.type !== 'satellite' && driver.name.toLowerCase() !== 'tunein') fin.drivers.push(driver);
											}
										}
									}
								}
							} else if (room_list[k].subitems.item[j].subitems) {
								// No proxy - lets try something else? Maybe its another room
								if (Array.isArray(room_list[k].subitems.item[j].subitems.item)) {
									fin.devices.push({
										name: room_list[k].subitems.item[j].name,
										type: 'speaker',
										driver: 'speaker',
										volumeProfile: 'Default'
									});
									fin.scenes[0].filterGroups[0].filters.push({
										name: room_list[k].subitems.item[j].name,
										items: [room_list[k].subitems.item[j].subitems.item.name]
									});
									fin.scenes[0].sections[1].items.push(room_list[k].subitems.item[j].name);
									for (var q = 0; q < room_list[k].subitems.item[j].subitems.item.length; q++) {
										if (room_list[k].subitems.item[j].subitems.item[q].subitems) {
											console.log('test',room_list[k].subitems.item[j].subitems.item[q]);
											if (room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies || room_list[k].subitems.item[j].subitems.item[q].devicedata.proxy) {
												//
												// Redo is checks to compensate for undefined properites like 
												// room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies
												// is not always correct - room_list[k].subitems.item[j].subitems.item[q].devicedata.proxy
												//
												if (isTv(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy.__text) ||
													isTv(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy) ||
												    isTv(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxy)) {
													fin.scenes[0].sections[0].items.push(room_list[k].subitems.item[j].subitems.item[q].subitems.item.name);
													for (var g = 0; g < fin.scenes[0].filterGroups[0].filters.length; g++) {
														if (fin.scenes[0].filterGroups[0].filters[g].name === room_list[k].subitems.item.name) {
															fin.scenes[0].filterGroups[0].filters.push({
																name: room_list[k].subitems[j].name,
																items: [room_list[k].subitems.item[j].subitems.item[q].subitems.item.name]
															});
														}
													}
													fin.devices.push({
														name: room_list[k].subitems.item[j].subitems.item[q].subitems.item.name,
														type: 'television',
														driver: room_list[k].subitems.item[j].subitems.item[q].name,
														driverOptions: {
															control4Id: room_list[k].subitems.item[j].subitems.item[q].subitems.item.id
														}
													});
												}
												if (isSource(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy.__text) ||
													isSource(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy) ||
												    isSource(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxy)) {
													fin.devices.push({
														name: room_list[k].subitems.item[j].subitems.item[q].subitems.item.name,
														type: "source",
														driver: "driver",
														driverOptions: {
															control4Id: room_list[k].subitems.item[j].subitems.item[q].subitems.item.id
														}
													});
												}
												if (isSatellite(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy.__text) ||
													isSatellite(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy) ||
												    isSatellite(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxy)) {
													fin.devices.push({
														name: room_list[k].subitems.item[j].subitems.item.name,
														type: "satellite",
														driver: "c4-satellite",
														driverOptions: {
															control4Id: room_list[k].subitems.item[j].subitems.item.id,
															ipAddress: 'Local ip address to satellite'
														}
													});
												}
												if (isAmplifier(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy.__text) ||
													isAmplifier(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy) ||
												    isAmplifier(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxy)) {
													fin.devices.push({
														name: room_list[k].subitems.item[j].subitems.item[q].subitems.item.name,
														type: "amplifier",
														driver: room_list[k].subitems.item[j].subitems.item[q].name,
														driverOptions: {
															control4Id: room_list[k].subitems.item[j].subitems.item[q].subitems.item.id
														}
													});
												}
												if (isSwitch(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy.__text) ||
													isSwitch(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy) ||
												    isSwitch(room_list[k].subitems.item[j].subitems.item[q].devicedata.proxy)) {
													fin.devices.push({
														name: room_list[k].subitems.item[j].subitems.item[q].subitems.item.name,
														type: "switch",
														driver: room_list[k].subitems.item[j].subitems.item[q].name,
														driverOptions: {
															control4Id: room_list[k].subitems.item[j].subitems.item[q].subitems.item.id
														}
													});
												}
												// Driver time!
												if (room_list[k].subitems.item[j].subitems.item[q].type === '6') {
													if ($.inArray(room_list[k].subitems.item[j].subitems.item[q].name, driverList) === -1) {
														driverList.push(room_list[k].subitems.item[j].subitems.item[q].name);
														if (Array.isArray(room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection) && room_list[k].subitems.item[j].subitems.item[q].subitems.item.devicedata) {
															driver = {
																name: room_list[k].subitems.item[j].subitems.item[q].name,
																type: proxyTypeFix(room_list[k].subitems.item[j].subitems.item[q].subitems.item.devicedata.control),
																driverKlass: proxyDriverKlassFix((room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy.__text) ? room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy.__text : room_list[k].subitems.item[j].subitems.item[q].devicedata.proxies.proxy),
															}
															for (var f = 0; f < room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection.length; f++) {
																prefix = '';
																if ((room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id >= 1000 && room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id < 2000) ||
																	(room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id >= 2000 && room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id < 3000))
																	prefix = 'video_';
																else if ((room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id >= 3000 && room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id < 4000) ||
																	(room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id >= 4000 && room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id < 5000))
																	prefix = 'audio_';
																if (room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].consumer === 'True') {
																	if (!driver.inputMap)
																		driver.inputMap = {}
																	if (room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].connectionname.indexOf('Room Selection') === -1)
																		driver['inputMap'][prefix + room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].connectionname] = room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id;
																} else {
																	if (!driver.outputMap)
																		driver.outputMap = {}
																	if (room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].connectionname.indexOf('Room Selection') === -1)
																		driver['outputMap'][prefix + room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].connectionname] = room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[f].id;
																}
															}
															if (driver.type !== 'satellite' && driver.name.toLowerCase() !== 'tunein') fin.drivers.push(driver);
														}
													}
												}
											} else {
												if (Array.isArray(room_list[k].subitems.item[j].subitems.item[q].subitems.item)) {
													fin.devices.push({
														name: room_list[k].subitems.item[j].subitems.item[q].name,
														type: 'speaker',
														driver: 'speaker',
														volumeProfile: 'Default'
													});
													fin.scenes[0].filterGroups[0].filters.push({
														name: room_list[k].subitems.item[j].subitems.item[q].subitems.item.name,
														items: [room_list[k].subitems.item[j].subitems.item[q].subitems.item.name]
													});
													fin.scenes[0].sections[1].items.push(room_list[k].subitems.item[j].subitems.item[q].name);
													for (var f = 0; f < room_list[k].subitems.item[j].subitems.item[q].subitems.item.length; f++) {
														if (room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies || room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxy) {
															if (isTv(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy.__text) ||
																isTv(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy) ||
																isTv(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxy)) {
																fin.scenes[0].sections[0].items.push(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.name);
																for (var g = 0; g < fin.scenes[0].filterGroups[0].filters.length; g++) {
																	if (fin.scenes[0].filterGroups[0].filters[g].name === room_list[k].subitems[j].subitems.item[q].name) {
																		fin.scenes[0].filterGroups[0].filters.push({
																			name: room_list[k].subitems[j].subitems.item[q].name,
																			items: [room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.name]
																		});
																	}
																}
																fin.devices.push({
																	name: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.name,
																	type: 'television',
																	driver: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].name,
																	driverOptions: {
																		control4Id: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.id
																	}
																});
															}
															if (isSource(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy.__text) ||
																isSource(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy) ||
																isSource(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxy)) {
																fin.devices.push({
																	name: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.name,
																	type: "source",
																	driver: "driver",
																	driverOptions: {
																		control4Id: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.id
																	}
																});
															}
															if (isSatellite(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy.__text) ||
																isSatellite(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy) ||
																isSatellite(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxy)) {
																fin.devices.push({
																	name: room_list[k].subitems.item[j].subitems.item.name,
																	type: "satellite",
																	driver: "c4-satellite",
																	driverOptions: {
																		control4Id: room_list[k].subitems.item[j].subitems.item.id,
																		ipAddress: 'Local ip address to satellite'
																	}
																});
															}
															if (isAmplifier(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy.__text) ||
																isAmplifier(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy) ||
																isAmplifier(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxy)) {
																fin.devices.push({
																	name: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.name,
																	type: "amplifier",
																	driver: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].name,
																	driverOptions: {
																		control4Id: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.id
																	}
																});
															}
															if (isSwitch(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy.__text) ||
																isSwitch(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy) ||
																isSwitch(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxy)) {
																fin.devices.push({
																	name: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.name,
																	type: "switch",
																	driver: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].name,
																	driverOptions: {
																		control4Id: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.id
																	}
																});
															}
															// Driver time again!
															if (room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].type === '6') {
																if ($.inArray(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].name, driverList) === -1) {
																	driverList.push(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].name);
																	if (Array.isArray(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection) && room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.devicedata) {
																		driver = {
																			name: room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].name,
																			type: proxyTypeFix(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].subitems.item.devicedata.control),
																			driverKlass: proxyDriverKlassFix((room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy.__text) ? room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy.__text : room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.proxies.proxy),
																		}
																		for (var u = 0; u < room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection.length; f++) {
																			prefix = '';
																			if ((room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[f].id >= 1000 && room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[f].id < 2000) ||
																				(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[f].id >= 2000 && room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[f].id < 3000))
																				prefix = 'video_';
																			else if ((room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[f].id >= 3000 && room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[f].id < 4000) ||
																				(room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[f].id >= 4000 && room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[f].id < 5000))
																				prefix = 'audio_';
																			if (room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[u].consumer === 'True') {
																				if (!driver.inputMap)
																					driver.inputMap = {}
																				if (room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[u].connectionname.indexOf('Room Selection') === -1)
																					driver['inputMap'][prefix + room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[u].connectionname] = room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[u].id;
																			} else {
																				if (!driver.outputMap)
																					driver.outputMap = {}
																				if (room_list[k].subitems.item[j].subitems.item[q].devicedata.connections.connection[u].connectionname.indexOf('Room Selection') === -1)
																					driver['outputMap'][prefix + room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[u].connectionname] = room_list[k].subitems.item[j].subitems.item[q].subitems.item[f].devicedata.connections.connection[u].id;
																			}
																		}
																		if (driver.type !== 'satellite' && driver.name.toLowerCase() !== 'tunein') fin.drivers.push(driver);
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				} else
					console.log('Room with no subitems.. useless', room_list[k].name);
			}
		}
		if (imp.subitems.item[i].name === 'Macros') {
			var x = new x2j();
			var m = x.xml2json(x.parseXmlString(imp.subitems.item[i].state));
			fin.drivers[4].control4MacroId = imp.subitems.item[i].id;
			for (var k = 0; k < m.agent_macro.macros.macro.length; k++) {
				fin.scenes[0].sections[2].items.push(m.agent_macro.macros.macro[k].name);
				fin.devices.push({
					name: m.agent_macro.macros.macro[k].name,
					type: 'macro',
					driver: 'c4-macro',
					driverOptions: {
						control4Id: m.agent_macro.macros.macro[k].id
					}
				});
			}
		}
	}
	// CONNECTIONS!!!
	for (var i = 0; i < conn.length; i++) {
		if (!Array.isArray(conn[i].boundconsumers.bound)) {
			var from = conn[i].deviceid;
			var fromPort,to,toPort = null;
			toPort = conn[i].boundconsumers.bound.name;
			to = conn[i].boundconsumers.bound.deviceid;
			for (var j = 0; j < fin.devices.length; j++) {
				if (fin.devices[j].type !== 'speaker') {
					if (fin.devices[j].driverOptions.control4Id === from) {
						from = fin.devices[j].name;
						if (fin.devices[j].type === 'switch')
							fromPort = '';
					}
					if (fin.devices[j].driverOptions.control4Id === to)
						to = fin.devices[j].name;
				}
			}
			if (fromPort !== null && to !== null && toPort !== null) {
				fin.connections.push({
					from: from,
					fromPort: fromPort,
					to: to,
					toPort: toPort
				});
			} else if (fromPort === '' && to !== null && toPort !== null) {
				fin.connections.push({
					from: from,
					to: to,
					toPort: toPort
				});
			}
		} else {
			for (var j = 0; j < conn[i].boundconsumers.bound.length; j++) {
				fromPort = to = toPort = null;
				from = conn[i].deviceid;
				toPort = conn[i].boundconsumers.bound[j].name;
				to = conn[i].boundconsumers.bound[j].deviceid;
				for (var d = 0; d < fin.devices.length; d++) {
					if (fin.devices[d].type !== 'speaker') {
						if (fin.devices[d].driverOptions.control4Id === from) {
							from = fin.devices[d].name;
							if (fin.devices[d].type === 'switch')
								fromPort = '';
						}
						if (fin.devices[d].driverOptions.control4Id === to)
							to = fin.devices[d].name;
					}
				}
			}
			if (fromPort !== null && to !== null && toPort !== null) {
				fin.connections.push({
					from: from,
					fromPort: fromPort,
					to: to,
					toPort: toPort
				});
			} else if (fromPort === '' && to !== null && toPort !== null) {
				fin.connections.push({
					from: from,
					to: to,
					toPort: toPort
				});
			}
		}
	}
	fin.devices = _.uniq(fin.devices);
	fin.drivers = _.uniq(fin.drivers);
	//SessionAmplify.set('fin', fin);
	console.log('fin', fin);
	return imp.name + ' = ' + JSON.stringify(fin, null, '\t');
}

})();
