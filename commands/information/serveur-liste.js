let Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

	function sortGuildsWithPage(pageNumber) {
		let embed = new Discord.RichEmbed();
		let pageMax = Math.floor(client.guilds.size/20)+1;
		if(args[0] > pageMax || args[0] < 1 || !parseInt(args[0])) pageNumber = pageMax; 
		
		embedDesc = client.guilds.sort(function(a,b){
			return b.memberCount - a.memberCount;
		}).map(guild => {
			return `**${guild.name}**\t|\t**${guild.memberCount}** membres`;
		}).slice((pageNumber*20)-20,pageNumber*20).join("\n");

		embed.setAuthor(`Liste des serveurs de ${(pageNumber*20)-19} à ${pageNumber*20}`);
		embed.setDescription(embedDesc);
		embed.setColor("#4b5afd");
		embed.setFooter(`Aybot 2 • Page ${pageNumber}/${pageMax}`, client.user.displayAvatarURL);
		return embed;
	};

	
	let numberPage = args.length > 0 ? args[0] : 1;
	let p0 = 0;
	let p1 = 20;
	const sl = await message.channel.send(sortGuildsWithPage(numberPage)).catch(err => {console.log(err);});

	await sl.react('◀');
	await sl.react('▶');
	
	const slEvent = sl.createReactionCollector((reaction, user) => user.id === message.author.id);
	slEvent.on('collect', async(reaction, user) => {
		if(user.bot) return;
		if(reaction.emoji == '◀') {
			p0 = p0-20;
			p1 = p1-20;
			if(p0 < 0) { p0 = 0; p1 = 20 }
			if(p0 === undefined || p1 === undefined) { p0 = 0; p1 = 20 }
			sl.clearReactions();
			await sl.react('◀');
			await sl.react('▶');
			return sl.edit(sortGuildsWithPage(p0/20));
		}
		if(reaction.emoji == '▶') {
			p0 = p0+20;
			p1 = p1+20;
			if(p1 > client.guilds.size + 20) { p0 = 0; p1 = 20 }
			if(p0 === undefined || p1 === undefined) { p0 = 0; p1 = 20 }
			sl.clearReactions();
			await sl.react('◀');
			await sl.react('▶');
			return sl.edit(sortGuildsWithPage(p0/20));
		}
	});
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["server-list","sl"],
	serverForced: false
}

module.exports.help = {
	description: "Affiche la liste des serveurs en rangeant de façon décroissante des membres et à la page <nombre>.",
	utilisations: `serveur-list <nombre>`,
	exemples: ``
}