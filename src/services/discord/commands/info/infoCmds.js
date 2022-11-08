const { MessageEmbed } = require('discord.js')
const { version, colors, channels } = require('../../info')

module.exports = {
  dq: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('DQ Timers')
    .setDescription(
      'The DQ timers are 10 minutes for Winners Round 1 and Losers Round 1' +
        ', after the first rounds they are all 7 minutes.',
    )
    .setFooter(version),
  format: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Format')
    .setDescription(
      'Our __weekly tournaments__ are Double Elimination. Matches in the Winners Bracket are BO3. Winners Bracket Final and Grand Final matches will be BO5. Matches in the Losers Bracket are BO1. Losers Bracket Final is a BO3. __Avalanches__ are Single Elimination. All matches before the Semi Finals are BO3. The Semi Finals and the Final, and 3rd place match are both BO5.',
    )
    .setFooter(version),
  reset: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Resets')
    .setDescription(
      'There are no bracket resets. Instead, the team that wins the winners final has a one game advantage over the other team.',
    )
    .setFooter(version),
  checkin: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Check in')
    .setDescription(
      'After the bracket has been started (7PM EST for Weeklies, 8PM EST for Avalanches), you will need to find your team in the bracket on smash and click on the match that your team is in and you will be prompted to check into the match. After check in, the team will have 5 minutes to create or join the match.',
    )
    .setFooter(version),
  europe: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('EU')
    .setDescription(
      'We are an NA based organization, so we do not host any tournaments or have any teams based in the EU.',
    )
    .setFooter(version),
  stream: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Stream')
    .setDescription(
      'We stream on our twitch, <https://www.twitch.tv/alpine_esports>, for each Alpine weekly tournament and Avalanche. For the weekly tournaments, the stream starts at the Quarter Finals. For our Avalanches, the stream starts earlier than the Quarter Finals. We will post in announcements if we are not streaming.',
    )
    .setFooter(version),
  subs: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Subs')
    .setDescription(
      'Yes, each team is allowed 1 substitute for weekly tournaments and 2 substitutes for our Avalanche. They must have completed registration and are on your team. ',
    )
    .setFooter(version),
  spectators: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Spectators')
    .setDescription(
      'Spectators are allowed if both teams agree and the spectator is registered to the team. Spectators are not allowed if the match is being streamed by us.',
    )
    .setFooter(version),
  elimination: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Single/Double Elimination')
    .setDescription(
      'For our $50 Alpine Weekly Tournaments, they are double elimination. For our Avalanches, they are single elimination.',
    )
    .setFooter(version),
  twos: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('2v2')
    .setDescription(
      'We do not do any 2v2 tournaments. They are in the pool of ideas to spice things up later on, but for now, we only host 3v3 tournaments.',
    )
    .setFooter(version),
  register: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Register')
    .setDescription('Registration period closes at 6:30pm ET on tournament days.')
    .setFooter(version),
  discord: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Connecting Discord to Smash')
    .setDescription(
      'First, try to unlink and relink your discord to smash. If this does not work, ping a staff member in <#' +
        `<#${channels.support}>` +
        '>.',
    )
    .setFooter(version),
  dm: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('DM')
    .setDescription(
      `From <#${channels.rules}>: Advertisement: Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_.`,
    )
    .setFooter(version),
  advertisement: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Advertisements')
    .setDescription(
      `From <#${channels.rules}>: Advertisements of any kind are not allowed in this discord. Advertisements that are not allowed include, but are not limited to, other discords, other tournaments, other brands, other organizations, and other companies. Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_`,
    )
    .setFooter(version),
  credits: new MessageEmbed()
    .setColor(colors.blue)
    .setThumbnail('https://cdn.pixabay.com/photo/2016/11/25/16/37/smilie-1858768_960_720.png')
    .setTitle('Creators')
    .setDescription('This bot was developed by: <@254303885886357508> and <@166331892075855873>')
    .setFooter(version),
  latereg: new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Register')
    .setDescription(`Ping a staff member in <#${channels.support}>, and we will help you as much as we can.`)
    .setFooter(version),
}
