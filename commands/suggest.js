const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'suggest',

    run: async (client, message, args) => {
        const suggestQuery = args.join(" ");
        if (!suggestQuery) return message.reply('Especifica una sugerencia')
        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Sugerencia**: ${suggestQuery}`)
            .setColor('RANDOM')
            .setTimestamp()
            .addField("Status:", 'Pendiente')

        message.channel.send('Sugerencia Enviada!')
        message.guild.channels.cache.get('849471583340724235').send(embed).then(m => {
            m.react('👍')
            m.react('👎')
        })
    }
}