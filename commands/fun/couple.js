module.exports.run = async (client, message, args) => {
	let person1 = args[0] ? args[0] || message.mentions.members.first() : message.member.displayName;
	let person2 = args[1] ? args[1] || message.mentions.members.array()[1] : await message.guild.members.random().displayName;
	message.channel.send(`**${person1}** a porté son amour sur **${person2}**. :gift_heart:`);
}	
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["cpl","love"],
	serverForced: true
}

module.exports.help = {
	description: "Permet de mettre en couple deux personnes, sans arguments il prendra vous et une personne aléatoire du serveur.",
	utilisations: `couple <Nom/Mention de personne> <Nom/Mention de personne>\ncouple <Nom/Mention de personne>\ncouple`,
	exemples: `couple Antow Opti`
}