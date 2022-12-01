const { colors } = require('../../info')
const info = require('../../info')
/**
 * Lists the commands a user can use
 * @param {String[]} args
 * @returns MessageEmbed listing commands
 */
function help(args) {
  let embed = {}

  // Default ".help" response
  if (args[0] === undefined || args[0] === `1`) {
    embed = {
      title: 'Pinebot Commands [1/2]',
      color: colors.blue,
      fields: [
        {
          name: '.twos',
          value:
            'We do not do any 2v2 tournaments. They are in the pool of ideas to spice things up later on, but for now, we only host 3v3 tournaments.',
        },
        {
          name: '.advertisement',
          value: `From ${info.channels.rules}: Advertisements of any kind are not allowed in this discord. Advertisements that are not allowed include, but are not limited to, other discords, other tournaments, other brands, other organizations, and other companies. Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_`,
        },
        {
          name: '.checkin',
          value:
            'After the bracket has been started (7PM EST for Weeklies, 8PM EST for Avalanches), you will need to find your team in the bracket on smash and click on the match that your team is in and you will be prompted to check into the match. After check in, the team will have 5 minutes to create or join the match.',
        },
        {
          name: '.credits',
          value: 'This bot was developed by: <@254303885886357508> and <@166331892075855873>',
        },
        {
          name: '.discord',
          value:
            'First, try to unlink and relink your discord to smash. If this does not work, ping a staff member in <#709320648215887893>.',
        },
        {
          name: '.dm',
          value: `From ${info.channels.rules}: Advertisement: Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_.`,
        },
        {
          name: '.dq',
          value:
            'The DQ timers are 10 minutes for Winners Round 1 and Losers Round 1, after the first rounds they are all 7 minutes.',
        },
        {
          name: '.elimination',
          value:
            'For our $50 Alpine Weekly Tournaments, they are double elimination. For our Avalanches, they are single elimination.',
        },
        {
          name: '.europe',
          value:
            'We are an NA based organization, so we do not host any tournaments or have any teams based in the EU.',
        },
        {
          name: '.format',
          value:
            'Our __weekly tournaments__ are Double Elimination. Matches in the Winners Bracket are BO3. Winners Bracket Final and Grand Final matches will be BO5. Matches in the Losers Bracket are BO1. Losers Bracket Final is a BO3. __Avalanches__ are Single Elimination. All matches before the Semi Finals are BO3. The Semi Finals and the Final are both BO5.',
        },
      ],
    }
  } // ".help 2" response, 2nd page
  else if (args[0] === `2`) {
    embed = {
      title: 'Pinebot Commands [2/2]',
      color: colors.blue,
      fields: [
        {
          name: '.latereg',
          value: 'Ping a staff member in <#709320648215887893>, and we will help you as much as we can.',
        },
        {
          name: '.register',
          value: 'Registration period closes at 6:30 ET on tounament days.',
        },
        {
          name: '.reset',
          value:
            'There are no bracket resets. Instead, the team that wins the winners final has a one game advantage over the other team.',
        },
        {
          name: '.spectators',
          value:
            'Spectators are allowed if both teams agree. Spectators are, however, not allowed if the match is being streamed by us.',
        },
        {
          name: '.stream',
          value:
            'We stream on our twitch, <https://www.twitch.tv/alpine_esports>, for each Alpine weekly tournament and Avalanche. For the weekly tournaments, the stream starts at the Quarter Finals. For our Avalanches, the stream starts earlier than the Quarter Finals. We will post in announcements if we are not streaming.',
        },
        {
          name: '.subs',
          value: 'Yes, each team is allowed 2 substitutes. They must have completed registration and are on your team.',
        },
      ],
    }
  } // ".help" staff response.
  else if (args[0].toLowerCase() === 'staff') {
    embed = {
      title: 'Pinebot commands [Staff]',
      color: colors.blue,
      fields: [
        { name: 'Mute', value: '.mute <@userID> (time) (reason)' },
        { name: 'Unmute', value: '.unmute <@userID>' },
        { name: 'Kick', value: '.kick <@userID> (reason)' },
        { name: 'Ban', value: '.ban <@userID> (reason)' },
        { name: 'Role', value: '.role (add/remove) <@userID> @role' },
      ],
    }
  } else {
    embed = {
      title: 'Error',
      color: colors.blue,
      description: 'Invalid page number.',
    }
  }
  return embed
}
module.exports = help
