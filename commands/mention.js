const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	try {
        let role = args[0];
        try {
            let guildRoles = Array.from(message.guild.roles.values());
            for(let roletoFind of guildRoles) {
                if(roletoFind.name.includes(role)) {
                    role = roletoFind.id;
                }
            }
            role = message.guild.roles.get(role);
            if(!role.editable) return message.channel.send("Le bot n'a pas les permissions pour mentionner ce rôle.");
            
            if(!role.mentionable) return role.edit({'mentionnable':'true'}).then(message.channel.send(`${role}`).then( role.edit({'mentionnable':'false'}).then(message.delete())));
            if(role.mentionable) return message.channel.send(`${role}`).then(message.delete());
        } catch (e) {}
        message.channel.send("Le role n'a pas été trouvé.");
    } catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
    }
}
module.exports.config = {
	category: "administration",
	name: "mention",
	aliases: ["ment"]
}

module.exports.help = {
	description: "Permet de mentioner un [rôle] avec son ID ou son nom.",
	utilisations: `mention [rôle]`,
	exemples: ``
}