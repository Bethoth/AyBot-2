const Discord = require("discord.js");
const config = require("../../informations/config.json");
const moment = require("moment");

module.exports.run = async (client, message, args) => {

	let embed = new Discord.RichEmbed();
	embed.setTitle(`Informations sur le bot :`);
	embed.setDescription(`
AyBot 2 est un bot Discord francophonne développé par __Ayfri__. 
Il a diverses fonctions dont : modération/administration/divers/fun et bien d'autres.
Il est développé avec __Discord.js__ depuis le 23 février 2019.
Il est hébergé par __Skariie___.

	- Bot : ${client.user}
	- Créateur : ${client.users.get('386893236498857985')}
	- Préfixe universel : \`${config.prefix}\`
	- Version : **${config.version}**
	- [Serveur de support](https://discord.gg/n7HWd4P)
	- [Inviter le bot](https://discordapp.com/oauth2/authorize?client_id=537534757668651009&scope=bot&permissions=8)
	- [Site web](https://aybot.tk)
	- [GitHub](https://github.com/Ayfri/AyBot-2)`);
	embed.setColor("#4b5afd");
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	message.channel.send(embed);
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["bi","boti","binfo"],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir des informations sur le bot.",
	utilisations: `botinfo`,
	exemples: ``
}