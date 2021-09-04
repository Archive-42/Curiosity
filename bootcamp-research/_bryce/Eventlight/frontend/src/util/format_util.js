export const formatDateAndTime = ISODate => {
	const eventDate = new Date(ISODate)
	const eventDateString = eventDate.toDateString()
	const day = eventDateString.slice(0, 3)
	const month = eventDateString.slice(4, 7)
	const dateNum = eventDate.getDate()
	const year = eventDateString.slice(-4)
	const [hour, minute, extraTimeParts] = eventDate.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(':')
	const [, meridiem, timeZone] = extraTimeParts.split(' ')
	return `${day}, ${month} ${dateNum}, ${year}, ${hour}:${minute} ${meridiem} ${timeZone}`
}

export const formatMonth = ISODate => {
	const eventDate = new Date(ISODate)
	return eventDate.toDateString().slice(4, 7)
}

export const formatLongDateNum = ISODate => {
	const eventDate = new Date(ISODate)
	return eventDate.toDateString().slice(8, 10)
}
