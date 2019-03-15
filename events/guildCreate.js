const moment = require("moment");
const chalk = require("chalk");
const fs = require("fs");
const servconfig = require("../informations/servconfig.json");
const userdata = require("../informations/userdata.json");
module.exports = (client, guild, sequelize, DataTypes) => {
	moment.locale('fr');
	if(!servconfig[guild.id]) {
		servconfig[guild.id] = {
			'id':guild.id,
			'prefix':'b?',
			'logschannel':'Aucun',
			'staffchannel':'Aucun',
			'logs':[],
			'joinchannl':'Aucun',
			'quitchannel':'Aucun',
			'sanctionchannel': 'Aucun',
			'joinmessage':'Aucun',
			'quitmessage':'Aucun',
			'rolemute':'Aucun',
			'moneysign':'$',
			'yesemote':'Aucun',
			'noemote':'Aucun',
			'plugins':'Aucun',
			'autoroles':['Aucun']
		}
		if(!userdata.hasOwnProperty(guild.id)) userdata[guild.id];
		fs.writeFile("./informations/servconfig.json", JSON.stringify(servconfig, null, '\t'), (err) => {if(err) console.log(err)});
	}

	client.channels.get('544550120310439936').send(`Le bot a rejoins le serveur \`${guild.name}\`.\nNombre de membres : ${guild.memberCount}.\nID : ${guild.id}.\nFondateur : ${guild.owner}.`);
	console.log(`${chalk.green(__filename.slice(__dirname.length + 1))} : le bot a rejoins la guild : ${chalk.magenta(guild.name)}.\nDate : ${chalk.yellow(moment().format('llll'))}\nNombre de serveurs : ${chalk.magentaBright(client.guilds.size)}`);
}