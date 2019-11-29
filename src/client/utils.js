import { equals, length, dropLast, indexOf, drop } from 'ramda'

export const getRoomName = (hash) => {
	const endOfWord = indexOf('[', hash) >= 0 ? indexOf('[', hash) : length(hash)
	const toCut = length(hash) - endOfWord

	if(indexOf('#', hash) < 0)
			return undefined
	const roomName = drop(1, dropLast(toCut, hash))
	if(equals(length(roomName), 0))
			return undefined
	return roomName
}

export const getUser = (hash) => {
	const toCut = indexOf('[', hash) + 1

	if(toCut === 0)
			return undefined
	const user = dropLast(1, drop(toCut, hash))
	if(equals(length(user) ,0))
			return undefined
	return user
}
