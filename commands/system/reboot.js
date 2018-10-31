import { Command } from 'discord-akairo'

class RebootCommand extends Command {
  constructor () {
    super('reboot', {
      aliases: ['reboot'],
      category: 'System',
      description: {
        content: 'Shut down and restart the bot.',
        usage: '!reboot'
      },
      channelRestriction: 'guild',
      userPermissions: ['BAN_MEMBERS']
    })
  }

  async exec (message) {
    await message.util.send('Shutting down...')
    process.exit(1)
  }
}

export default RebootCommand
