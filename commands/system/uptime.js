import { Command } from 'discord-akairo'
import ms from 'pretty-ms'

class UptimeCommand extends Command {
  constructor () {
    super('uptime', {
      aliases: ['uptime'],
      category: 'System',
      description: {
        content: 'Get the amount of time since the bot last logged in.',
        usage: '!uptime'
      },
      channelRestriction: 'guild',
      userPermissions: ['VIEW_CHANNEL']
    })
  }

  async exec (message) {
    const uptime = await ms(this.client.uptime, { verbose: true, secDecimalDigits: 0 })
    return message.util.send(`I have been online for ${uptime}.`)
  }
}

export default UptimeCommand
