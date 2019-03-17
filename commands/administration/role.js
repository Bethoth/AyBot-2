module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	let role = args[0];
	let guildRoles = message.guild.roles.array();
	if(role === "tous") {
		let roleOf = args[1];
		role = args[2];
		try {
			for(let roletoFind of guildRoles) {
				if(roletoFind.name.includes(roleOf)) roleOf = roletoFind;
			}
			for(let roletoFind2 of guildRoles) {
				if(roletoFind2.name.includes(role)) role = roletoFind2;
			}
		} catch(e) { return await argsError("Le rôle n'a pas été trouvé."); }

		let membersRole = message.guild.roles.get(roleOf.id).members;
		membersRole.forEach(member => {
			member.addRole(role.id);
		});
		return message.channel.send(`Le rôle \`${role.name}\` a été donné à tout les membres qui ont le rôle \`${roleOf.name}\`.`);
	} else try {
		for(let roletoFind of guildRoles) {
			if(roletoFind.name.includes(role)) role = roletoFind;
		}
	} catch(e) { return await argsError("Le rôle n'a pas été trouvé."); }

	if(message.guild.roles.has(role.id)) {
		message.guild.members.forEach(member => {
			member.addRole(role);
		});
		return message.channel.send(`Le rôle \`${role.name}\` a été donné à tout les membres.`);
	}
	return await argsError("Le rôle n'a pas été trouvé.");
}
module.exports.config = {
	category: "administration",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: [],
	serverForced: true
}

module.exports.help = {
	description: "Permet de donner un rôle à tout le monde ou de donner un rôle à tout les membres qui ont un rôle spécifique.",
	utilisations: `role [nom de rôle à donner]\nrole tous [nom de rôle] [nom de rôle à donner]`,
	exemples: `role Membre\nrole tous Membre Développeur`
}