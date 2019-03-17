module.exports.run = async (client, message, args) => {
	let person = message.mentions.users.size > 0 ? message.mentions.users.first().username : args.length > 0 ? args.join(" ") : message.author;
	let method = [
		"saute de 6 étages","mange un chapeau","combat le bot","essaie de combattre Ayfri","trouve une pièce","fait un combat contre un CRS","se transforme en fromage fondu",
		"trouve une carte google play","joue à Fortnite","joue à Roblox","joue avec le feu","mange une cigarette allumée","joue à Fnaf","essaie de combattre sans",
		"n'a pas envie de mourir","deviens suicidaire","saute de 150 mètres de hauteur","fait un saut en parachute en oubliant son parachute","joue à un jeu d'horreur",
		"essaie de faire connaissance avec un zombie","fait coucou","lance youtube","mange du radium","décide de mourir","en a marre de la vie","parle à son meilleur pote",
		"va en Afrique","chante et danse de la K-Pop","lance de la dubstep piratée","commence un débat avec Eddy Malou le premier savant de toute la république démocratique du congo, EDDY MALOU, E double d, y, trait d'union, M a l o u, ça veut dire imposer la force veeeers le valium. Ça veut dire l'estime du savoir, les gens qui connsaissent beaucoup de choses et cristaliser, imposer, iiiiinnntentionner dans toute la république démocratique du congo pour que nous puissions avoir la congo-léxicomatisation des lois du marché propre aux congolais",
		"mentionne Donald Trump sur twitter","fait une mention Everyone sur son serveur","va dormir","prend l'avion","est fatigué","est vieux","décide de prendre un dessert",
		"a envie de mourir","commence à programmer un bot discord","commence la programmation du langage Lisp","décide de faire de la cuisine","est déjà mort"
	]
	if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
	message.channel.send(person+" "+method[Math.round(Math.random() * method.length)]+" et meurt.");
}
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ['kill'],
	serverForced: false
}

module.exports.help = {
	description: "Permet de trouver une bonne façon de mourir sur vous, une personne ou du texte.",
	utilisations: `tuer <texte/Mention de membre>`,
	exemples: ``
}