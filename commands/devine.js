module.exports.run = async (client, message, args, argsError) => {
    if(argsError);
    let fullText = args.join(" ");
if(!fullText.includes("?")) return message.channel.send("Une question termine par un `?`.");

let responses = ['bien sur !',
    'je crois oui...',
    'pour le coup je sais pas...',
    'mmmmh demande plus tard.',
    'alors je crois mais vraiment je suis pas du tout sûr...',
    'oui.',
    'non.',
    'possible...',
    'non impossible.',
    "ça m'étonnerait...",
    'je crois pas...',
    'devine :3',
    "j'ai pas envie de le dire.",
    'boarf, ça dépend...',
    'mmmmh, excellente question !',
    "c'est obligé !",
    'alors si ça arrive je demissionne.',
    'oui oui bien sûr... et puis quoi encore...',
    "je l'ai sur le bout de la langue mais... Non je sais pas...",
    'forcément.',
    "euh, c'est quoi cette question ?",
    'oui ^^',
    'non ^^',
    'mmmh ouais ? Quoique... Ah non, non pas du tout en fait.',
    'non. Je rigole, bien évidemment que si !',
    'la légende dit vrai.',
    "la légende dit que si ça arrive c'est que la terre est plate."+
    'faut voir, je pense que ouais mais bon il se pourrait que non :/'+
    'ouais !',
    'non je pense pas.'];
    if(args.length < 1) { return await argsError("Veuillez mettre une [question].")} else { return message.channel.send(`**${message.author.username}**, ${String(responses[Math.floor(Math.random()*responses.length)])}`); }
}
module.exports.config = {
    category: "fun",
    name: __filename.slice(__dirname.length + 1, __filename.length - 3),
    aliases: ["dv"],
    serverForced: false
}

module.exports.help = {
    description: "Donne une réponse aux questions simples (oui/non), attention : non fiable à 100%.",
    utilisations: `devine [question]`,
    exemples: ``
}