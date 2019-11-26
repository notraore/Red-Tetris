export const sendInfo = (socket, title, description) => {
    socket.emit('info popup', {title: title, description: description})
}