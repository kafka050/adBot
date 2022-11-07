const discord = require('discord.js')

function help(message, args, embed) {
  if (args[0] === undefined || args[0] === `1`) {
    embed
      .setTitle(`Pinebot Commands [1/2]`)
      .addField(
        `.2v2`,
        'We do not do any 2v2 tournaments. They are in the pool of ideas to spice things up later on, but for now, we only host 3v3 tournaments.',
      )
      .addField(
        `.advertisement/.advert/.ad`,
        "From <#709320937136455710>: Advertisements of any kind are not allowed in this discord. Advertisements that are not allowed include, but are not limited to, other discords, other tournaments, other brands, other organizations, and other companies. Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_",
      )
      .addField(
        `.checkin`,
        'After the bracket has been started (7PM EST for Weeklies, 8PM EST for Avalanches), you will need to find your team in the bracket on smash and click on the match that your team is in and you will be prompted to check into the match. After check in, the team will have 5 minutes to create or join the match.',
      )
      .addField(`.creator/.dev`, `This bot was developed by: <@254303885886357508> and <@166331892075855873>`)
      .addField(
        `.discord/.disc/.dis`,
        'First, try to unlink and relink your discord to smash. If this does not work, ping a staff member in <#709320648215887893>.',
      )
      .addField(
        `.dm`,
        "From <#709320937136455710>: Advertisement: Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_.",
      )
      .addField(
        `.dq`,
        'The DQ timers are 10 minutes for Winners Round 1 and Losers Round 1, after the first rounds they are all 7 minutes.',
      )
      .addField(
        `.elim/.elimination`,
        'For our $50 Alpine Weekly Tournaments, they are double elimination. For our Avalanches, they are single elimination.',
      )
      .addField(
        `.eu/.europe`,
        'We are an NA based organization, so we do not host any tournaments or have any teams based in the EU.',
      )
      .addField(
        `.format`,
        'Our __weekly tournaments__ are Double Elimination. Matches in the Winners Bracket are BO3. Winners Bracket Final and Grand Final matches will be BO5. Matches in the Losers Bracket are BO1. Losers Bracket Final is a BO3. __Avalanches__ are Single Elimination. All matches before the Semi Finals are BO3. The Semi Finals and the Final are both BO5.',
      )
  } else if (args[0] === `2`) {
    embed
      .setTitle(`Pinebot Commands [2/2]`)
      .addField(`.latereg`, 'Ping a staff member in <#709320648215887893>, and we will help you as much as we can.')
      .addField(`.register/.reg`, 'Registration period closes at 6:30 ET on tounament days.')
      .addField(
        `.reset`,
        'There are no bracket resets. Instead, the team that wins the winners final has a one game advantage over the other team.',
      )
      .addField(
        `.spectator/.spec`,
        'Spectators are allowed if both teams agree. Spectators are, however, not allowed if the match is being streamed by us.',
      )
      .addField(
        `.stream/.twitch`,
        'We stream on our twitch, <https://www.twitch.tv/alpine_esports>, for each Alpine weekly tournament and Avalanche. For the weekly tournaments, the stream starts at the Quarter Finals. For our Avalanches, the stream starts earlier than the Quarter Finals. We will post in announcements if we are not streaming.',
      )
      .addField(
        `.sub`,
        'Yes, each team is allowed 2 substitutes. They must have completed registration and are on your team.',
      )
  } else if (args[0].toLowerCase() === 'staff') {
    embed
      .setTitle(`Pinebot Commands [Staff]`)
      .addField(`Mute`, '.mute <@userID> (time) (reason)')
      .addField(`Unmute`, '.unmute <@userID>')
      .addField(`Kick`, '.kick <@userID> (reason)')
      .addField(`Ban`, '.ban <@userID> (reason)')
      .addField(`Role`, '.role (add/remove) <@userID> @role')
  } else {
    embed.setDescription('Invalid page number.')
  }
  message.channel.send(embed)
}
module.exports = help
