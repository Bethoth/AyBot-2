const config = require("../../informations/config.json");
const argsError = require("../../functions/argsError");
module.exports.run = async (client, message, args) => {
    if(config.owners.includes(message.author.id)) {
        let channelID = args[0];
        let text,channel;
        if (!client.channels.get(channelID)) {
            text = args.join(" ");
            text = text.replace(/@everyone/gi, "**everyone**");
            text = text.replace(/@here/gi, "**here**");
            if(text.length > 0) {
				message.channel.send(text);
				if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) return message.delete();
			} else return message.channel.send(argsError("Veuillez mettre du texte.", "1 argument attendus",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
        } else {
            args.splice(0, 1);
            text = args.join(" ");
            channel = client.channels.find(chan => chan.id === channelID);
			if(text.length > 0) {
				if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
				return channel.send(text); 
			} else return message.channel.send(argsError("Veuillez mettre du texte.", "1 argument attendus",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
        }
    }
}
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["parler","speak"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de faire parler le bot avec du [texte].",
	utilisations: `dire [texte]`,
	exemples: ``
}