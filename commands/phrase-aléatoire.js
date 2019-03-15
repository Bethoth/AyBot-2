module.exports.run = async (client, message, args) => {

	let subjects = ['Au bout de vos forces, vous','Vous et les membres du serveur,','Puis vous','Vous et vos amis,','Maintenant, vous','Et alors vous','Du coup vous','Et maintenant vous','Pour changer, vous','Mais vous','Alors vous','Vous','Vous','Et au final, vous','Vous','Vous','Vous','Vous','Vous'];
		
	let actions = ['faîtes','testez','décidez de manger','essayez de tuer','voyez','mangez','devinez','dessinez','trouvez par terre','trouvez','êtes','donnez','récupérez','volez','décidez de voler','décidez de devenir',
				'bannissez',"combattez","allez en randonnée avec",'vous déplacez pour trouver','achetez','créez','programmez','faites un puzzle sur'];

	let things = ['Ayfri','une bannane','un Ayfri sauvage','une glace','un bot discord','une carte en forme de kiwi','un train de la SNCF','un énorme serveur discord',"le compte d'un ami pour voler énormémént d'argent",
				"un petit chien","un chat","un chevalier","rien","la maison du boulanger du coin","votre grand-père","le boulanger du coin","un smartphone à 1400€","une Super NES Mini à un gosse",
				"la terre entière","le bot en lui même ","un jeu vidéo","rien du tout, mais vraiment rien","du sucre, des épices et pleins de bonnes choses","un trou noir","une fusée pour aller sur Mars",
				"un train dénommé Thomas",'une énorme saucisse avec des yeux, des bras, des jambes et une cafetière',"un yaout à la fraise","du beurre éxotic","une caméra de surveillance","votre père","un bonbon","la voisine qui fait des crèpes",
				"la petite fille en bas de la rue qui vend de la limonade très chère","une console de jeux-vidéos","le sac de votre meilleur amie","des chouquettes",
				"la star la plus célèbre sur terre","le jeu vidéo Minecraft avec une passoire sur les bras","le plus long livre au monde avec une police de caractères de taille 1 millimètres","le plus gros bonbon au monde",
				"une petite pastille bleu qui scintille","une Xbox 360 avec le jeu Saints Row 4, que vous détestez par ailleurs","un énorme sac pleins de victuailles et de cervoise","une écaille de dragon","le plus grand bateau au monde","l'univers tout entier",
				"un modérateur excellent pour gérer un serveur de 25 membres","un pokémon sauvage","la plus grande et haute tour du royaume de fort fort lointain","un ogre vert très méchant qui chante et qui dance",
				"dans une maison très petite pour pouvoir trouvez la clé","la clé de l'univers puis la mettez dans votre main","un jeu en VR sur les pianos terroristes","le plus gros dragon de l'univers"];
	
	let others = [' pour votre plaisir personnel.',' puis ça vous énerve et vous mangez un sachez de thé.',' mais pensez à faire le ménage.','...','. ¯\\_(ツ)_/¯','. OwO UwU','. o_O','.',' !',' !','.','.',' ?','.','.','.','.','.','.','.','.','.','.','.','.',' ?!'," parce que c'est pour votre bien.",
				" sauf le mercredi soir."," car c'est amusant de le faire."," car vous êtes méchant.",'. 🤔','. 👌'," mais ça reste drôle.",". Attendez quoi ?",". Mais au final vous avez la flemme.",". Ce qui au final échoue après une bataille épique."];
	
	let sentance = "";
	
	while(true) {
		sentance+=subjects[Math.round(Math.random() * subjects.length)]+" "+actions[Math.round(Math.random() * actions.length)]+" "+things[Math.round(Math.random() * things.length)]+others[Math.round(Math.random() * others.length)]+"\n";
		sentance+=subjects[Math.round(Math.random() * subjects.length)]+" "+actions[Math.round(Math.random() * actions.length)]+" "+things[Math.round(Math.random() * things.length)]+others[Math.round(Math.random() * others.length)];
		if(sentance.includes('undefined')){return;} else break;
	}
	return message.channel.send(sentance);
}
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["phrase-random","phrase"],
	serverForced: false
}

module.exports.help = {
	description: "Vous renvoie une phrase générée aléatoirement et en général drôle.",
	utilisations: `phrase-aléatoire`,
	exemples: ``
}