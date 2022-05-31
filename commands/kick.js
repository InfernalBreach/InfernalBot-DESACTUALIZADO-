const Discord = require('discord.js')
module.exports = {
    name: "kick",
    aliases: ["kickear", "expulsar"],
    desc: "Sirve para expulsar a un usuario del Servidor",
    permisos: ["KICK_MEMBERS"],
    permisos_bot: ["ADMINISTRATOR", "KICK_MEMBERS"],
    run: async (client, message, args, prefix) => {

        let usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!usuario) return message.reply(`**No se ha encontrado al usuario que has especificado!**`);

        let razon = args.slice(1).join(" ");
        if (!razon) razon = "No especificada!"

        if (usuario.id == message.guild.ownerId) return message.reply(`**No puedes expulsar al dueño del servidor!**`);

        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {

            if (message.member.roles.highest.position > usuario.roles.highest.position) {

                usuario.send(`Has sido expulsado del servidor **${message.guild.name}**, por la razon: **${razon}**`).catch(() => {
                    message.reply(`No se le ha podido enviar el DM al usuario!`)
                });

                message.reply(`Usuario ${usuario} expulsado correctamente por la razón: ${razon}`)

                usuario.kick([razon]).catch(() => {
                    return message.reply("ERROR")
                })
            } else {
                return message.reply(`**No puedes expulsar a un superior tuyo!**`)
            }
        } else {
            return message.reply(`NULL`)
        }
    }
}