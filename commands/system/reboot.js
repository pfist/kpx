import { Command } from 'discord-akairo'

class RebootCommand extends Command {
  constructor () {
    super('reboot', {
      aliases: ['reboot'],
      category: 'System',
      description: 'Shut down and restart the bot',
      userPermissions: ['BAN_MEMBERS']
    })
  }

  async exec (message) {
    await message.util.send('Shutting down...')
    process.exit(1)
  }
}

export default RebootCommand