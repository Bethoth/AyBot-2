const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	const ayfri = client.users.get("386893236498857985");
	let embed = new Discord.RichEmbed();
	embed.setTitle("Informations sur Ayfri");
	embed.setColor("#4b5afd");
	embed.setThumbnail(ayfri.displayAvatarURL);
	embed.setDescription("Créateur et développeur du bot AyBot 2.\n\nCompte Minecraft : Ayfri\n" +
		`Compte Discord : ${ayfri}\n\n` +
		"**Liens utiles :**\n\n" +
		"[Invitation à son serveur](https://discord.gg/AfTSDVz)\n" +
		"[Chaîne youtube](https://www.youtube.com/c/Ayfri)\n" +
		"[Jeu RollYourBall](https://gamejolt.com/games/roll_your_ball/282310)\n" +
		"[Jeu Saxophone Clicker](http://orteil.dashnet.org/igm/?g=7dqfqDZg)\n" +
		"[Map Minecraft](https://www.planetminecraft.com/project/undertalecraft-a-undertale-map-in-minecraft/)\n" +
		"[Profil Osu!](https://osu.ppy.sh/users/8743883)\n" +
		"[Site internet](https://pierreayfri.wixsite.com/allminecraftversions)\n" +
		"[Tweeter](https://twitter.com/ayfri1015)");
	moment().locale("fr");
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	message.channel.send(embed);
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["ayfr", "af", "createur"],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir des informations sur Ayfri#0453, le développeur et créateur du bot.",
	utilisations: `ayfri`,
	exemples: ``
}