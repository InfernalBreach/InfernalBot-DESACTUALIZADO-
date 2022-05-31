exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - No estás en un canal de voz!`);

    if (!args[0]) return message.channel.send(`${client.emotes.error} - Por favor, di una canción!`);

    client.player.play(message, args.join(" "));

};
