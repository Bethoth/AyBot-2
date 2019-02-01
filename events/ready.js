const chalk = require("chalk");
const path = require("path");
const config = require("../informations/config");
const servconfig = require("../informations/servconfig");
const fs = require("fs");
const moment = require("moment");
module.exports = (client) => {
	console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : ${chalk.yellowBright(client.user.tag)} est allumé et présent sur ${chalk.magentaBright(client.guilds.size)} serveurs.`));
	client.user.setPresence({
		game : {
			name: servconfig["515322595063627776"].prefix+"help",
			type: "WATCHING"
		},
		status: 'idle'
	});
	let statChan = client.channels.get("515329927763984435");
	statChan.setName("STATUT : EN LIGNE");
	now = new Date();

	moment.locale("fr");
	config.dateVersion = moment().format('L');
	fs.writeFile("./informations/config.json", JSON.stringify(config,null, '\t'), (err) => { if (err) console.log(err); })
	
	console.log("\nDate : "+chalk.yellow(moment().format('llll')));
	console.log(`RAM utilisée : ${chalk.magentaBright((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))} `+chalk.blue("MB"))
	console.log("Utilisation du processeur : "+chalk.magentaBright(Math.ceil(process.cpuUsage().system / 1024 / 1024))+chalk.blue(" %"));
	setInterval(function(){
		now = new Date();
		console.log("\nDate : "+chalk.yellow(moment().format('llll')));
		console.log(`RAM utilisée : ${chalk.magentaBright((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))} `+chalk.blue("MB"))
		console.log("Utilisation du processeur : "+chalk.magentaBright(Math.ceil(process.cpuUsage().system / 1024 / 1024))+chalk.blue(" %"));
	},20*60*1000)
}