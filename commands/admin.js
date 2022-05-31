exports.run = async (client, message) => {

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('No tienes permisos')
    
    message.channel.send({
        embed: {
            color: '#ef763d',
            author: { name: 'Panel de ayuda' },
            footer: { text: 'Panel de ayuda de Administracion' },
            fields: [
                { name: 'Admin', value: '`clear`, `lockdown`, `ban`, `kick`, `mute`, `tempban`, `tempmute`' },
                { name: 'Utilidades Sugerencias', value: '`accept`, `denegar`'},
            ],
            timestamp: new Date(),
        },
    });

};