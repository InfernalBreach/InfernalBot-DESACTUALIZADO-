const Discord = require('discord.js')
module.exports = {
    name: "ban",
    aliases: ["banear", "banuser"],
    desc: "Sirve para banear a un usuario del Servidor",
    permisos: ["BAN_MEMBERS"],
    permisos_bot: ["ADMINISTRATOR", "BAN_MEMBERS"],
    run: async (client, message, args, prefix) => {
        let usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

        if (!usuario) return message.reply(`**No se ha encontrado al usuario que has especificado!**`);

        let razon = args.slice(1).join(" ");

        if (!razon) razon = "No se ha especificado ninguna razón!"

        if (usuario.id == message.guild.ownerId) return message.reply(`**No puedes banear al due�o del servidor!**`);

        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {

            if (message.member.roles.highest.position > usuario.roles.highest.position) {

                usuario.send(`Has sido baneado en el servidor **${message.guild.name}** por la razon: ${razon}`).catch(() => { message.reply(`No se le ha podido enviar el DM al usuario!`) });

                message.reply(`El usuario ${usuario} ha sido baneado por la raz�n: **${razon}**`)

                usuario.ban({ reason: razon }).catch(() => {
                    return message.reply("No se ha podido banear al usuario! ERROR")
                });
            } else {
                return message.reply(`**No puedes banear a un superior tuyo!**`)
            }
        } else {
            return message.reply(`**NULL**`)
        }
    }
}