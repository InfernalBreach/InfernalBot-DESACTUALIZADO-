module.exports = (client, message, queue) => {

    message.channel.send(`${client.emotes.error} - Música parada puesto que no hay más música en la lista!`);

};