const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'mute',
    description: "aislar",
    run: async (client, message, args) => {


        if (message.member.permissions.has('MOVE_MEMBERS')) {
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!member) return message.reply('Debes mencionar a alguien!').then(m => {
                setTimeout(() => {
                    m.delete()
                }, 3000)
            })

            const razon = args[1]

            if (!razon) return message.reply("Debes escribir una razón!")

            let role = message.guild.roles.cache.find(role => role.name === "Muteado");

            if (!role) return message.channel.send("NULL")

            member.roles.add(role.id);

            message.channel.send(`${member} ha sido muteado por: ${razon}`)

            /*setTimeout(function () {
                member.roles.remove(role.id);
                message.channel.send(`${member} ya no está muteado.`).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 3000)
                })

            })*/
        } else {
            return message.reply("No tienes permisos para hacer esto!")
        }
    }
}