const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lockdown",
    aliases: ["lock", "lck"],
    desc: "Bloquea los canales de discord",

    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return;

        const role = message.guild.roles.everyone;

        if (!args.length) return message.reply('Especifica una query por favor: activar / desactivar');

        const query = args[0].toLowerCase();

        if (!['activar', 'desactivar'].includes(query)) return message.reply('La opcion que has puesto no es valida');

        const perms = role.permissions.toArray();

        if (query === 'desactivar') {
            perms.push('SEND_MESSAGES');
            console.log(perms)
            await role.edit({ permissions: perms });
            message.reply('Servidor Desbloqueado');
        } else {
            const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');
            console.log(newPerms)

            await role.edit({ permissions: newPerms });
            message.reply('Servidor Bloqueado');
        }
    },
}