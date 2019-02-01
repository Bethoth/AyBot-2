const Discord = require("discord.js");
const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	try {
		let personne = message.mentions.members.first() || message.member;
		console.log(`${args[0]}`);
		try { 
			personne = message.guild.members.find(member => member.user.id === `${args[0]}`);
			
		} catch(e) {console.log(e)}

		let upperRole = personne.highestRole;
		let permissions = "Utilisateur";
		if(personne.user.id == "386893236498857985" || "509726675416645642") permissions = "Créateur";
		let permServ = "Membre"; 
		if(personne.permissions.has("KICK_MEMBERS", true)) permServ = "Modérateur";
		if(personne.permissions.has("ADMINISTRATOR", true)) permServ = "Administrateur";
		if(personne == message.guild.owner) permServ = "Créateur";
		let embed = new Discord.RichEmbed();
		embed.setAuthor("Informations sur " + personne.user.tag + " :", personne.user.displayAvatarURL)
		embed.setThumbnail(personne.user.displayAvatarURL)
		embed.addField("ID : ",personne.user.id,true)
		embed.addField("Nom : ",personne.user.username,true)
		embed.addField("Date d'arrivée sur le serveur :", personne.joinedAt.getHours()+":"+personne.joinedAt.getMinutes()+"   "+personne.joinedAt.getDate()+"/"+(personne.joinedAt.getMonth()+1)+"/"+personne.joinedAt.getFullYear(),true);
		embed.addField("Date de création du compte :", personne.user.createdAt.getHours()+":"+personne.user.createdAt.getMinutes()+"   "+personne.user.createdAt.getDate()+"/"+(personne.user.createdAt.getMonth()+1)+"/"+personne.user.createdAt.getFullYear(),true);
		embed.addField("Permission du bot :",permissions, true)
		embed.addField("Permission du serveur :",permServ, true)
		embed.addField("Plus haut rôle : ", upperRole)
		embed.setColor("#4b5afd")
		message.channel.send(embed);
	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : " + __filename.slice(__dirname.length + 1) + "\n" + e + "\n"));
	}
}
module.exports.config = {
	category: "informations",
	name: "membreinfo",
	aliases: ["mi", "membrei", "minfo"]
}

module.exports.help = {
	description: "Permet d'avoir des informations sur un [membre] grâce à sa mention ou son ID ou d'avoir des informations sur vous même.",
	utilisations: `membreinfo [membre]`,
	exemples: `membreinfo\nmi <@386893236498857985>\nmi 386893236498857985`
}