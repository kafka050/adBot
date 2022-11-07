const discord = require('discord.js')
module.exports = (member) => {
  console.log('Log: Member Joined Server\n')
  if (member.guild.id === server_id) {
    var userCreated = member.user.createdAt.toString().split(' ')
    let finalString = userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3]
    var embed = new discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL())
      .setThumbnail(image['ibex']['blue'])
      .setColor(color['blue'])
      .setTitle(`User Joined`)
      .addField(`Account created: `, finalString)
      .setFooter(`User ID: ` + member.id + '\nJoined: ' + member.joinedAt)
    channel['logs'].send(embed)
    channel['welcome'].send(
      `Welcome ` +
        member.toString() +
        ` to the official discord server of **Alpine Esports!** ` +
        emote['ibex']['black'].toString(),
    )
    channel['member_count'].setName('Alpine Fam: ' + member.guild.memberCount)
    member.roles.add([roleID['alpine_fam'], roleID['tournaments']])
  }
}
