module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	let role = args[0];
	try {
		let guildRoles = message.guild.roles.array();
		for(let roletoFind of guildRoles) {
			if(roletoFind.name.includes(role)) return role = roletoFind.id;
		}
		role = message.guild.roles.get(role);
		if(!role.editable) return await argsError("Le bot n'a pas les permissions pour mentionner ce rôle.");
		console.log('oui');
		if(!role.mentionable) return role.edit({'mentionnable':'true'}).then(message.channel.send(`${role}`).then( role.edit({'mentionnable':'false'}).then(message.delete())));
		if(role.mentionable) return message.channel.send(`${role}`).then(m=>{if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete()});
	} catch (e) { argsError("Le rôle n'a pas été trouvé.");}
}
module.exports.config = {
	category: "administration",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["ment"],
	serverForced: true
}

module.exports.help = {
	description: "Permet de mentioner un rôle avec son ID ou son nom.",
	utilisations: `mention [ID/nom de rôle]`,
	exemples: ``
}