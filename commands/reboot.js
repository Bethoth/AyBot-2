const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
  let statChan = client.channels.get("515329927763984435");
  statChan.setName("STATUT : ETEINT");
	try {
        client.commands.array().forEach(commande => {
            let commandName = commande.config.name;
            const mod = require.cache[require.resolve(`../commands/${commandName}`)];
            delete require.cache[require.resolve(`../commands/${commandName}.js`)];
            for (let i = 0; i < mod.parent.children.length; i++) {
              if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
              }
            }
        return false;
        });
        await message.channel.send("Arrêt du bot en cours.");
        console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Arrêt du bot en cours.`));

        process.exit(1);
	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : " + __filename.slice(__dirname.length + 1) + "\n" + e + "\n"));
	}
}
module.exports.config = {
  category: "owner",
  name: "reboot",
	aliases: ["rebt", "rb"]
}

module.exports.help = {
	description: "Permet de recharger le bot si il est en ligne grâce à un module PM2, sinon cela arrête juste le bot.",
	utilisations: `reboot`,
	exemples: ``
}