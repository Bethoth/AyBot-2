const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	let embed = new Discord.RichEmbed();
	embed.setTitle("Voici le lien d'invitation du bot : ");
	embed.setDescription("[Serveur de support](https://discord.gg/n7HWd4P)\n\n**Lien d'invitation : https://discordapp.com/oauth2/authorize?client_id=537534757668651009&scope=bot&permissions=8**")
	embed.setColor("#4b5afd");
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	message.channel.send(embed);
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ['invite','invt'],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir le lien d'invitation du bot.",
	utilisations: `inviter`,
	exemples: ``
}