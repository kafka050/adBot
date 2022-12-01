const { version, colors, channels } = require('../../info')

module.exports = {
  dq: {
    color: colors.blue,
    title: 'DQ Timers',
    description:
      'The DQ timers are 10 minutes for Winnders Round 1 and Losers Round 1' +
      ', after the first rounds they are all 7 minutes.',
    footer: {
      text: version,
    },
  },
  format: {
    color: colors.blue,
    title: 'Format',
    description:
      'Our __weekly tournaments__ are Double Elimination. Matches in the Winners Bracket are BO3. Winners Bracket Final and Grand Final matches will be BO5. Matches in the Losers Bracket are BO1. Losers Bracket Final is a BO3. __Avalanches__ are Single Elimination. All matches before the Semi Finals are BO3. The Semi Finals and the Final, and 3rd place match are both BO5.',
    footer: {
      text: version,
    },
  },
  reset: {
    color: colors.blue,
    title: 'Resets',
    description:
      'There are no bracket resets. Instead, the team that wins the winners final has a one game advantage over the other team.',
    footer: {
      text: version,
    },
  },
  checkin: {
    color: colors.blue,
    title: 'Check in',
    description:
      'After the bracket has been started (7PM EST for Weeklies, 8PM EST for Avalanches), you will need to find your team in the bracket on smash and click on the match that your team is in and you will be prompted to check into the match. After check in, the team will have 5 minutes to create or join the match.',
    footer: {
      text: version,
    },
  },
  europe: {
    color: colors.blue,
    title: 'EU',
    description:
      'We are an NA based organization, so we do not host any tournaments or have any teams based in the EU.',
    footer: {
      text: version,
    },
  },
  stream: {
    color: colors.blue,
    title: 'Stream',
    description:
      'We stream on our twitch, <https://www.twitch.tv/alpine_esports>, for each Alpine weekly tournament and Avalanche. For the weekly tournaments, the stream starts at the Quarter Finals. For our Avalanches, the stream starts earlier than the Quarter Finals. We will post in announcements if we are not streaming.',
    footer: {
      text: version,
    },
  },
  subs: {
    color: colors.blue,
    title: 'Subs',
    description:
      'Yes, each team is allowed 1 substitute for weekly tournaments and 2 substitutes for our Avalanche. They must have completed registration and are on your team. ',
    footer: {
      text: version,
    },
  },
  spectators: {
    color: colors.blue,
    title: 'Spectators',
    description:
      'Spectators are allowed if both teams agree and the spectator is registered to the team. Spectators are not allowed if the match is being streamed by us.',
    footer: {
      text: version,
    },
  },
  elimination: {
    color: colors.blue,
    title: 'Single/Double Elimination',
    description:
      'For our $50 Alpine Weekly Tournaments, they are double elimination. For our Avalanches, they are single elimination.',
    footer: {
      text: version,
    },
  },
  twos: {
    color: colors.blue,
    title: '2v2',
    description:
      'We do not do any 2v2 tournaments. They are in the pool of ideas to spice things up later on, but for now, we only host 3v3 tournaments.',
    footer: {
      text: version,
    },
  },
  register: {
    color: colors.blue,
    title: 'Register',
    description: 'Registration period closes at 6:30pm ET on tournament days.',
    footer: {
      text: version,
    },
  },
  discord: {
    color: colors.blue,
    title: 'Connecting Discord to Smash',
    description: `First, try to unlink and relink your discord to smash. If this does not work, ping a staff member in <#${channels.support}>.`,
    footer: {
      text: version,
    },
  },
  dm: {
    color: colors.blue,
    title: 'DM',
    description: `From <#${channels.rules}>: Advertisement: Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_.`,
    footer: {
      text: version,
    },
  },
  advertisement: {
    color: colors.blue,
    title: 'Advertisements',
    description: `From <#${channels.rules}>: Advertisements of any kind are not allowed in this discord. Advertisements that are not allowed include, but are not limited to, other discords, other tournaments, other brands, other organizations, and other companies. Avoid saying 'DM me for more info,' as it is a ghost advertisement. _Multiple offenses will result in a ban_`,
    footer: {
      text: version,
    },
  },
  credits: {
    color: colors.blue,
    thumbnail: 'https://cdn.pixabay.com/photo/2016/11/25/16/37/smilie-1858768_960_720.png',
    title: 'Creators',
    description: 'This bot was developed by: <@254303885886357508> and <@166331892075855873>',
    footer: {
      text: version,
    },
  },
  latereg: {
    color: colors.blue,
    title: 'Register',
    description: `Ping a staff member in <#${channels.support}>, and we will help you as much as we can.`,
    footer: {
      text: version,
    },
  },
}
