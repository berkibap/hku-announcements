const {Client, Intents} = require('discord.js');
const Config = require('../util/Config');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });
client.on("ready", () => {
    console.log(`Bot Ready `);
    module.exports.announcementChannel = client.guilds.resolve(Config.get("serverID")).channels.cache.find(c => c.id === Config.get("announcementChannelID"));
    module.exports.logChannel = client.guilds.resolve(Config.get("serverID")).channels.cache.find(c => c.id === Config.get("logChannelID"));
})

client.on("messageCreate", (message) => {
    if(message.content == "&nuke") {
        
        message.channel.clone().then(c => {
            if(message.channelId == config.announcementChannelID){
                Config.update("announcementChannelID", c.id);
            } else if(message.channelId == config.logChannelID) {
                Config.update("logChannelID", c.id);
            }
            message.channel.delete();
        })
    }
})

client.login(Config.get("token"));
module.exports.Bot = client;
