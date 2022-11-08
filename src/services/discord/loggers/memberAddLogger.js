const { MessageEmbed } = require('discord.js')
const { main_server, images, colors, channels, emotes } = require('../info')

module.exports = (member) => {
  console.log('Log: Member Joined Server\n')
  if (member.guild.id != main_server) return
  const userCreated = member.user.createdAt.toString().split(' ')
  const finalString = userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3]
  const embed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL())
    .setThumbnail(images.ibex.blue)
    .setColor(colors.blue)
    .setTitle(`User Joined`)
    .addField(`Account created: `, finalString)
    .setFooter(`User ID: ` + member.id + '\nJoined: ' + member.joinedAt)
  channels.logs.send(embed)
  channels.welcome.send(
    `Welcome ` +
      member.toString() +
      ` to the official discord server of **Alpine Esports!** ` +
      emotes.ibex.black.toString(),
  )
  channels.member_count.setName('Alpine Fam: ' + member.guild.memberCount)
}
