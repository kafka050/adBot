const { main_server, channels, colors } = require('../../src/info')
const logger = require('../../src/loggers/channel-create-logger')
const channel = {
  type: '',
  guild: {
    id: '',
  },
  id: '',
  toString() {
    return `<#${this.id}>`
  },
}
test('Should not log dm channels', () => {
  channel.type = 1
  channel.guild.id = main_server
  channel.id = '125'
  const embed = logger(channel)
  const expectedEmbed = null
  expect(embed).toEqual(expectedEmbed)
})

test('Should not log channels created on wrong server', () => {
  channel.type = 'text'
  channel.guild.id = '12345'
  channel.id = '125'
  const embed = logger(channel)
  const expectedEmbed = null
  expect(embed).toEqual(expectedEmbed)
})

test('Should log channel correctly', () => {
  channel.type = 'text'
  channel.guild.id = main_server
  channel.id = '125'
  const embed = logger(channel)
  const expectedEmbed = {
    color: 0x60adfd,
    title: 'Channel created',
    thumbnail: {
      url: 'https://i.imgur.com/YM0wjsW.png',
    },
    fields: [{ name: 'Channel', value: '<#125>' }],
  }
  expect(embed).toEqual(expectedEmbed)
})
