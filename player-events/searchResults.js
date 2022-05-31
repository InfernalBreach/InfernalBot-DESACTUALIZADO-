module.exports = (client, message, query, tracks) => {

    message.channel.send({
        embed: {
            color: '#FF0000',
            author: { name: `Aquí están tus resultados para ${query}` },
            footer: { text: 'Música' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });

};