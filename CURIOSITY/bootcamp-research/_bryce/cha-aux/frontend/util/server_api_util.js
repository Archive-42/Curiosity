export const createServer = formData =>
	$.ajax({
		method: 'POST',
		url: '/api/servers',
		data: formData,
		contentType: false,
		processData: false
	});

export const getServers = filters =>
	$.ajax({
		method: 'GET',
		url: '/api/servers',
		data: filters
	});

export const getServer = id =>
	$.ajax({
		method: 'GET',
		url: `/api/servers/${id}`
	});

export const updateServer = (server, newMemberId) =>
	$.ajax({
		method: 'PATCH',
		url: `/api/servers/${server.id}`,
		data: { server, newMemberId }
	});

export const deleteServer = id =>
	$.ajax({
		method: 'DELETE',
		url: `/api/servers/${id}`
	});
