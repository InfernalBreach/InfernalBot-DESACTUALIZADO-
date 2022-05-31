const Discord = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'tempmute',
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

            if (!razon) return message.reply("Debes especificar una razón!")

            let role = message.guild.roles.cache.find(role => role.name === "Muteado");

            if (!role) return message.channel.send("NULL")

            let time = args[2];
            if (!time) {
                return message.channel.send("No has especificado un tiempo!").then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 3000)
                })
            }

            member.roles.add(role.id);

            message.channel.send(`${member} ha sido temporalmente muteado durante ${ms(ms(time))}, por ${razon}`)

            setTimeout(function () {
                member.roles.remove(role.id);
                message.channel.send(`${member} ya no está muteado.`).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 3000)
                })
            }, ms(time));

        } else {
            return message.channel.send('No tienes permisos para hacer esto!.').then(m => {
                setTimeout(() => {
                    m.delete()
                }, 3000)
            })
        }
    }
}