const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'aceptar',

    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('No tienes permisos')
        const messageID = args[0]
        const acceptQuery = args.slice(1).join(" ")
        
        if (!messageID) return message.reply('Especifica una ID de sugerencia!')
        if (!acceptQuery) return message.reply('Especifica una razon!')

        try {
            const suggestionChannel = message.guild.channels.cache.get('849472237819265024')
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID)
            const data = suggestedEmbed.embeds[0]
            const acceptEmbed = new MessageEmbed()
                .setAuthor(data.author.name, data.author.iconURL)
                .setDescription(data.description)
                .setColor('GREEN')
                .addField('Status: Aceptada', acceptQuery)

            message.channel.messages.fetch(messageID).then((m) => {
                m.delete()
            })
            message.guild.channels.cache.get('849472237819265024').send(acceptEmbed)
            
            message.channel.send('Sugerencia Aceptada!')
            const user = client.users.cache.find((u) => u.tag === data.author.name)
            user.send('Tu Sugerencia ha sido aceptada por un miembro del staff!')

        } catch (err) {
            message.channel.send('La sugerencia especificada no existe')
        }
    }
}