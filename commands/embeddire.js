const Discord = require("discord.js");
const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	//try {
        if(message.author.id == "386893236498857985" || "509726675416645642") {
        let channelID = args[0];
        let channel;
        let text;
        if (!client.channels.get(channelID)) {
            let embed = new Discord.RichEmbed();
            text = args.join(" ");
            if(args[0] == "--title") {
                let title = String(text.slice(text.indexOf(' "'),text.lastIndexOf('" ')));
                title = title.substring(2,title.length);
                text = text.slice(text.lastIndexOf('" ')+2,text.length);
                if(title.length > 0 && title.length < 256) { embed.setTitle(title) } else { message.channel.send("Veuillez mettre un titre"); return message.delete(); }
            }
            //embed.setAuthor("",message.author.displayAvatarURL);
            embed.setDescription(text)
            embed.setColor("#4b5afd")
            if(text.length > 0 && text.length < 1024) { message.channel.send(embed); return message.delete(); } else return message.channel.send("Veuillez mettre du texte.");
        } else {
            args.splice(0, 1);
            text = args.join(" ");
            let embed = new Discord.RichEmbed();
            channel = client.channels.find(chan => chan.id === channelID);
            if(args[0] == "--title") {
                let title = String(text.slice(text.indexOf(' "'),text.lastIndexOf('" ')));
                title = title.substring(2,title.length);
                text = text.slice(text.lastIndexOf('" ')+2,text.length);
                if(title.length > 0 && title.length < 256) { embed.setTitle(title) } else { message.channel.send("Veuillez mettre un titre"); return message.delete(); }
            }
            
            //embed.setAuthor("",message.author.displayAvatarURL);
            embed.setDescription(text);
            embed.setColor("#4b5afd")
            if(text.length > 0 && text.length < 1024) { return channel.send(embed); } else return message.channel.send("Veuillez mettre du texte.");
        }
    } else {
        if(text.length > 0) { message.channel.send(embed); return message.delete(); } else return message.channel.send("Veuillez mettre du texte.");
    }
	/*} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
    }*/
}
module.exports.config = {
	category: "owner",
	name: "embeddire",
	aliases: ["embddire","edire","embdire"]
}

module.exports.help = {
	description: "Permet de faire parler le bot avec un embed qui contient du [texte].",
	utilisations: `embeddire [texte]`,
	exemples: ``
}