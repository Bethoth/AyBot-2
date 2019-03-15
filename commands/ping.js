module.exports.run = async (client, message, args) => {
	let m = await message.channel.send("Ping ?");
	m.edit(`Latence du bot : **${m.createdTimestamp - message.createdTimestamp}** ms. :ping_pong:\nLatence de l'api : **${Math.round(client.ping)}** ms. :ping_pong:`);
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["pi"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de connaître la latence du bot.",
	utilisations: `ping`,
	exemples: ``
}