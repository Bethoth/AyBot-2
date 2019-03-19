const argsError = require("../../functions/argsError");
const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
	let args2 = message.content.slice(0).trim().split(/ +/g);
	if(args < 1) return message.channel.send(argsError("Veuillez mettre un [lien de message].", "Erreur sur le premier argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(!args2[2]) return message.channel.send(argsError("Veuillez mettre du [texte].", "Erreur sur le deuxième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	
	const argschnl = message.content.slice(0).trim().split(/\/+/g);
	const channel = client.channels.get(argschnl[4]);
	let restMSG = args.splice(1,2).join(" ");
	msgToFind = argschnl[5].slice(0, -(restMSG.length+1));
	let clientMember = message.guild.members.get(client.user.id);
	if(!channel.memberPermissions(clientMember).has('VIEW_CHANNEL')) return message.channel.send("Le bot n'a pas accès à ce salon.");

	channel.fetchMessage(`${msgToFind}`).then(msg =>  {
		let text = args2.slice(2).join(" ");
		let embed = new Discord.RichEmbed();
		if(msg.content.length < 1024) {embed.setDescription(msg.content);} else { 
			let msglong = msg.content.substring(0,1021)+'...';
			embed.setDescription(msglong); 
		}
		embed.setAuthor("Message original de : "+msg.author.tag,msg.author.displayAvatarURL);
		message.channel.send(embed).then(message.channel.send("**```Réponse de : "+message.author.tag+"```**"+text));
		if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
	}).catch(e => message.channel.send(argsError("Veuillez mettre un lien de message valable.", "Erreur sur le premier argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3)))));
}
module.exports.config = {
	category: "utiles",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["rép","rep"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de répondre à un message grâce à son [lien].",
	utilisations: `répondre [lien de message] [texte]`,
	exemples: `rép 541358571988975616 Hey !`
}