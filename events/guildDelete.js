const moment = require("moment");
const chalk = require("chalk");
const fs = require("fs");
const servconfig = require("../informations/servconfig.json");
const userdata = require("../informations/userdata.json");
module.exports = (client, guild) => {
	moment.locale('fr');
	client.guilds.array().forEach((guildOf,index) => {
		if(servconfig.hasOwnProperty(guildOf.id) && servconfig[guild.id]) {
			servconfig.splice(index,1);
		}
	});
	fs.writeFile("./informations/servconfig.json", JSON.stringify(servconfig, null, '\t'), (err) => {if(err) console.log(err)});

	client.channels.get('544550120310439936').send(`Le bot a quitté le serveur \`${guild.name}\`.\nNombre de membres : ${guild.memberCount}.\nID : ${guild.id}.\nFondateur : ${guild.owner}.`);
	console.log(`${chalk.green(__filename.slice(__dirname.length + 1))} : le bot a quitté la guild : ${chalk.magenta(guild.name)}.\nDate : ${chalk.yellow(moment().format('llll'))}\nNombre de serveurs : ${chalk.magentaBright(client.guilds.size)}`);
}