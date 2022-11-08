module.exports = {
  sendWelcome: (member) => {
    channels.welcome.send(
      `Welcome ${member.toString()} to the official discord server of **Alpine Esports!** ${emotes.ibex.black.toString()}`,
    )
  },
  updateMemberCount: (member) => {
    channels.member_count.setName('Alpine Fam: ' + member.guild.memberCount)
  },
}
