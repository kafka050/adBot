const { MessageEmbed } = require('discord.js')
const { main_server, colors, channels } = require('../info')
module.exports = (member) => {
  if (member.guild.id !== main_server) return
  const embed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL())
    .setColor(colors.blue)
    .setDescription(`<@` + member.id + `> has left.`)
    .setFooter('User ID: ' + member.id)
  channels.logs.send(embed)
  channels.member_count.setName('Alpine Fam: ' + member.guild.memberCount)
}
