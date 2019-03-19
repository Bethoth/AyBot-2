const blacklist = require("../../informations/blacklist.json");
const argsError = require("../../functions/argsError");
const fs = require("fs");
module.exports.run = async (client, message, args) => {
	if(args.length < 1) return message.channel.send(argsError("Veuillez mettre `add` ou `remove`.", "3 arguments attenuds.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(args.length < 2 && (args[1] != "serveur" || args[1] != "membre")) return await argsError("Veuillez mettre `membre` ou `serveur`.");
	if(args.length < 3 && args[1] == "membre") return message.channel.send(argsError("Veuillez mettre un membre avec son ID.", "Erreur sur le troisième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(args.length < 3 && args[1] == "serveur") return message.channel.send(argsError("Veuillez mettre un serveur avec son ID.", "Erreur sur le troisième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	let person = args[2];
	let personUser = client.users.get(person);
	let guild = client.guilds.get(args[2]);
	
	if(args[1] !== "membre" && "serveur") return message.channel.send(argsError("Veuillez mettre un `membre` ou `serveur`.", "Erreur sur le deuxième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(args[0] == "add") {
		
		if(args[1] == "membre" && !blacklist.members.includes(person)) {
			blacklist.members.push(person);
			fs.writeFile("./informations/blacklist.json", JSON.stringify(blacklist, null, '\t'), (err) => {if(err) console.log(err)});
			if(personUser == undefined) return message.channel.send(`${person} a été ajouté dans la liste noire mais n'est pas encore sur un serveur du bot.`);
			return message.channel.send(`${personUser.tag} a été ajouté dans la liste noire.`);
		} else if(args[1] == "membre" && blacklist.members.includes(person)) {
			return message.channel.send("Cette personne est déjà dans la liste noire.");

		} else if(args[1] == "serveur" && !blacklist.guilds.includes(guild.id)) {
			blacklist.guilds.push(guild.id);
			fs.writeFile("./informations/blacklist.json", JSON.stringify(blacklist, null, '\t'), (err) => {if(err) console.log(err)});
			if(guild == undefined) return message.channel.send(`${args[2]} a été ajouté dans la liste noire mais ne contient pas encore le bot.`);
			return message.channel.send(`Le serveur ${guild.name} a été ajouté dans la liste noire.`);
		} else if(args[1] == "serveur" && blacklist.guilds.includes(guild.id)) {
			return message.channel.send("Ce serveur est déjà dans la liste noire.");
		}
	}

	if(args[0] == "remove") {
		if(args[1] == "membre" && blacklist.members.includes(person))  {
			blacklist.members.splice(blacklist.members.indexOf(person),1);
			fs.writeFile("./informations/blacklist.json", JSON.stringify(blacklist, null, '\t'), (err) => {if(err) console.log(err)});
			return message.channel.send(`${personUser.tag} a été retiré de la liste noire.`);
		} else if(args[1] == "membre" && !blacklist.members.includes(person)) {
			return message.channel.send("Cette personne n'est pas dans la liste noire.");

		} else if(args[1] == "serveur" && blacklist.guilds.includes(guild.id)) {
			blacklist.guilds.splice(blacklist.guilds.indexOf(guild.id),1);
			fs.writeFile("./informations/blacklist.json", JSON.stringify(blacklist, null, '\t'), (err) => {if(err) console.log(err)});
			return message.channel.send(`Le serveur ${guild.name} a été enlevé de la liste noire.`);
		} else if(args[1] == "serveur" && !blacklist.guilds.includes(guild.id)) {
			return message.channel.send("Ce serveur n'est pas dans la liste noire.");
		}
	}
}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ['bl'],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'ajouter/retirer une personne de la liste noire, les personnes sur la liste noire ne peuvent pas utiliser les commandes du bot.",
	utilisations: `blacklist add membre/serveur [ID de membre/ID de serveur]\nblacklist remove membre/serveur [ID de membre/ID de serveur]`,
	exemples: `blacklist add membre 216214448203890688`
}