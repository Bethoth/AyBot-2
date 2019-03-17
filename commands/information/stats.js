const { version } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../informations/config.json");
module.exports.run = async (client, message, args) => {
	function getCountUsers() {
		const users = new Map();
		
		client.guilds.forEach(guild => {
			guild.members.forEach(member => {
				let isAlreadyRegister = users.get(member.id);

				if(!isAlreadyRegister) {
					users.set(member.id, true);
				}
			});
		});
		return users.size;
	}
	function getUptime() {
		let sec_num = parseInt(process.uptime(), 10);
		
		let days = Math.floor(sec_num / 86400),
		hours = Math.floor((sec_num - (days * 86400)) / 3600),
		minutes = Math.floor((sec_num - (days * 86400) - (hours * 3600)) / 60),
		seconds = sec_num - (days * 86400) - (hours * 3600) - (minutes * 60);
	
		if(days < 10) days = "0"+days;
		if(hours < 10) hours = "0"+hours;
		if(minutes < 10) minutes = "0"+minutes;
		if(seconds < 10) seconds = "0"+seconds;

		let time = "";

		if(parseInt(days, 10) > 1) time += days + 'j';
		if(parseInt(hours, 10) > 1) time += hours + ':';
		if(parseInt(minutes, 10) > 1) time += minutes + ':';
		if(parseInt(seconds, 10) > 1) time += seconds;

		return time;
	}

	let embed = new Discord.RichEmbed();
	let uptime = moment(client.uptime).toArray();
	embed.setTitle("Statistiques sur le bot :");
	embed.setDescription(`
	- Allumé depuis : **${getUptime()}**
	- Version de Discord.js : **v${version}**
	- Usage de la mémoire : **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**
	- Nombre total de lignes de code : **${config.linesOfCode}**
	- Serveurs total : **${client.guilds.size.toLocaleString()}**
	- Utilisateurs total : **${getCountUsers()}**
	- Date de création : **23/01/2019**
	- Date de mise à jour : **${config.dateVersion}**`);
	embed.setColor("#4b5afd");
	embed.setThumbnail(client.user.displayAvatarURL);
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	message.channel.send(embed);
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["statistiques"],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir des statistiques sur le bot.",
	utilisations: `stats`,
	exemples: ``
}