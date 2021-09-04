export const createChannel = channel =>
	$.ajax({
		method: 'POST',
		url: '/api/channels',
		data: { channel }
	});

export const getChannels = filters =>
	$.ajax({
		method: 'GET',
		url: '/api/channels',
		data: filters
	});

export const getChannel = id =>
	$.ajax({
		method: 'GET',
		url: `/api/channels/${id}`
	});

export const updateChannel = channel =>
	$.ajax({
		method: 'PATCH',
		url: `/api/channels/${channel.id}`,
		data: { channel }
	});

export const deleteChannel = id =>
	$.ajax({
		method: 'DELETE',
		url: `/api/channels/${id}`
	});
