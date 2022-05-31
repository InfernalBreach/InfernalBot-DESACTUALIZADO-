module.exports = (client, message, query, tracks, content, collector) => {

    message.channel.send(`${client.emotes.error} - Tienes que seleccionar un númeroo válido entre el **1** y el **${tracks.length}** !`);

};