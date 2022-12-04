const { Message, GuildMember } = require('discord.js')
const ms = require('ms')
const { roles, colors, images, channels } = require('../../info')
const { sendMessage } = require('../../tools/utils')

/**
 * Mutes a user and sends logs to punishments
 * @param {Message} message command message
 * @param {String[]} args {user to mute} {time} {reason}
 * @return Embed to send in logs
 */
async function mute(message, args) {
  if (!args) return
  const person = message.mentions.members.first()
  if (!person) {
    return {
      color: colors.blue,
      fields: [{ name: 'Error', value: `Could not find user ${person}` }],
    }
  }

  let time = ''
  if (!args[1]) time = '24h'
  else time = args[1]

  let reason = ''
  if (!args[2]) reason = 'No reason given.'
  else for (const arg in args.slice(1)) reason += ` ${arg}`

  const mutedRole = message.guild.roles.fetch((r) => r.id === roles.muted)
  if (!mutedRole)
    return {
      color: colors.blue,
      fields: [{ name: 'Error', value: 'Could not find the muted role.' }],
    }

  if (person.roles.highest.position >= message.guild.roles.cache.get(roles.staff).position) return

  if (time === '1y' || time === '365d') {
    await sendMessage(`<@&${roles.admin}> Please review the following mute for possible ban.`)
  }
  await person.roles.add(roles.muted)
  const logEmbed = {
    title: 'User Muted',
    author: {
      name: message.author.tag,
      icon_url: message.author.avatarURL(),
    },
    color: colors.red,
    thumbnail: {
      url: images.ibex.red,
    },
    fields: [{ name: 'Muted By', value: message.member }],
    footer: {
      text: `User ID: ${person.id}`,
    },
  }

  const dmEmbed = {
    title: 'You have been muted',
    color: colors.red,
    thumbnail: {
      url: images.ibex.red,
    },
    fields: [{ name: 'Reason', value: reason }],
    footer: {
      text: 'If you think this mute was made by mistake, DM an Alpine Esports Admin.',
    },
  }

  let author = message.author
  if (author === 'AutoMod') {
    if (time === '365d' || time === '1y') {
      logEmbed.fields.push({ name: 'Duration', value: 'Indefinite, message under review.' })
      dmEmbed.fields.push({ name: 'Duration', value: 'Indefinite, message under review.' })
    }
    logEmbed.fields.push({ name: 'Duration', value: `${ms(ms(time))}` })
    dmEmbed.fields.push({ name: 'Duration', value: `${ms(ms(time))}` })
  } else {
    logEmbed.fields.push({ name: 'Duration', value: `${ms(ms(time))}` })
    dmEmbed.fields.push({ name: 'Duration', value: `${ms(ms(time))}` })
  }
  await sendMessage({ embeds: [logEmbed] }, channels.punishments)
  await sendMessage({ embeds: [dmEmbed] }, person.dmChannel)

  setTimeout(function () {
    if (!person.roles.cache.get(roles.muted)) return
    person.roles.remove(roles.muted).then((person) => {
      const embed = {
        color: colors.red,
        description: `<@${person.id}> has been **unmuted**.`,
      }
      sendMessage({ embeds: [embed] }, channels.punishments)
    })
  }, ms(time))

  return logEmbed
}
module.exports = mute
