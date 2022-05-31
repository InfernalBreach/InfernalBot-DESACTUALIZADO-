const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'denegar',

    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('No tienes permisos')
        const messageID = args[0]
        const rejectQuery = args.slice(1).join(" ")

        if (!messageID) return message.reply('Especifica una ID de sugerencia!')
        if (!rejectQuery) return message.reply('Especifica una razon!')

        try {
            const suggestionChannel = message.guild.channels.cache.get('849472237819265024')
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID)
            const data = suggestedEmbed.embeds[0]
            const rejectEmbed = new MessageEmbed()
                .setAuthor(data.author.name, data.author.iconURL)
                .setDescription(data.description)
                .setColor('RED')
                .addField('Status: Rechazada', rejectQuery)

            message.channel.messages.fetch(messageID).then((m) => {
                m.delete()
            })
            message.guild.channels.cache.get('849472237819265024').send(rejectEmbed)
            
            message.channel.send('Sugerencia Rechazada!')
            const user = client.users.cache.find((u) => u.tag === data.author.name)
            user.send('Tu Sugerencia ha sido rechazada por un miembro del staff!')

        } catch (err) {
            message.channel.send('La sugerencia especificada no existe')
        }
    }
}