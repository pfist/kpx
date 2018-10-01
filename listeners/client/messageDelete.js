import { Listener } from 'discord-akairo'
import config from '../../bot.config.js'

class MessageDeleteListener extends Listener {
  constructor () {
    super('messageDelete', {
      emitter: 'client',
      eventName: 'messageDelete'
    })
  }

  async exec (message) {
    const channel = await this.client.channels.find(channel => channel.name === config.messageLogChannel)

    const embed = this.client.util.embed()
    .setColor([255, 107, 107])
    .setTitle(':x: MESSAGE DELETED')
    .setDescription(`A message from ${message.author} was deleted in ${message.channel}.`)
    .addField('Deleted Message', message.content)
    .setTimestamp()

    return channel.send(embed)
  }
}

export default MessageDeleteListener
