const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	try {
        if(message.author.id == "386893236498857985" || "509726675416645642") {
            let channelID = args[0];
            let text;
            let channel;
            if (!client.channels.get(channelID)) {
                text = args.join(" ");
                if(text.length > 0) { message.channel.send(text); return message.delete() } else return message.channel.send("Veuillez mettre du texte.");
            } else {
                args.splice(0, 1);
                text = args.join(" ");
                channel = client.channels.find(chan => chan.id === channelID);
                if(text.length > 0) { message.delete(); return channel.send(text); } else return message.channel.send("Veuillez mettre du texte.");
            }
        }
        if(text.length > 0) { message.channel.send(text); return message.delete(); } else return message.channel.send("Veuillez mettre du texte.")
        
	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
    }
}
module.exports.config = {
	category: "fun",
	name: "dire",
	aliases: ["parler","speak"]
}

module.exports.help = {
	description: "Permet de faire parler le bot avec du [texte].",
	utilisations: `dire [texte]`,
	exemples: ``
}