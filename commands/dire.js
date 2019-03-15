module.exports.run = async (client, message, args, argsError) => {
    if(argsError);
    if(message.author.id == "386893236498857985" || "509726675416645642") {
        let channelID = args[0];
        let text,channel;
        if (!client.channels.get(channelID)) {
            text = args.join(" ");
            text = text.replace(/@everyone/gi, "**everyone**");
            text = text.replace(/@here/gi, "**here**");
            if(text.length > 0) {
				message.channel.send(text);
				if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) return message.delete() 
			} else return await argsError("Veuillez mettre du texte ou l'ID d'un salon disponible au bot.");
        } else {
            args.splice(0, 1);
            text = args.join(" ");
            channel = client.channels.find(chan => chan.id === channelID);
			if(text.length > 0) {
				if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
				return channel.send(text); 
			} else return await argsError("Veuillez mettre du texte.");
        }
    }
	if(text.length > 0) {
		message.channel.send(text);
		if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) return message.delete();
	} else return await argsError("Veuillez mettre du texte.")
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