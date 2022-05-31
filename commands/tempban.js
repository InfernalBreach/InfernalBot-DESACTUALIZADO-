const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'tempban',
    description: "Ayuda",
    run: async (client, message, args) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("No tienes permiso suficiente para hacer esto.").then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000)
        })

        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Debes mencionar a alguien").then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000)
        })

        let time = args[1]
        if (!time) return message.channel.send("Debes definir un tiempo")
        let timer = ms(time)

        const razon = args.slice(2).join(" ")
        if (!razon) return message.reply("Debes escribir una raz�n").then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        message.channel.send(`El usuario ${member} ha sido baneado por ${message.author.username} durante ${time} por la raz�n: ${razon}`)

        member.ban({ reason: razon })
        setTimeout(async function () {
            await message.guild.members.unban(member.id)

            member.send(`Has sido temporalmente baneado en el servidor: **${message.guild.name}**, durante: ${time}, por la raz�n: ${razon}.`)

            message.channel.send(`El usuario ${member} fu� desbaneado`).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 3000)
            })

            member.send(`Tu ban temporal en el servidor **${message.guild.name}**, ha terminado`).catch(() => {
                return message.reply("ERROR")
            })

        }, timer)

    }
}