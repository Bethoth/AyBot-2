const config = require("../informations/config");
const servconfig = require("../informations/servconfig");
const msgRole = require("../informations/messagesRole.json");
const remindTime = require("../informations/remindTimes.json");
const userInfos = require("../informations/userdata.json");
const fs = require("fs");
const moment = require("moment");
const chalk = require("chalk");
const os = require("os");
const request = require("request");
module.exports = async (client) => {
	console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : ${chalk.yellowBright(client.user.tag)} est allumé et présent sur ${chalk.magentaBright(client.guilds.size)} serveurs.`));
	
	msgRole.reactionMessages.forEach(rm => {
		client.channels.get(rm.channel).fetchMessage(rm.message)
			.then(m=>m.react("📥").then(mr=>mr.remove()))
			.catch(err=>{});
	});
	client.user.setPresence({
		status: 'online',
		game : {
			name: "v"+config.version+" | b?help",
			type: "PLAYING",
		}
	});
	if(config.statut === "maintenance") {
		client.user.setPresence({
			status: 'dnd',
			game : {
				name: "maintenance",
				type: "WATCHING"
			}
		});
	}
	if(config.statut === "stopped") {
		client.user.setPresence({
			status: 'offline'
		});
	}

	let now = new Date();

	moment.locale("fr");
	config.dateVersion = moment().format('L');
	if(config.statut == "stopped") {
		/*setInterval(function(){
			request({method:'post', url: config.portWeb, headers:{"x-Accesstoken": config.tokenWeb, "Content-Type": "application/json"}, form: {'state': 'on'}});
		}, 30*1000);*/

		client.channels.get("547182921300181013").setName("STATUT ALPHA : EN LIGNE");
		if(client.channels.has(config.cacheChannel)) client.channels.get(config.cacheChannel).send("Relancement du bot fini."); else {
			client.users.get(config.cacheChannel).send("Relancement du bot fini.");
		};
		config.statut = "started";
		config.cacheChannel = "Aucun";
		config.cacheAction = "Aucune";
		fs.writeFile("./informations/config.json", JSON.stringify(config,null, '\t'), (err) => { if (err) console.log(err); })
	}

	if(config.cacheAction == "maintenance") {
		//request({method:'post', url: config.portWeb, headers:{"x-Accesstoken": config.tokenWeb, "Content-Type": "application/json"}, form: {'state': 'maintenance'}});
	}
	
	console.log("\nDate : "+chalk.yellow(moment().format('llll')));
	console.log(`RAM utilisée : ${chalk.magentaBright((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))} `+chalk.blue("MB"))
	console.log("Utilisation du processeur : "+chalk.magentaBright(os.loadavg()[1])+chalk.blue(" %"));
	setInterval(function(){
		fs.writeFile("./informations/userdata backup.json", JSON.stringify(userInfos, null, '\t'), (err) => {if(err) console.log(err)});

		console.log("\nDate : "+chalk.yellow(moment().format('llll')));
		console.log(`RAM utilisée : ${chalk.magentaBright((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))} `+chalk.blue("MB"))
		console.log("Utilisation du processeur : "+chalk.magentaBright(os.loadavg()[1])+chalk.blue(" %"));
	},20*60*1000);
	setInterval(function(){
		remindTime.forEach((time, index) => {
			if(time.time < Date.now()) {
				client.users.get(time.user).send("**Rappel :** \n\n"+time.thing);
				remindTime.splice(index,1);
				fs.writeFile("./informations/remindTimes.json", JSON.stringify(remindTime, null, '\t'), (err) => {if(err) console.log(err)}); 
			}
		});
	},5*1000);
}