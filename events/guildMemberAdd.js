const moment = require("moment");
const chalk = require("chalk");
const servconfig = require("../informations/servconfig.json");
const userdata = require("../informations/userdata.json");

module.exports = (client, member) => {
	let guildID = member.guild.id;
	if(!servconfig[guildID]) return;
	if(servconfig[guildID].autoroles[0] !== "Aucun") servconfig[guildID].autoroles.forEach(role => {
		member.addRole(role);
	});
	
}