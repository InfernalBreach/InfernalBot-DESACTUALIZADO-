exports.run = async (client, message) => {

    message.channel.send({
        embed: {
            color: '#ef763d',
            author: { name: 'Panel de ayuda' },
            footer: { text: 'Panel de ayuda de música y utilidad' },
            fields: [
                { name: 'Bot', value: '`ping`' },
                { name: 'Música', value: '`play`, `pause`, `resume`, `queue`, `clear-queue`, `np`, `loop`, `skip`, `stop`' },
                { name: 'Sugerencias', value: '`suggest`'},
            ],
            timestamp: new Date(),
        },
    });
};