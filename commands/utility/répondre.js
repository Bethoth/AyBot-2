const Discord = require("discord.js");
module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	let args2 = message.content.slice(0).trim().split(/ +/g);
	if(args < 1) return await argsError("Veuillez mettre un lien de message.");
	if(!args2[2]) return await argsError("Veuillez mettre du texte.");
	
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
	}).catch(e =>{ argsError("Veuillez mettre un lien de message valable.");});
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