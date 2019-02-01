const chalk = require("chalk");
const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
	  //try {
        message.channel.fetchMessage(`${args[0]}`).then(msg => {
            if(!args[1]) return message.channel.send("Veuillez mettre du texte.");
            args.slice(0,1);
            let text = args.join(" ");
            let embed = new Discord.RichEmbed();
            embed.setDescription(msg.content);
            embed.setAuthor("Message original de : "+msg.author.tag,msg.author.displayAvatarURL)
            message.channel.send(embed,"Réponse de : **"+message.author.tag+"**\n\n"+text);
            message.delete();
        }).catch(console.error);

    /*} catch (e) {
		    console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
    }*/
}
module.exports.config = {
	category: "utiles",
	name: "répondre",
	aliases: ["rép","rep"]
}

module.exports.help = {
	description: "Permet de répondre à un message grâce à son [ID].",
	utilisations: `répondre [ID de message] [texte]`,
	exemples: `rép 386893236498857985 Hey !`
}