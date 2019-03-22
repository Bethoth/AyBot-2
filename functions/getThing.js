const client = require("../index").client;
async function getThing(dataType, msg, text) {
    if(dataType === "channel") {
        return msg.guild.channels.get(text) || msg.mentions.channels.first() || msg.guild.channels.find(c => c.name.toLowerCase().includes(text.toLowerCase()) && text.length > 1) || false;
    } else if(dataType === "guild") {
        return client.guilds.get(text) || client.guilds.find(g => g.name.toLowerCase().includes(text.toLowerCase()) && text.length > 1) || false;
    } else if(dataType === "member") {
        return msg.guild.members.get(text) || msg.mentions.members.first() || msg.guild.members.find(m => (m.displayName.toLowerCase().includes(text.toLowerCase()) || m.user.username.toLowerCase().includes(text.toLowerCase())) && text.length > 1) || false;
    } else if(dataType === "role") {
        return msg.guild.roles.get(text) || msg.mentions.roles.first() || msg.guild.roles.find(r => r.name.toLowerCase().includes(text.toLowerCase()) && text.length > 1) || false;
    } else if(dataType === "emoji") {
        return client.emojis.get(text) || client.emojis.find(e => e.name.toLowerCase().includes(text.toLowerCase()) && text.length > 1) || false;
    } else if(dataType === "message") {
        if(text.length < 7) return false;
        let m = await msg.channel.fetchMessage(text);
        if(m) {
            return m;
        }
        let url = msg.replace("https://discordapp.com/channels/","").split("/");
        if(msg.startsWith("https") && client.channels.has(url[1])) {
            return await client.channels.get(url[1]).fetchMessage(url[2]) || false;
        }
        for(var [key, value] of client.channels) {
            let m = await value.fetchMessage(text);
            if(m) {
                return m;
            }
        }
        return false;
    }
}
module.exports = getThing;

/*

This function get the message, client and an argument to return a good thing, list of good thing :

channel    [ID/Mention / Name]                (in all channels of bot)
emoji      [emoji / Name]                     (in all emojis of bot)
guild      [Id / Name]                        (in all guilds of bot)
message    [Content of message]               (in all channels of bot)
member     [ID / Mention / Name / Username]   (in the guild)
role       [Mention / ID / Name]              (in the guild)

*/