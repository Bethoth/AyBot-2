const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../informations/config.json");
module.exports.run = async (client, message, args) => {
	function getMemberBySearch(message) {
		let search = args.join(" ");
		if(search.length === 0) return message.member;
		if(message.guild.members.filter(m => m.displayName.includes(search)).size > 0) {
			return message.guild.members.filter(m => m.displayName.includes(search)).first();
		} else if(message.guild.members.filter(m => m.user.id.includes(search)).size > 0) {
			return message.guild.members.filter(m => m.user.id.includes(search)).first();
		} else if(message.mentions.members.size > 0) {
			return message.mentions.members.first();
		} else {
			if(message.guild.members.has(search)) {
				return message.guild.members.get(search);
			}
		}
		return message.member;
	}

	let person = "Aucune";
	person = getMemberBySearch(message);

	let upperRole = person.highestRole;
	let permissions = "Utilisateur(rice)";
	let permServ = "Membre"; 
	if(person.roles.has('537624009639198731')) permissions = "Testeur(se)";
	if(config.owners.includes(person.user.id)) permissions = "Créateur";
	if(person.permissions.has("KICK_MEMBERS", true)) permServ = "Modérateur(rice)";
	if(person.permissions.has("ADMINISTRATOR", true)) permServ = "Administrateur(se)";
	if(person == message.guild.owner) permServ = "Créateur";

	let embed = new Discord.RichEmbed();
	embed.setAuthor("Informations sur " + person.user.tag + " :", person.user.displayAvatarURL);
	embed.setThumbnail(person.user.displayAvatarURL);
	embed.addField("ID : ",person.user.id,true);
	embed.addField("Nom : ",person.user.username,true);
	embed.addField("Date d'arrivée sur le serveur :", moment(person.joinedAt).format('DD/MM/YYYY hh:mm'),true);
	embed.addField("Date de création du compte :", moment(person.user.createdAt).format('DD/MM/YYYY hh:mm'),true);
	if(!person.user.bot) embed.addField("Permission du bot :",permissions, true);
	embed.addField("Permission du serveur :",permServ, true);
	embed.addField("Plus haut rôle : ", upperRole);
	embed.setColor("#4b5afd");
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	message.channel.send(embed);
	if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["member-info","membreinfo","mi", "membrei", "minfo"],
	serverForced: true
}

module.exports.help = {
	description: "Permet d'avoir des informations sur un [membre] grâce à son nom/son ID/sa mention ou d'avoir des informations sur vous même.",
	utilisations: `membre-info <Nom/ID/Mention de membre>`,
	exemples: `membre-info\nminfo <@386893236498857985>\nmi 386893236498857985`
}