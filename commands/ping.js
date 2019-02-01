module.exports.run = async (client, message, args) => {
	try {
		let ping = new Date(new Date().getMilliseconds() - message.createdTimestamp).getMilliseconds();
		message.channel.send("Mon ping est de **" + ping + "** ms :ping_pong: !");
	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
	}
}
module.exports.config = {
	category: "informations",
	name: "ping",
	aliases: ["pi"]
}

module.exports.help = {
	description: "Permet de connaître la latence du bot.",
	utilisations: `ping`,
	exemples: ``
}