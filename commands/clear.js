const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    alias: [],

    run: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("No tienes permisos para hacer esto.").then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        const cantidad = args[0]

        if (!cantidad) return message.reply("Debes introducir una cantidad.").then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        if (isNaN(cantidad)) return message.reply("Debes introducir una cantidad.").then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        if (cantidad > 99) return message.reply("No puedes eliminar más de 99 mensajes.").then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000)
        })

        message.delete().then(q => {
            message.channel.bulkDelete(cantidad)
            message.channel.send(`He eliminado **${cantidad}** mensaje/s.`).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000)
            })
        })

    }
}