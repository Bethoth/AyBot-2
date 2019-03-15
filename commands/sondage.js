const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	let text = args.join(" ");
	let question = "", description = "", emojis = ["one","two","three","four","five","six","seven","eight","nine","ten"];
	question = "**"+text.slice(1, text.lastIndexOf(']')).toString()+"**\n\n";
	if(question.length == 0) return await argsError("Veuillez mettre une question.");
	choices = text.substring(text.length+2, question.length-3).split(` ; `);
	if(choices.toString().length == 0) return await argsError("Veuillez mettre au moins 1 choix.");
	choices.forEach((choice,index) => {
		description+=`:${emojis[index]}: : ${choice}\n`;
	});
	let embed = new Discord.RichEmbed();
	embed.setColor("#4b5afd");
	embed.setAuthor(`Question de ${message.author.tag} :`,message.author.displayAvatarURL);
	embed.setDescription(question+description);
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
	messageSend = message.channel.send(embed).then(message => {
		choices.forEach(async (choice,index) => {
			let emoji = client.guilds.get("512735679474827275").emojis.find(emoji => emoji.name == emojis[index]);
			await message.react(emoji);
		});
	});
}
module.exports.config = {
	category: "utiles",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["vote"],
	serverForced: false
}

module.exports.help = {	
	description: "Permet de faire des sondages avec un nombre de choix personnalisé.",
	utilisations: `sondage [[Question]] [choix1] ; <choix2> ; <choix3> etc...`,
	exemples: `sondage [À quelle heure mangez-vous le soir ?] 19h ; 20h ; 21h`
}