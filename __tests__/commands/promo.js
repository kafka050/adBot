const promo = require('../../src/commands/promo')
const { colors, channels } = require('../../src/info')
jest.mock('../../src/skills/promotion/send-trial.js')

test('should return correct object for args ".promo w tonight"', () => {
  const embed = promo(['w', 'tonight'])
  const expectedEmbed = {
    color: colors.pink,
    description: `Please react to the message in ${channels.trial_announcements} to confirm or cancel the announcement.`,
  }
  expect(embed).toEqual(expectedEmbed)
})
test('should return correct object for args ".promo weekly tonight"', () => {
  const embed = promo(['weekly', 'tonight'])
  const expectedEmbed = {
    color: colors.pink,
    description: `Please react to the message in ${channels.trial_announcements} to confirm or cancel the announcement.`,
  }
  expect(embed).toEqual(expectedEmbed)
})

test('should return correct object for args ".promo a tonight"', () => {
  const embed = promo(['a', 'tonight'])
  const expectedEmbed = {
    color: colors.pink,
    description: `Please react to the message in ${channels.trial_announcements} to confirm or cancel the announcement.`,
  }
  expect(embed).toEqual(expectedEmbed)
})
test('should return correct object for args ".promo avalanche tonight"', () => {
  const embed = promo(['avalanche', 'tonight'])
  const expectedEmbed = {
    color: colors.pink,
    description: `Please react to the message in ${channels.trial_announcements} to confirm or cancel the announcement.`,
  }
  expect(embed).toEqual(expectedEmbed)
})

test('should return format suggestion for improper args', () => {
  const embed = promo(['george', 'tonight'])
  const expectedEmbed = {
    color: colors.green,
    description: 'Format: .promo [(weekly/w) / (avalanche/a)] (month) (day)',
  }
  expect(embed).toEqual(expectedEmbed)
})
