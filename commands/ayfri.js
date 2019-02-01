const Discord = require("discord.js");
const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
        try {
                const ayfri = client.users.get("386893236498857985");
                const embed = new Discord.RichEmbed()
                embed.setTitle("Informations sur Ayfri")
                embed.setColor("#4b5afd")
                embed.setThumbnail(ayfri.displayAvatarURL)
                embed.setDescription("Compte Minecraft : Ayfri\n" +
                        `Compte Discord : ${ayfri.tag}\n\n` +
                        "**Liens utiles :**\n\n" +
                        "Invitation discord : https://discord.gg/AfTSDVz\n" +
                        "Chaîne youtube : https://www.youtube.com/c/Ayfri\n" +
                        "Jeu RollYourBall : https://gamejolt.com/games/roll_your_ball/282310\n" +
                        "Jeu Saxophone Clicker : http://orteil.dashnet.org/igm/?g=7dqfqDZg\n" +
                        "Map Minecraft  : https://www.planetminecraft.com/project/undertalecraft-a-undertale-map-in-minecraft/\n" +
                        "Profil Osu! : https://osu.ppy.sh/users/8743883\n" +
                        "Site internet : https://pierreayfri.wixsite.com/allminecraftversions\n" +
                        "Tweeter : https://twitter.com/ayfri1015")
                const moment = require("moment");
                embed.setFooter(`CommunAyBot • ${heure}:${minute}`,communaybot.displayAvatarURL)
                message.channel.send(embed);
        } catch (e) {
                console.log(chalk.red("== ERREUR == \n\nFichier : " + __filename.slice(__dirname.length + 1) + "\n" + e + "\n"));
        }
}
module.exports.config = {
        category: "informations",
        name: "ayfri",
        aliases: ["ayfr", "af", "createur"]
}

module.exports.help = {
        description: "Permet d'avoir des informations sur Ayfri#0453, le programmeur et créateur du bot.",
        utilisations: `ayfri`,
        exemples: ``
}