const { version } = require('../../../package.json')
const botconfig = require('../../../botconfig.json')

module.exports = {
  version: version,
  prefix: botconfig.prefix,
  token: botconfig.token,
  main_server: '983818242206335017',
  channels: {
    logs: '1039309307742789732',
    welcome: '1039309353636868166',
    member_count: '1039309393944125440',
    support: '1039309407193923594',
    trial_announcements: '1039309449090846740',
    tournament_seeding: '1039309503092490376',
    bot_testing: '1039309548923654254',
    punishments: '1039309580787781653',
    set_roles: '1039309595023249489',
    community_clips: '1039309631639523518',
    tournament_announcements: '1039309653399572530',
    rules: '1039419656999551026',
  },
  categories: {
    admin: '1039309724774060126',
    staff: '1039309744223035402',
    community_teams: '1039309790922420334',
    information: '1039309809930997790',
  },
  roles: {
    admin: '1039574893513154640',
    staff: '1039575142076010587',
    alpine_staff: '1039575582305964113',
    muted: '1039575690149892116',
    alpine_fam: '1039575841551679549',
    tournaments: '1039575918798176277',
  },
  // partner (server id) (channel id)
  partners: [
    { server: '1234567890987654321', channel: '1234567890987654321' }, // fake server/channel
    { server: '0987654321234567890', channel: '0987654321234567890' }, // fake server/channel
  ],
  colors: {
    red: '#AD1D1D',
    orange: '#FF8C00',
    yellow: '#EEEE00',
    green: '#5EA758',
    blue: '#60ADFD',
    purple: '#A021A0',
    black: '#000000',
    white: '#FFFFFF',
    pink: '#FF69B4',
  },
  linkBlacklist: ['http', 'www', '.com', '.net', '.org', '.gg'],
  emotes: {
    rank: {
      GrandChampion: '575482399404589075',
      Champion3: '575482452643151873',
      Champion2: '575482473106898963',
      Champion1: '575482484783972379',
      Diamond3: '575482493126574080',
      Diamond2: '575482502886719498',
      Diamond1: '575482510860091412',
      Platinum: '575482518615228417',
      Gold: '575482543059763228',
      Silver: '575482580523024395',
      Bronze: '575482627398696961',
      tournaments: `705932864885096579`,
    },
    ibex: {
      black: `705932864885096579`,
    },
  },
  colors: {
    red: '#AD1D1D',
    orange: '#FF8C00',
    yellow: '#EEEE00',
    green: '#5EA758',
    blue: '#60ADFD',
    purple: '#A021A0',
    black: '#000000',
    white: '#FFFFFF',
    pink: '#FF69B4',
  },
  images: {
    ibex: {
      red: 'https://i.imgur.com/J6d7vDa.png',
      blue: 'https://i.imgur.com/YM0wjsW.png',
      orange: 'https://i.imgur.com/hlYXuDT.png',
    },
  },
}
