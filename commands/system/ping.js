import { Command } from 'discord-akairo'

class PingCommand extends Command {
  constructor () {
    super('ping', {
      aliases: ['ping'],
      category: 'System',
      description: `Check the bot's latency`,
      userPermissions: ['VIEW_CHANNEL']
    })
  }

  async exec (message) {
    const reply = await message.util.send('Pong!')
    const replyTime = await reply.editedTimestamp || reply.createdTimestamp
    const messageTime = await message.editedTimestamp || message.createdTimestamp
    return message.util.send(`Pong! I took ${replyTime - messageTime}ms to respond.`)
  }
}

export default PingCommand
