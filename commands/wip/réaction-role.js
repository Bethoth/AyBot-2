const fs = require("fs");
const msgRoles = require("../../informations/messagesRole.json");

module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	let channel = message.mentions.channels.first();
	let msgID = args[1];
	let emoji = args[2] ? args[2] : "Aucun";
	let emojis = client.emojis.array();
	if(!args[0]) return message.channel.send("Veuillez mettre la mention d'un salon.");
	if(channel == undefined) return message.channel.send("Veuillez mettre la mention d'un salon valide.");
	if(!args[1]) return message.channel.send("Veuillez mettre l'ID d'un message.");
	if(!args[2]) return message.channel.send("Veuillez mettre un émoji.");
	if(!args[3]) return message.channel.send("Veuillez mettre l'ID ou la mention d'un rôle ou `supprimer`.");
	
	if(args[3] == "delete" || args[3] == "supprimer") {
		let reactionMessage = msgRoles.reactionMessages.find(rm =>{
			return rm.message === msgID;
		});
		if(reactionMessage === null) return message.channel.send("Veuillez mettre l'ID d'un message valable.");
		if(reactionMessage === undefined) return message.channel.send("Cette réaction n'existe pas sur le message en question.");
		let reactionRole = reactionMessage.reactionRoles.find(rr => {
			return rr.emoji === emoji.id || rr.emoji === `${emoji}`;
		});
		if(reactionRole === null) return message.channel.send("Veuillez mettre un émoji valable.");
		reactionMessage.reactionRoles.find((rr, index) => {
			if(rr.emoji === emoji.id || rr.emoji === `${emoji}`) return index;
		}).splice(index, 1);
		channel.fetchMessage(msgID).then(msg => {
			msg.reactions.fetchUsers().then( user => {
				if(msg.reaction.emoji === emoji) reaction.remove(user);
			});
		});
		fs.writeFile('./informations/messagesRole.json', JSON.stringify(msgRoles, null, '\t'), (err) => {if(err) console.log(err)});
		return message.channel.send("Le rôle ne sera plus donné automatiquement quand quelqu'un ajoute une réaction.");
	} else {
		let role = message.mentions.roles.first() || message.guild.roles.get(args[3]);

		if(role == undefined) return message.channel.send("Veuillez mettre l'ID ou la mention d'un rôle valable ou `supprimer`.");
		if(emoji.includes(emojis.some(em => emoji === em)) || emoji == "Aucun") {
			return message.channel.send("Veuillez mettre un émoji valide.");
		} else {
			let name = String(emoji.slice(emoji.indexOf(":")+1,emoji.lastIndexOf(":")));
			let id = emoji.slice(emoji.lastIndexOf(":")+1,emoji.lastIndexOf(">"));
			channel.fetchMessage(msgID).then(msg => {
				msgRoles.reactionMessages.push({
					channel:channel.id,
					message:msgID,
					reactionRoles: []
				});

				msg.react("📥").then(mr=>mr.remove());
				fs.writeFile('./informations/messagesRole.json', JSON.stringify(msgRoles, null, '\t'), (err) => {if(err) console.log(err)});
				let reactionMessages = msgRoles.reactionMessages.find(rm=>rm.message == msgID);
				if(emoji.includes("<")) {
					emojiFinal = client.guilds.get('512735679474827275').createEmoji(`https://cdn.discordapp.com/emojis/${id}.png`, name).then(e=>{
					reactionMessages.reactionRoles.push({
						emoji: e.id,
						role: role.id
					});
					msg.react(e);
					fs.writeFile('./informations/messagesRole.json', JSON.stringify(msgRoles, null, '\t'), (err) => {if(err) console.log(err)});
					delete client.guilds.get('512735679474827275').emojis.get(e.id);
				})} else {
					reactionMessages.reactionRoles.push({
						emoji: emoji,
						role: role.id
					});
					msg.react(emoji);
					fs.writeFile('./informations/messagesRole.json', JSON.stringify(msgRoles, null, '\t'), (err) => {if(err) console.log(err)});
				}
			}).catch(err => {console.log(err); return message.channel.send("Veuillez mettre l'ID d'un message valable.");});
		}
		message.channel.send("Le rôle sera donné automatiquement quand les gens réagiront au message.");
	}
}
module.exports.config = {
	category: "stopped",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["reaction-role","reactionrole","react-role","rr"],
	serverForced: true
}

module.exports.help = {
	description: "Permet de donner automatiquement un [role] en rajoutant une réaction d'un [émoji].",
	utilisations: `réaction-role [salon] [ID message] [émoji] [ID/mention role]\nréaction-role [salon] [ID message] [émoji] supprimer`,
	exemples: `réaction-role #général 541358571988975616 :wave: @Hey`
}