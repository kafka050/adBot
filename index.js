/**
 * This is the source code for Alpinebot
 * 
 * Alpinebot is a moderation tool specifically designed for the Alpine Esports Discord community
 * It is intended to keep the community up to the standards of Alpine Esports as well as keep it safe
 * 
 * Created by: Jarod Kafka (Quack) and Schon Hale (Schon)
 * Version Alpha
 */

//Setup
const botconfig = require("./botconfig.json");
const package = require("./package.json");
const Discord = require("discord.js");
const version = "Version " + package.version;
const ms = require('ms');
const prefix = botconfig.prefix;
const bot = new Discord.Client({ partials: Object.values(Discord.Constants.PartialTypes)})
var server;
var server_id;
var announcement;
var announcementID;


	//Colors
	const color = {
		'red'		: '#AD1D1D',
		'orange'	: '#FF8C00',
		'yellow'	: '#EEEE00',
		'green'		: '#5EA758',
		'blue'		: '#60ADFD',
		'purple'	: '#A021A0',
		'black'		: '#000000',
		'white'		: '#FFFFFF',
		'pink'		: '#FF69B4'
	}
	//Word Blacklist
	const wordBlacklist = {
		"nigg": '1y',
		"cunt": '24h',
		"bitch": '24h',
		"dick": '24h',
		"pussy": '24h',
		"d1ck": '24h',
		"b1tch": '24h',
		"b!tch": '24h',
		"d!ck": '24h',
		"blowjob": '24h',
		"cock": '24h',
		"c0ck": '24h',
		"niga": '1y',
		"nigr": '1y',
		"cnut": '24h',
		"asshole": '24h',
		"kys": '1y',
		"fuck you": '24h',
		"porn": '24h',
		"coon": '24h',
		"fag": '24h',
		"retard": '24h',
		"@everyone": '24h',
		"@here": '24h'
	}
	//Link Blacklist
	const linkBlacklist = [
		"http", 
		"www", 
		".com", 
		".net", 
		".org", 
		".gg"
	]




/**
 * This logs to the console that the bot is online, and sets its appearance in the discord server
 */
bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity("#GOPINE!!");
	
	server = bot.guilds.cache.get(server_id)
	for(key in channel) {
		channel[key] = server.channels.cache.get(channel[key])
	}
	for(key in category) {
		category[key] = server.channels.cache.get(category[key])
	}
	for(key in emote) {
		for(emoji in emote[key]) {
			emote[key][emoji] = server.emojis.cache.get(emote[key][emoji])
		}
	}
	
	/*var setRoleEmbed = new Discord.MessageEmbed()
		.setTitle("Set Roles")
		.setColor(color['blue'])
		.setThumbnail(image['ibex']['blue'])
		.setDescription(
			emote['rank']['Grand Champion'].toString() + " - Grand Champion\n" +
			emote['rank']['Champion 3'].toString() + " - Champion 3\n" +
			emote['rank']['Champion 2'].toString() + " - Champion 2\n" + 
			emote['rank']['Champion 1'].toString() + " - Champion 1\n" +
			emote['rank']['Diamond 3'].toString() + " - Diamond 3\n" +
			emote['rank']['Diamond 2'].toString() + " - Diamond 2\n" +
			emote['rank']['Diamond 1'].toString() + " - Diamond 1\n" +
			emote['rank']['Platinum'].toString() + " - Platinum\n" +
			emote['rank']['Gold'].toString() + " - Gold\n" +
			emote['rank']['Silver'].toString() + " - Silver\n" +
			emote['rank']['Bronze'].toString() + " - Bronze\n\n" +
			emote['rank']['tournaments'].toString() + " - React and unreact to remove Tournaments role."
		)
	channel['set_roles'].send(setRoleEmbed).then(msg => {
		msg.react(emote['rank']['Grand Champion'])
		msg.react(emote['rank']['Champion 3'])
		msg.react(emote['rank']['Champion 2'])
		msg.react(emote['rank']['Champion 1'])
		msg.react(emote['rank']['Diamond 3'])
		msg.react(emote['rank']['Diamond 2'])
		msg.react(emote['rank']['Diamond 1'])
		msg.react(emote['rank']['Platinum'])
		msg.react(emote['rank']['Gold'])
		msg.react(emote['rank']['Silver'])
		msg.react(emote['rank']['Bronze'])
		msg.react(emote['rank']['tournaments'])
	})*/
});

/**
 * This code runs whenever there is a message sent in the discord server
 * Does not run when message sent by another bot, or if in DM
 */
bot.on("message", async message => {
	if(message.channel.type === 'dm') return;
	if(message.guild.id === server_id) 
	{
		if (message.author.bot) return;
		if (message.channel.type === "dm") return;
		//This allows for easy comparability of the message
		messageLowerCase = message.content.toLowerCase();
		let messageArray = message.content.split(" ");
		let cmd = messageArray[0].toLowerCase();
		let args = message.content.substring(prefix.length).split(" ");
		if(message.member.roles.highest.position <= message.guild.roles.cache.get(roleID['staff']).position) {
			autoMod(message, message.author);
		}
		
		{ // Help commands
			if (cmd === `${prefix}dq`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("DQ Timers")
					.setDescription("The DQ timers are 10 minutes for Winners Round 1 and Losers Round 1, after the first rounds they are all 7 minutes.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}format`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Format")
					.setDescription("Our __weekly tournaments__ are Double Elimination. Matches in the Winners Bracket are BO3. Winners Bracket Final and Grand Final matches will be BO5. Matches in the Losers Bracket are BO1. Losers Bracket Final is a BO3. __Avalanches__ are Single Elimination. All matches before the Semi Finals are BO3. The Semi Finals and the Final, and 3rd place match are both BO5.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}resets` || cmd === `${prefix}reset`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Resets")
					.setDescription("There are no bracket resets. Instead, the team that wins the winners final has a one game advantage over the other team.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}checkin`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Check in")
					.setDescription("After the bracket has been started (7PM EST for Weeklies, 8PM EST for Avalanches), you will need to find your team in the bracket on smash and click on the match that your team is in and you will be prompted to check into the match. After check in, the team will have 5 minutes to create or join the match.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}eu` || cmd === `${prefix}europe`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("EU")
					.setDescription("We are an NA based organization, so we do not host any tournaments or have any teams based in the EU.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}stream` || cmd === `${prefix}twitch`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Stream")
					.setDescription("We stream on our twitch, <https://www.twitch.tv/alpine_esports>, for each Alpine weekly tournament and Avalanche. For the weekly tournaments, the stream starts at the Quarter Finals. For our Avalanches, the stream starts earlier than the Quarter Finals. We will post in announcements if we are not streaming.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}sub` || cmd === `${prefix}subs`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Subs")
					.setDescription("Yes, each team is allowed 1 substitute for weekly tournaments and 2 substitutes for our Avalanche. They must have completed registration and are on your team. ")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}spec` || cmd === `${prefix}spectator` || cmd === `${prefix}spectators`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Spectators")
					.setDescription("Spectators are allowed if both teams agree and the spectator is registered to the team. Spectators are not allowed if the match is being streamed by us.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}elim` || cmd === `${prefix}elimination`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Single/Double Elimination")
					.setDescription("For our $50 Alpine Weekly Tournaments, they are double elimination. For our Avalanches, they are single elimination.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}2v2`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("2v2")
					.setDescription("We do not do any 2v2 tournaments. They are in the pool of ideas to spice things up later on, but for now, we only host 3v3 tournaments.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}register` || cmd === `${prefix}reg`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Register")
					.setDescription("Registration period closes at 6:30pm ET on tournament days.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}discord` || cmd === `${prefix}dis` || cmd === `${prefix}disc`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Connecting Discord to Smash")
					.setDescription("First, try to unlink and relink your discord to smash. If this does not work, ping a staff member in <#" + channel['support'].id + ">.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}dm`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("DM")
					.setDescription("From <#709320937136455710>: Advertisement: Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}ad` || cmd === `${prefix}advert` || cmd === `${prefix}adverts` || cmd === `${prefix}advertisement` || cmd === `${prefix}advertisements`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Advertisements")
					.setDescription("From <#709320937136455710>: Advertisements of any kind are not allowed in this discord. Advertisements that are not allowed include, but are not limited to, other discords, other tournaments, other brands, other organizations, and other companies. Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}creator` || cmd === `${prefix}creators` || cmd === `${prefix}dev` || cmd === `${prefix}devs`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setThumbnail('https://cdn.pixabay.com/photo/2016/11/25/16/37/smilie-1858768_960_720.png')
					.setTitle("Creators")
					.setDescription("This bot was developed by: <@254303885886357508> and <@166331892075855873>")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
			if (cmd === `${prefix}latereg`) {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setTitle("Register")
					.setDescription("Ping a staff member in <#709320648215887893>, and we will help you as much as we can.")
					.setFooter(version)
				if (message.content.charAt(0) === prefix) {
					message.delete();
				}
				return message.channel.send(embed);
			}
		}
		
		{ // Staff commands
			if (cmd === `${prefix}help`) {
				if (message.member.roles.cache.get(roleID['staff']) != undefined) {
					var embed = new Discord.MessageEmbed()
						.setColor(color['blue'])
						.setThumbnail(image['ibex']['blue'])
						.setFooter(version)
						
					if (args[1] === undefined || args[1] === `1`) {
						embed
							.setTitle(`Pinebot Commands [1/2]`)
							.addField(`.2v2`, "We do not do any 2v2 tournaments. They are in the pool of ideas to spice things up later on, but for now, we only host 3v3 tournaments.")
							.addField(`.advertisement/.advert/.ad`, "From <#709320937136455710>: Advertisements of any kind are not allowed in this discord. Advertisements that are not allowed include, but are not limited to, other discords, other tournaments, other brands, other organizations, and other companies. Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_")
							.addField(`.checkin`, "After the bracket has been started (7PM EST for Weeklies, 8PM EST for Avalanches), you will need to find your team in the bracket on smash and click on the match that your team is in and you will be prompted to check into the match. After check in, the team will have 5 minutes to create or join the match.")
							.addField(`.creator/.dev`, `This bot was developed by: <@254303885886357508> and <@166331892075855873>`)
							.addField(`.discord/.disc/.dis`, "First, try to unlink and relink your discord to smash. If this does not work, ping a staff member in <#709320648215887893>.")
							.addField(`.dm`, "From <#709320937136455710>: Advertisement: Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_.")
							.addField(`.dq`, "The DQ timers are 10 minutes for Winners Round 1 and Losers Round 1, after the first rounds they are all 7 minutes.")
							.addField(`.elim/.elimination`, "For our $50 Alpine Weekly Tournaments, they are double elimination. For our Avalanches, they are single elimination.")
							.addField(`.eu/.europe`, "We are an NA based organization, so we do not host any tournaments or have any teams based in the EU.")
							.addField(`.format`, "Our __weekly tournaments__ are Double Elimination. Matches in the Winners Bracket are BO3. Winners Bracket Final and Grand Final matches will be BO5. Matches in the Losers Bracket are BO1. Losers Bracket Final is a BO3. __Avalanches__ are Single Elimination. All matches before the Semi Finals are BO3. The Semi Finals and the Final are both BO5.")
					}
					else if (args[1] === `2`) {
						embed
							.setTitle(`Pinebot Commands [2/2]`)
							.addField(`.latereg`, "Ping a staff member in <#709320648215887893>, and we will help you as much as we can.")
							.addField(`.register/.reg`, "Registration period closes at 6:30 ET on tounament days.")
							.addField(`.reset`, "There are no bracket resets. Instead, the team that wins the winners final has a one game advantage over the other team.")
							.addField(`.spectator/.spec`, "Spectators are allowed if both teams agree. Spectators are, however, not allowed if the match is being streamed by us.")
							.addField(`.stream/.twitch`, "We stream on our twitch, <https://www.twitch.tv/alpine_esports>, for each Alpine weekly tournament and Avalanche. For the weekly tournaments, the stream starts at the Quarter Finals. For our Avalanches, the stream starts earlier than the Quarter Finals. We will post in announcements if we are not streaming.")
							.addField(`.sub`, "Yes, each team is allowed 2 substitutes. They must have completed registration and are on your team.")
					}
					else if (args[1].toLowerCase() === 'staff') {
						embed
							.setTitle(`Pinebot Commands [Staff]`)
							.addField(`Mute`, ".mute <@userID> (time) (reason)")
							.addField(`Unmute`, ".unmute <@userID>")
							.addField(`Kick`, ".kick <@userID> (reason)")
							.addField(`Ban`, ".ban <@userID> (reason)")
							.addField(`Role`, ".role (add/remove) <@userID> @role")
					}
					else {
						var embed2 = new Discord.MessageEmbed()
							.setColor(color['blue'])
							.setDescription("Invalid page number.")
						message.channel.send(embed2)
						return
					}
					message.channel.send(embed)
				}
			}
			if (cmd === `${prefix}mute`) {
				var person = message.guild.member(message.mentions.users.first())
				
				var reason = '';
				
				if (message.member.hasPermission('MUTE_MEMBERS') && (person.roles.highest.position < message.member.roles.highest.position)) {
					let time = args[2]
					
					if(!args[3]) {
						mute(message, person, time, "No reason given");
					} else {
						for(i = 3; i < args.length; i++) {
							reason += args[i] + " ";
						}
						mute(message, person, time, reason);
					}
				}
			}
			if (cmd === `${prefix}unmute`) {
				if (message.member.hasPermission('MUTE_MEMBERS')) {
					var person = message.guild.member(message.mentions.users.first());
					if (!person) {
						var embed = new Discord.MessageEmbed()
							.setColor(color['blue'])
							.addField(`Error`, "Could not find user " + person)
						return message.channel.send(embed)
					}
					let role = message.guild.roles.fetch(r => r.id === roleID['muted']);
					if (!role) {
						var embed = new Discord.MessageEmbed()
							.setColor(color['blue'])
							.addField(`Error`, "Could not find the muted role.")
						return message.channel.send(embed)
					}
					person.roles.remove(roleID['muted']);
					var embed = new Discord.MessageEmbed()
						.setColor(color['red'])
						.setDescription(`<@` + person.id + `> has been **unmuted** by <@` + message.author.id + `>.`)
					channel['punishments'].send(embed)
					var embed2 = new Discord.MessageEmbed()
						.setColor(color['red'])
						.setDescription(`You have been unmuted in the Alpine Esports Discord.`)
					dmMember(person, embed2)
				}
			}
			if (cmd === `${prefix}kick`) {
				var person = message.guild.member(message.mentions.users.first());
				if (message.member.hasPermission('KICK_MEMBERS') && (message.member.roles.highest.position > person.roles.highest.position)) {
					reason = ""
					for (i = 2; i < args.length; i++) {
						reason += (args[i] + " ")
					}
					if (!person) {
						var embed = new Discord.MessageEmbed()
							.setColor(color['blue'])
							.addField(`Error`, "Could not find user " + person)
						return message.channel.send(embed)
					}
					var embed = new Discord.MessageEmbed()
						.setAuthor(person.user.tag, person.user.avatarURL())
						.setColor(color['red'])
						.setTitle("User Kicked")
						.setThumbnail(image['ibex']['red'])
						.addField("Kicked By", '<@'+message.member.id+'>')
						.addField("Reason", reason)
						.setFooter("User ID: " + person.id)
					channel['punishments'].send(embed)

					person.kick(reason)

				} else if (!message.member.hasPermission('KICK_MEMBERS')) {
					insufficientPermissions(message.channel)
				} else if (message.member === person) {
					message.channel.send("Imagine trying to kick yourself ")
				} else if (!(message.member.roles.highest.position > person.roles.highest.position)) {
					var embed = new Discord.MessageEmbed()
						.setColor(color['orange'])
						.setDescription("You may not kick someone with a role greater than or equal to your highest.")
				}
			}
			if (cmd === `${prefix}ban`) {
				var person = message.guild.member(message.mentions.users.first());
				var reason = '';
				if (message.member.hasPermission('BAN_MEMBERS') && (person.roles.highest.position < message.guild.roles.cache.get(roleID['staff']))) {
					var person = message.guild.member(message.mentions.users.first());
					for (i = 2; i < args.length; i++) {
						reason += (args[i] + " ")
					}
					if(reason === '') {
						var embed = new Discord.MessageEmbed()
							.setColor(color['green'])
							.setDescription("MUST give reason for ban.")
						message.channel.send(embed)
						return
					}
					ban(message, person, reason)
				}
			}
			//.role (add/remove) (@user) (role id)
			if (cmd === `${prefix}role`) {
				if (message.member.hasPermission('MANAGE_ROLES') && (message.mentions.roles.first().position < message.member.roles.highest.position)) {
					var person = message.guild.member(message.mentions.users.first());
					var role_id = message.mentions.roles.first().id
					if (!person) {
						var embed = new Discord.MessageEmbed()
							.setColor(color['blue'])
							.addField(`Error`, "Could not find user " + person)
						return message.channel.send(embed)
					}

					let role = message.guild.roles.fetch(r => r.id === role_id);
					if (!role) {
						var embed = new Discord.MessageEmbed()
							.setColor(color['blue'])
							.addField(`Error`, "Could not find the specified role.")
						return message.channel.send(embed)
					}

					if (args[1] === 'add') {
						person.roles.add(role_id);
					}
					else if (args[1] === 'remove') {
						person.roles.remove(role_id);
					}
					else {
						var embed = new Discord.MessageEmbed()
							.setColor(color['blue'])
							.addField(`Error`, "First argument can only be add/remove.")
						return message.channel.send(embed)
					}
				} else if(!(message.mentions.roles.first().position < message.member.roles.highest.position)){
					var embed = new Discord.MessageEmbed()
						.setAuthor(message.author.tag, message.author.avatarURL())
						.setColor(color['green'])
						.setDescription(message.member.toString() + " tried assigning/removing either their highest role or any above.")
					channel['logs'].send(embed)
					var embed2 = new Discord.MessageEmbed()
						.setColor(color['orange'])
						.setTitle("Warning")
						.setDescription("You may not assign/remove your highest role or any above.")
						.setFooter("Alpine AutoMod")
					dmMember(message.author, embed2)
				}
			}
		}

		{ // Admin commands
			if(message.member.roles.cache.array().includes(message.guild.roles.cache.get(roleID['admin'])))
			{
				if (cmd === `${prefix}promo`) {
					retVal = ''
					if (args[1].toLowerCase() === 'weekly' || args[1].toLowerCase() === 'w') {
							if (args[2].toLowerCase() === 'tonight') {
								retVal += `__**Alpine’s** $50 **3v3 Tournament**!__\n`
								+ `Alpine invites **you** to compete **TONIGHT** for your shot at becoming our Tournament Champion and taking home **$50**. Grab your team and get ready!\n\n`

								+ `**Sign up here:** https://smash.gg/alpine\n\n`

								+ `➤  Prize: __**$50**__\n\n`

								+ `➤  Double elimination\n\n`

								+ `➤  **Date & Time:** Tonight at **7:00 pm ET**\n`
								+ `*Registration ends at 6:30 pm ET (30 minutes prior)*\n\n`

								+ `➤  All platforms are welcome! (PC, Xbox, PS4, Switch)\n\n`

								+ `➤  **Servers:** NA East\n\n`

								+ `➤  Games will be streamed on <https://www.twitch.tv/alpine_esports>\n\n`
						
								+ `➤ **You must join our Discord** https://discord.gg/JeY7z9q`
							}
							else {
								retVal += `__**Alpine’s** $50 **3v3 Tournament**!__\n`
								+ `Alpine invites **you** to compete this **Friday** for your shot at becoming our Tournament Champion and taking home **$50**. Grab your team and get ready!\n\n`

								+ `**Sign up here:** https://smash.gg/alpine\n\n`

								+ `➤  Prize: __**$50**__\n\n`

								+ `➤  Double elimination\n\n`

								+ `➤  **Date & Time:** Friday, `+args[2]+` `+args[3]+ ` at **7:00 pm ET**\n`
								+ `*Registration ends at 6:30 pm ET (30 minutes prior)*\n\n`

								+ `➤  All platforms are welcome! (PC, Xbox, PS4, Switch)\n\n`

								+ `➤  **Servers:** NA East\n\n`

								+ `➤  Games will be streamed on <https://www.twitch.tv/alpine_esports>\n\n`
						
								+ `➤ **You must join our Discord** https://discord.gg/JeY7z9q`
							}
					} else if (args[1].toLowerCase() === 'avalanche' || args[1].toLowerCase() === 'a') {
						if (args[2].toLowerCase() === 'tonight') {
							retVal += `__**AVALANCHE $300 TOURNAMENT by Alpine Esports**__\n`
								+ `An avalanche is coming **TONIGHT**! Get ready to compete in Alpine’s largest tournament for your shot at taking home our biggest prize and becoming our **Avalanche Champion**!\n`
								+ `From everyone at Alpine, we wish you the best of luck and can’t wait to see you all out there!\n\n`
								
								+ `**Sign up here:** https://smash.gg/avalanche\n\n`
								
								+ `➤  Prize Pool: __**$300**__\n`
								+ `	 ➤ 1st: $165\n`
								+ `	 ➤ 2nd: $90\n`
								+ `	 ➤ 3rd: $45\n\n`
								
								+ `➤  **Date & Time:** Tonight at **8:00 pm ET**\n`
								+ `*Registration ends at 7:30 pm ET (30 minutes prior)*\n\n`
								
								+ `➤  All platforms are welcome! (PC, Xbox, PS4, Switch)\n\n`
								
								+ `➤  **Servers:** NA East\n\n`
								
								+ `➤  Games will be streamed on <https://www.twitch.tv/alpine_esports>\n\n`
								
								+ `➤ **You must join our Discord:** https://discord.gg/JeY7z9q`
						}
						else {
							retVal += `__**AVALANCHE $300 TOURNAMENT by Alpine Esports**__\n`
								+ `An avalanche is coming **THIS FRIDAY**! Get ready to compete in Alpine’s largest tournament for your shot at taking home our biggest prize and becoming our **Avalanche Champion**!\n`
								+ `From everyone at Alpine, we wish you the best of luck and can’t wait to see you all out there!\n\n`
								
								+ `**Sign up here:** https://smash.gg/avalanche\n\n`
								
								+ `➤  Prize Pool: __**$300**__\n`
								+ `	 ➤ 1st: $165\n`
								+ `	 ➤ 2nd: $90\n`
								+ `	 ➤ 3rd: $45\n\n`
								
								+ `➤  **Date & Time:** Friday, `+args[2]+` `+args[3]+` at **8:00 pm ET**\n`
								+ `*Registration ends at 7:30 pm ET (30 minutes prior)*\n\n`
								
								+ `➤  All platforms are welcome! (PC, Xbox, PS4, Switch)\n\n`
								
								+ `➤  **Servers:** NA East\n\n`
								
								+ `➤  Games will be streamed on <https://www.twitch.tv/alpine_esports>\n\n`
								
								+ `➤ **You must join our Discord:** https://discord.gg/JeY7z9q`
						}
					} else {
						var embed = new Discord.MessageEmbed()
							.setColor(color['green'])
							.setDescription("Format: .promo [(weekly/w) / (avalanche/a)] (month) (day)")
						message.channel.send(embed)
						return
					}
					var msgURL;
					channel['trial_announcements'].send(retVal).then(msg => {
						msgURL = msg.url
						announcementID = msg.id
						announcement = retVal
						msg.react('✅')
						msg.react('🇽')
					}).then(thing => {
						var embed = new Discord.MessageEmbed()
							.setColor(color['pink'])
							.setDescription("Please react to [this message]("+msgURL+") to confirm or cancel the announcement.")
						message.channel.send(embed)
					})

				}
			}
		}
	}
});

/**
 * Logs
 * 
 * Contains logging for:
 * Member join
 * Member leave
 * Member role change
 * Message delete
 * Message edit
 * Channel create
 * Channel delete
 * Role create
 * Role delete
 * Role modification
 */

bot.on('guildMemberAdd', member => {
	console.log("Log: Member Joined Server\n");
	if(member.guild.id === server_id)
	{
		
		var curDate = new Date()
		var userCreated = member.user.createdAt.toString().split(' ');
		finalString = userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3];
		var embed = new Discord.MessageEmbed()
			.setAuthor(member.user.tag, member.user.avatarURL())
			.setThumbnail(image['ibex']['blue'])
			.setColor(color['blue'])
			.setTitle(`User Joined`)
			.addField(`Account created: `, finalString)
			.setFooter(`User ID: `+member.id + '\nJoined: ' + member.joinedAt)
		channel['logs'].send(embed)
		channel['welcome'].send(`Welcome ` + member.toString() + ` to the official Discord server of **Alpine Esports!** ` + emote['ibex']['black'].toString())
		channel['member_count'].setName("Alpine Fam: " + member.guild.memberCount)
		member.roles.add([roleID['alpine_fam'], roleID['tournaments']])
	}
});
bot.on('guildMemberRemove', member => {
	if(member.guild.id === server_id)
	{
		var embed = new Discord.MessageEmbed()
			.setAuthor(member.user.tag, member.user.avatarURL())
			.setColor(color['blue'])
			.setDescription(`<@` + member.id + `> has left.`)
			.setFooter('User ID: ' + member.id)
		channel['logs'].send(embed)
		channel['member_count'].setName("Alpine Fam: " + member.guild.memberCount)
	}
});
bot.on('guildMemberUpdate', (oldMember, newMember) => {
	if(newMember.guild.id === server_id)
	{
		const guild = newMember.guild;
		if (newMember.roles.cache.array().length > oldMember.roles.cache.array().length) {
			for (i = 0; i < newMember.roles.cache.array().length; i++) {
				if (!oldMember.roles.cache.array().includes(newMember.roles.cache.array()[i])) {
					role = newMember.roles.cache.array()[i]
					if(role.id === roleID['muted'] || role.id === roleID['alpine_fam'] || role.id === roleID['tournaments']) return;
					var embed = new Discord.MessageEmbed()
						.setAuthor(newMember.user.tag, newMember.user.avatarURL())
						.setColor(`#28B61C`)
						.setTitle("Given Role")
						.setThumbnail(image['ibex']['blue'])
						.addField("User", `<@` + newMember.id + `>`)
						.addField("Role", `<@&` + role.id + `>`)
						.setFooter("User ID: " + newMember.id)
					channel['logs'].send(embed)
					return
				}
			}
		}
		if (newMember.roles.cache.array().length < oldMember.roles.cache.array().length) {
			for (i = 0; i < oldMember.roles.cache.array().length; i++) {
				if (!newMember.roles.cache.array().includes(oldMember.roles.cache.array()[i])) {
					role = oldMember.roles.cache.array()[i]
					if(role.id === roleID['muted']) return;
					var embed = new Discord.MessageEmbed()
						.setAuthor(newMember.user.tag, newMember.user.avatarURL())
						.setColor(`#28B61C`)
						.setTitle("Removed from Role")
						.setThumbnail(image['ibex']['blue'])
						.addField("User", `<@` + newMember.id + `>`)
						.addField("Role", `<@&` + role.id + `>`)
						.setFooter("User ID: " + newMember.id)
					channel['logs'].send(embed)
					return
				}
			}
		}
	}
})
bot.on('messageDelete',  async message => {
	if (message.partial) await message.fetch();

	if(message.author.bot) return;
	if(message.guild.id === server_id)
	{
		if (message.content.charAt(0) === prefix) {
			return
		}
		if (message.channel.parent === category['admin'] || message.channel === channel['trial_announcements'] || message.channel === channel['bot_testing'] || message.channel === channel['tournament_seeding']) {
			return
		}
		if (message.content.length >= 250) {
			message.content = message.content.slice(0, 250) + "...";
		}
		var embed = new Discord.MessageEmbed()
			.setColor(color['orange'])
			.setTitle("Message Deleted")
			.setThumbnail(image['ibex']['orange'])
			.addField(`Author`, message.author)
			.addField(`Message`, message.toString())
			.addField(`Channel`, `<#` + message.channel + `>`)
		channel['logs'].send(embed)
	}
})
bot.on('messageUpdate',  async (oldMessage, newMessage) => {
	if (oldMessage.partial || newMessage.channel.type === 'dm') return;
	if (newMessage.partial) await newMessage.fetch()
	if(newMessage.guild.id === server_id)
	{
		if (oldMessage.channel.parent === category['admin'] || oldMessage.channel === channel['trial_announcements'] || oldMessage.channel === channel['bot_testing'] || oldMessage.channel === channel['tournament_seeding']) {
			return
		}
		if (oldMessage.author.id != `706358071017865237`) {
			if (oldMessage.content.length >= 250) {
				oldMessage.content = oldMessage.content.slice(0, 250) + "...";
			}
			if (newMessage.content.length >= 250) {
				newMessage.content = newMessage.content.slice(0, 250) + "...";
			}
			var embed = new Discord.MessageEmbed()
				.setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
				.setColor(color['orange'])
				.setThumbnail(image['ibex']['orange'])
				.setDescription("**Message Edited in** <#" + newMessage.channel + `> ` + "[Jump to message]("+newMessage.url+")")
				.addField(`Before`, oldMessage.content)
				.addField(`After`, newMessage.content)
				.setFooter("User ID: " + newMessage.author.id + ' | ' + newMessage.createdAt)
			channel['logs'].send(embed)
			autoMod(newMessage, newMessage.author)
		}
	}
})
bot.on('channelCreate', _channel => {
	if(_channel.type === "dm") return;
	if(_channel.guild.id === server_id)
	{
		var embed = new Discord.MessageEmbed()
			.setColor(color['blue'])
			.setTitle("Channel Created")
			.setThumbnail(image['ibex']['blue'])
			.addField(`Channel`, _channel)
		channel['logs'].send(embed)
	}
})
bot.on('channelDelete', async _channel => {
	if (_channel.partial) await _channel.fetch();
	if(_channel.guild.id === server_id)
	{
		
		if(_channel.type === "dm") return;
		var embed = new Discord.MessageEmbed()
			.setColor(color['blue'])
			.setTitle("Channel Deleted")
			.setThumbnail(image['ibex']['blue'])
			.addField(`Channel`, _channel)
		channel['logs'].send(embed)
	}
})
bot.on('roleCreate', role => {
	if(role.guild.id === server_id)
	{
		var embed = new Discord.MessageEmbed()
			.setColor(color['blue'])
			.setTitle("Role Created")
			.setThumbnail(image['ibex']['blue'])
			.addField(`Role`, role)
		channel['logs'].send(embed)
	}
})
bot.on('roleDelete', role => {
	if(role.guild.id === server_id)
	{
		var embed = new Discord.MessageEmbed()
			.setColor(color['blue'])
			.setTitle("Role Deleted")
			.setThumbnail(image['ibex']['blue'])
			.addField(`Role`, role)
		channel['logs'].send(embed)
	}
})
bot.on('roleUpdate', (oldRole, newRole) => {
	if(newRole.guild.id === server_id)
	{
		changes = {
			name: '',
			hexColor: '',
			permissions: '',
		}
		var oldArray = oldRole.permissions.toArray()
		var newArray = newRole.permissions.toArray()
		counter = 0
		if (!newRole.permissions.equals(oldRole.permissions)) {
			changes[2] = 'Permissions have been tampered with :sunglasses:'
		}
		else if (newRole.permissions.equals(oldRole.permissions)) {
			changes[2] = 'No changes.'
			counter++
		}
		if (newRole.name != oldRole.name) {
			changes[0] = oldRole.name.toString() + ' --> ' + newRole.name.toString()
		}
		else if (newRole.name === oldRole.name) {
			changes[0] = 'No changes.'
			counter++
		}
		if (newRole.hexColor != oldRole.hexColor) {
			changes[1] = oldRole.hexColor.toString() + ' --> ' + newRole.hexColor.toString()
		}
		else if (newRole.hexColor === oldRole.hexColor) {
			changes[1] = 'No changes.'
			counter++
		}
		if(counter < 3) {
			var embed = new Discord.MessageEmbed()
				.setColor(color['blue'])
				.setTitle("Role Modified")
				.setThumbnail(image['ibex']['blue'])
				.addField(`Name`, changes[0])
				.addField(`Hex Color`, changes[1])
				.addField(`Permissions`, changes[2])
			channel['logs'].send(embed)
		}
	}
})
bot.on('messageReactionAdd', async (reaction, user) => {
	if(reaction.message.guild.id === server_id)
	{
		if(user.bot) return;
		if (reaction.message.partial) await reaction.message.fetch();
		message = reaction.message
		if(message.id != set_role_message && message.id != announcementID) return;
		//Checks complete.
		if(message.id === set_role_message) {
			member = reaction.message.guild.members.cache.get(user.id)
			rank = '';
			for(key in emote['rank']) {
				if(emote['rank'][key] === reaction.emoji) {
					rank = key
				}
			}
			for(key in roleID['rank']) {
				if(key === rank) {
					member.roles.add(roleID['rank'][key])
				}
			}
		} else if (message.id === announcementID) {
			if(reaction.emoji.toString() === '✅') {
				var embed = new Discord.MessageEmbed()
					.setColor(color['blue'])
					.setDescription("Announcement sending...")
				reaction.message.channel.send(embed)
				promo();
			} else if (reaction.emoji.toString() === '🇽') {
				var embed = new Discord.MessageEmbed()
					.setColor(color['orange'])
					.setDescription("Announcement cancelled.")
				reaction.message.channel.send(embed)
			}
		}
	}
})
bot.on('messageReactionRemove', async (reaction, user) => {
	if(reaction.message.guild.id === server_id)
	{
		if(user.bot) return;
		if (reaction.message.partial) await reaction.message.fetch();
		message = reaction.message
		if(message.id != set_role_message) return;
		//Checks complete.

		member = reaction.message.guild.members.cache.get(user.id)
		rank = '';

		for(key in emote['rank']) {
			if(emote['rank'][key] === reaction.emoji) {
				rank = key
			}
		}
		for(key in roleID['rank']) {
			if(key === rank) {
				member.roles.remove(roleID['rank'][key])
			}
		}
	}
})

/**
 * Automod
 * 
 * Punishes for blacklisted phrases/links
 * Warns for mass mentions
 */
function autoMod(message, author) {
	
	/**userLength = message.mentions.users.array().length
	roleLength = message.mentions.roles.array().length
	if(userLength > 3 || roleLength > 2 || (userLength+roleLength) > 3) {
		var embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL())
			.setTitle("Mass Mention")
			.setColor(color['green'])
			.setDescription(message.member.toString() + " mass mentioned users/roles.")
		channel['logs'].send("<@&"+roleID['admin']+"> - Review mass mention for possible mute/ban")
		channel['logs'].send(embed)
		
		var embed2 = new Discord.MessageEmbed()
			.setColor(color['orange'])
			.setTitle("Warning")
			.setDescription("Please do not mass mention users. Doing so may result in mute or ban.")
			.setFooter("Alpine AutoMod")
		dmMember(author, embed2)
		message.channel.send(embed2)
		return
	}*/
	categoryWhitelist = [category['admin'], category['staff'], category['community_teams'], category['information']]
	if(categoryWhitelist.includes(message.channel.parent)) return;
	if(message.content.toLowerCase().includes('steamcommunity') || message.content.toLowerCase().includes('steampowered') || message.content.toLowerCase().includes('imgur')) return;
	if(message.channel === channel['community_clips'] && (message.content.toLowerCase().includes('gifyourgame') || message.content.toLowerCase().includes('imgur') || 
													message.content.toLowerCase().includes('gfycat') || message.content.toLowerCase().includes('clips.twitch'))) return;
	if(message.content.toLowerCase().includes('tracker')) return;
	if(message.member.roles.highest.position >= message.guild.roles.cache.get(roleID['staff']).position) return;
	for(var key in wordBlacklist) {
		if(message.content.toLowerCase().includes(key)) {
			mute(message, author, wordBlacklist[key], "Message included blacklisted phrase: '" + key + "'")
			message.delete()
			return
		}
	}
	for(i = 0; i < linkBlacklist.length; i++) {
		if(message.content.toLowerCase().includes("@") && message.content.toLowerCase().includes(linkBlacklist[i])) {
			var embed = new Discord.MessageEmbed()
				.setColor(color['blue'])
				.setDescription("For your safety, don't post emails.")
			dmMember(author, embed)
			message.delete()
		}
	}
}
/**
 * Functions!
 * Get your functions here!
 */
/**
 * Mutes 'person' for a specified amount of time, DM's 'person', logs the mute
 * @param {*} message Message Object
 * @param {*} person GuildMember or User Object, person to mute
 * @param {*} time Optional String, Duration of ban (s, m, h, d, w, y), time of mute
 * @param {*} reason Optional String, reason for mute
 */
 function mute(message, person, time, reason) {
	author = message.author
	let role = message.guild.roles.fetch(r => r.id === roleID['muted']);
	if(person.type != 'GuildMember') {
		person = message.guild.member(person)
	}
	newMessage = ""
	if(message.content.length > 1000) {
		for(i = 0; i < 750; i++) {
			newMessage += message.content.charAt(i)
		}
		message.content = newMessage
	}
	if(person.roles.highest.position >= message.guild.roles.cache.get(roleID['staff']).position) return
	
	if(author.id===person.id) {
		author = 'AutoMod';
	} else {
		author = `<@` + message.author.id + `>`;
	}
	if (!person) {
		var embed = new Discord.MessageEmbed()
			.setColor(color['blue'])
			.addField(`Error`, "Could not find user " + person)
		return message.channel.send(embed)
	}
	if (!role) {
		var embed = new Discord.MessageEmbed()
			.setColor(color['blue'])
			.addField(`Error`, "Could not find the muted role.")
		return message.channel.send(embed)
	}
	if(time === '1y' || time === '365d') {
		channel['punishments'].send("<@&"+roleID['admin']+"> Please review the following mute for possible ban.")
	}
	person.roles.add(roleID['muted']);

	if (!time) {
		time = '24h';
	}
	if(!reason) {
		reason = "No reason provided."
	}
	if(author === 'AutoMod') {
		if(time === '365d' || time === '1y') {
			var embed = new Discord.MessageEmbed()
				.setAuthor(person.user.tag, person.user.avatarURL())
				.setColor(color['red'])
				.setTitle("User Muted")
				.setThumbnail(image['ibex']['red'])
				.addField("Duration", `Indefinite, message under review.`)
				.addField("Muted By", author)
				.addField(`Message: `, message)
				.setFooter("User ID: " + person.id)
			channel['punishments'].send(embed)
			var embed2 = new Discord.MessageEmbed()
				.setColor(color['red'])
				.setTitle("You have been muted")
				.setThumbnail(image['ibex']['red'])
				.addField(`Duration`, `Indefinite, message under review.`)
				.addField(`Reason`, reason)
				.addField(`Message`, message)
				.setFooter("If you think this mute was made by mistake, DM an Alpine Esports Admin.")
			person.user.send(embed2)
			return
		}
		var embed = new Discord.MessageEmbed()
			.setAuthor(person.user.tag, person.user.avatarURL())
			.setColor(color['red'])
			.setTitle("User Muted")
			.setThumbnail(image['ibex']['red'])
			.addField("Duration", `${ms(ms(time))}`)
			.addField("Muted By", author)
			.addField(`Message: `, message)
			.setFooter("User ID: " + person.id)
		channel['punishments'].send(embed)
		var embed2 = new Discord.MessageEmbed()
			.setColor(color['red'])
			.setTitle("You have been muted")
			.setThumbnail(image['ibex']['red'])
			.addField(`Duration`, `${ms(ms(time))}`)
			.addField(`Reason`, reason)
			.addField(`Message`, message)
			.setFooter("If you think this mute was made by mistake, DM an Alpine Esports Admin.")
		person.user.send(embed2)
	} else {
		var embed = new Discord.MessageEmbed()
			.setAuthor(person.user.tag, person.user.avatarURL())
			.setColor(color['red'])
			.setTitle("User Muted")
			.setThumbnail(image['ibex']['red'])
			.addField("Duration", `${ms(ms(time))}`)
			.addField("Muted By", author)
			.addField(`Reason`, reason)
			.setFooter("User ID: " + person.id)
		channel['punishments'].send(embed)
		var embed2 = new Discord.MessageEmbed()
			.setColor(color['red'])
			.setTitle("You have been muted")
			.setThumbnail(image['ibex']['red'])
			.addField(`Duration`, `${ms(ms(time))}`)
			.addField(`Reason`, reason)
			.setFooter("If you think this mute was made by mistake, DM an Alpine Esports Admin.")
		person.user.send(embed2)
	}
	
	
	

	setTimeout(function () {
		if (person.roles.cache.get(roleID['muted']) === undefined) {
			return
		}
		person.roles.remove(roleID['muted']);
		var embed = new Discord.MessageEmbed()
			.setColor(color['red'])
			.setDescription(`<@` + person.id + `> has been **unmuted**.`)
		channel['punishments'].send(embed)
	}, ms(time));
 }
 /**
  * Bans 'person', DM's 'person', logs ban
  * @param {*} message Message Object
  * @param {*} person GuildMember Object, person to ban
  * @param {*} reason Required String, reason for ban
  */
 function ban(message, person, reason) {
	if (!person) {
		var embed = new Discord.MessageEmbed()
			.setColor(color['blue'])
			.addField(`Error`, "Could not find user " + person)
		return message.channel.send(embed)
	}
	var embed2 = new Discord.MessageEmbed()
		.setColor(color['red'])
		.setTitle("You have been banned from Alpine Esports")
		.setThumbnail(image['ibex']['red'])
		.addField(`Reason`, reason)
	dmMember(person, embed2)
	
	setTimeout(function () {
		person.ban(reason)
	}, 5000);
	
	var banEmbed = new Discord.MessageEmbed()
		.setColor(color['red'])
		.setTitle("Ban")
		.setThumbnail(image['ibex']['red'])
		.addField("User", `<@` + person.id + `>`)
		.addField("Banned By", `<@` + message.author.id + `>`)
		.addField("Reason", reason)
		channel['punishments'].send(banEmbed)
 }

 function insufficientPermissions(channel) {
	var embed = new Discord.MessageEmbed()
		.setColor(color['orange'])
		.setDescription("Insufficient permissions to use this command.")
	channel.send(embed)
 }

 /**
  * Convenience functions
  */

/**
 * DMs a user a message
 * @param {*} user GuildMember
 * @param {*} message String or Embed, message to send user
 */
function dmMember(member, message) {
	member.send(message)
}



/**
 * Auto partner promo Module
 */

function promo() {
	var sentTo = '';
	channel['tournament_announcements'].send(announcement + '\n<@&'+roleID['tournaments']+'>')
	for(key in partner) {
		bot.guilds.cache.get(key).channels.cache.get(partner[key]).send(announcement)
		sentTo += '\n - ' + bot.guilds.cache.get(key).name
	}
	var embed = new Discord.MessageEmbed()
		.setColor(color['blue'])
		.setDescription("**Announcement successfully sent to: **" + sentTo)
	channel['trial_announcements'].send(embed)
}


bot.login(botconfig.token);