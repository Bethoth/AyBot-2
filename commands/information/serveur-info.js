const Discord = require("discord.js");
const moment = require('moment');
module.exports.run = async (client, message, args) => {
	let connectés = message.guild.members.filter(ppl => ppl.presence.status !== 'offline'&&!ppl.user.bot).size;
	let bots = message.guild.members.filter(member => member.user.bot).size;

	let embed = new Discord.RichEmbed();
	embed.setAuthor("Informations sur le serveur "+message.guild.name+" :",message.guild.iconURL);
	embed.setColor("#4b5afd");
	embed.addField("ID :",message.guild.id,true);
	embed.addField("Propriétaire :",message.guild.owner.user);
	embed.addField("Membres :",message.guild.memberCount,true);
	embed.addField("Bots :",bots,true);
	embed.addField("Connectés :",connectés,true);
	embed.addField("Salons :",message.guild.channels.size,true);
	embed.addField("Rôles :",message.guild.roles.size,true);
	embed.addBlankField(true);
	embed.addField("Date de création : ",`Le ${moment(message.guild.createdAt).format("DD/MM/YYYY hh:mm")}`, true);
	embed.addField("Date d'invitation du bot :",`Le ${moment(message.guild.me.joinedAt).format("DD/MM/YYYY hh:mm")}`, true)
	embed.setThumbnail(message.guild.iconURL);
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	message.channel.send(embed);
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["serveurinfo","serverinfo","servinfo","si"],
	serverForced: true
}

module.exports.help = {
	description: "Permet de donner des informations sur le serveur en cours.",
	utilisations: `serveur-info`,
	exemples: ``
}