import { Command } from 'discord-akairo'
import { version as akairoVersion } from 'discord-akairo'
import { version as djsVersion } from 'discord.js'
import config from '../../bot.config.js'
import { DateTime } from 'luxon'
import ms from 'pretty-ms'
import pkg from '../../package.json'

class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      category: 'System',
      description: {
        content: 'Get technical stats for the bot.',
        usage: '!stats'
      },
      channelRestriction: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      protected: true
    })
  }

  async exec (message) {
    // Human-friendly uptime
    const uptime = await ms(this.client.uptime, { secDecimalDigits: 0 })
    // Human-friendly server time
    const serverTime = DateTime.local().toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET)
    // Create embed
    const embed = this.client.util.embed()
    .setColor(config.colors.blue)
    .setThumbnail(this.client.user.avatarURL)
    .addField('❯ Uptime', uptime, true)
    .addField('❯ Server Time', serverTime, true)
    .addField('❯ Version', pkg.version, true)
    .addField('❯ Node.js', process.version.substring(1), true)
    .addField('❯ Discord.js', djsVersion, true)
    .addField('❯ Akairo', akairoVersion, true)

    return message.util.send({ embed })
  }
}

export default StatsCommand
