exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - No estás en un canal de voz!`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No hay música sonando ahora mismo!`);

    client.player.shuffle(message);

    return message.channel.send(`${client.emotes.success} - Lista barajada **${client.player.getQueue(message).tracks.length}** canción(es) !`);

};
