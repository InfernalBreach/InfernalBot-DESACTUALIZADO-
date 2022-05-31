module.exports = (client, error, message) => {

    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - No hay música sonando!`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - No estás conectado a un canal de voz!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - I am not able to join your voice channel, please check my permissions !`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Algo salió mal... error: ${error}`);
    };

};
