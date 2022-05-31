module.exports = (client, message, playlist) => {

    message.channel.send(`${client.emotes.music} - ${playlist.title} ha sido añadida a la lista! (**${playlist.items.length}** canciones) !`);

};