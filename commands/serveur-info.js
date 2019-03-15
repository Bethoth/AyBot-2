const Discord = require("discord.js");
const moment = require('moment');
module.exports.run = async (client, message, args) => {
	let connectés = message.guild.members.filter(ppl => ppl.presence.status !== 'offline'&&!ppl.user.bot).size;
	let bots = message.guild.members.filter(member => member.user.bot).size;
	let bot = message.guild.members.get(client.user.id);

	let day = message.guild.createdAt.getDate();
	let month = message.guild.createdAt.getMonth()+1;
	let year = message.guild.createdAt.getFullYear();
	let hour = message.guild.createdAt.getHours();
	let min = message.guild.createdAt.getMinutes();
	
	if(hour < 10) hour = String("0"+hour);   
	if(min < 10) min = String("0"+min);

	let dayJoin = bot.joinedAt.getDate();
	let monthJoin = bot.joinedAt.getMonth()+1;
	let yearJoin = bot.joinedAt.getFullYear();
	let hourJoin = bot.joinedAt.getHours();
	let minJoin = bot.joinedAt.getMinutes();

	if(hourJoin < 10) hourJoin = String("0"+hourJoin);         
	if(minJoin < 10) minJoin = String("0"+minJoin);

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
	embed.addField("Date de création : ",`Le ${day}/${month}/${year} à ${hour}:${min}`, true);
	embed.addField("Date d'invitation du bot :",`Le ${dayJoin}/${monthJoin}/${yearJoin} à ${hourJoin}:${minJoin}`, true)
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