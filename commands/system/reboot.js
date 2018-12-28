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
      userPermissions: ['MANAGE_GUILD']
    })
  }

  async exec (message) {
    // Send response
    await message.util.send('Rebooting...')

    // Destroy the client
    // Assumes an environment where the bot will automatically restart on shut down
    this.client.destroy()
  }
}

export default RebootCommand
