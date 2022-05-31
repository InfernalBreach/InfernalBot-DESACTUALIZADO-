const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ intents: 131071 });
const cfonts = require('cfonts');

client.commands = new Discord.Collection();

const fs = require('fs');

const { Player } = require('discord-player');

const player = new Player(client);
client.player = player;
client.config = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./player-events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        client.player.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});


process.on('unhandledRejection', error => {
    console.log(`Ha ocurrido un error pero sigo activo!`.red);
    console.error(error)
});

require('colors')
const banner = cfonts.render((`INICIADO!`), {
    font: 'block',
    color: 'candy',
    align: 'left',
    gradient: ["red", "magenta"],
    lineHeight: 3
});
console.log(banner.string);

client.once('ready', () => {
    console.log('InfernalBot Conectado y Funcionando (0 Excepciones encontradas durante la carga)');
});

/*client.on('guildMemberAdd', async (member) =>{
    client.channels.cache.get('981163901699895376').setName(`Miembros: ${member.guild.memberCount}`)
})*/
/*client.on('guildMemberRemove', async (member) =>{
    client.channels.cache.get('981163901699895376').setName(`Miembros: ${member.guild.memberCount}`)
})*/

client.login(client.config.token_bot);
