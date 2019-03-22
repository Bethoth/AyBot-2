const argsError = require("../../functions/argsError");
const fs = require("fs");
const remindTime = require("../../informations/remindTimes.json");
module.exports.run = async (client, message, args) => {
	function saveRemindTime(){
		fs.writeFile("./informations/remindTimes.json", JSON.stringify(remindTime, null, '\t'), (err) => {if(err) console.log(err)}); 
	}
	let times = ["d","j","h","m","s"], timeTotal=0, finalDate = new Date();
	if(args.length == 0) return message.channel.send(argsError("Veuillez mettre du [texte] à se souvenir.", "3 arguments attendus.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(!args[args.length-1].includes(times.some(time => args[args.length-1] === time))) {
		let time = String(args[args.length-1].trim());
		args.pop();
		let thing = args.join(" ");
		if(time.endsWith('j') || time.endsWith('d') || time.endsWith('jour') || time.endsWith('jours')) {
			timeTotal = 1000*60*60*24*parseInt(time.slice(-time.length, -1));
			finalDate = finalDate.getTime() + timeTotal;
			remindTime.push({
				time:finalDate,
				user:message.author.id,
				thing:thing
			});
			saveRemindTime();
			return message.channel.send(`Vous serez bien averti de \`${thing}\` dans ${time.slice(-time.length, -1)} jours.`);
		} else if(time.endsWith('h') || time.endsWith('heure') || time.endsWith('heures')) {
			timeTotal = 1000*60*60*parseInt(time.slice(-time.length, -1));
			finalDate = finalDate.getTime() + timeTotal;
			remindTime.push({
				time:finalDate,
				user:message.author.id,
				thing:thing
			});
			saveRemindTime();
			return message.channel.send(`Vous serez bien averti de \`${thing}\` dans ${time.slice(-time.length, -1)} heures.`);
		} else if(time.endsWith('m') || time.endsWith('minute') || time.endsWith('minutes')) {
			timeTotal = 1000*60*parseInt(time.slice(-time.length, -1));
			finalDate = finalDate.getTime() + timeTotal;
			remindTime.push({
				time:finalDate,
				user:message.author.id,
				thing:thing
			});
			saveRemindTime();
			return message.channel.send(`Vous serez bien averti de \`${thing}\` dans ${time.slice(-time.length, -1)} minutes.`);
		} else if(time.endsWith('s') || time.endsWith('seconde') || time.endsWith('secondes')) {
			timeTotal = 1000*parseInt(time.slice(-time.length, -1));
			finalDate = finalDate.getTime() + timeTotal;
			remindTime.push({
				time:finalDate,
				user:message.author.id,
				thing:thing
			});
			saveRemindTime();
			return message.channel.send(`Vous serez bien averti de \`${thing}\` dans ${parseInt(time)} secondes.`);
		} else {
			return message.channel.send(argsError("Veuillez mettre une période de temps valide.\nExemples : 4h/2m/8d", "Erreur sur le troisième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
		}
	} else {
		return message.channel.send(argsError("Veuillez mettre une période de temps valide.\nExemples : 4h/2m/8d", "Erreur sur le troisième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	}
}
module.exports.config = {
	category: "utiles",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ['rappel','remind','rtnr'],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir un rappel de [texte] dans un [temps] que vous donnez.",
	utilisations: `retenir [texte] [nombre][j/h/m/s]`,
	exemples: `retenir manger 4h\nrtnr dormir 15m`
}
